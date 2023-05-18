
# import numpy as np
# import networkx as nx
# import re
# from nltk.tokenize import sent_tokenize, word_tokenize
# from nltk.corpus import stopwords
# from sklearn.metrics.pairwise import cosine_similarity
# from sentence_transformers import SentenceTransformer
# import os
# import nltk
# nltk.download('stopwords')
# nltk.download('punkt')
# # Load the SentenceTransformer model
# model = SentenceTransformer('distilbert-base-nli-mean-tokens')

# # Load the stopwords
# # nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))


# #this function for process the text
# def preprocess(text, stop_words):
#   # remove punctuations and convert to lowercase
#     text = re.sub('[^a-zA-Z0-9\s]', '', text).lower()
#     # tokenize the text and remove stopwords
#     tokens = word_tokenize(text)
#     tokens = [token for token in tokens if token not in stop_words]
#     # join the tokens to form a string
#     text = ' '.join(tokens)
#     return text

# # this for summarize text
# def generate_summary(text):
#     sentences = sent_tokenize(text)
#     clean_sentences = [preprocess(sentence, stop_words) for sentence in sentences]

#     sentence_vectors = [np.array(model.encode(sentence)) for sentence in clean_sentences]
#     sim_matrix = cosine_similarity(sentence_vectors)

#     graph = nx.Graph()
#     for i in range(len(sentences)):
#         graph.add_node(i)
#     for i in range(len(sentences)):
#         for j in range(i + 1, len(sentences)):
#             graph.add_edge(i, j, weight=sim_matrix[i][j])

#     scores = nx.pagerank(graph)
#     ranked_sentences = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)

#     top_sentences = min(3, len(sentences))
#     summary = ""
#     if len(ranked_sentences) >= top_sentences:
#         for i in range(top_sentences):
#             summary += ranked_sentences[i][1] + " "
#     else:
#         summary = text

#     return summary




import pandas as pd
import nltk
import numpy as np
import networkx as nx
import re
nltk.download('popular')
from nltk.tokenize import sent_tokenize,word_tokenize
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import math

def preprocess(text, stop_words):
    # remove punctuations and convert to lowercase
    text = re.sub('[^a-zA-Z0-9\s]', '', text).lower()
    # tokenize the text and remove stopwords
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in stop_words]
    # join the tokens to form a string
    text = ' '.join(tokens)
    return text

# data.columns=(['original','text'])

# !pip install sentence_transformers

from sentence_transformers import SentenceTransformer

model = SentenceTransformer('distilbert-base-nli-mean-tokens')
import networkx as nx
import math

# create an empty list to store the summaries


def generate_summary(text):
# iterate over each row in the dataframe
    summaries = []
    graphs = []
    # split the text into individual sentences
    sentences = sent_tokenize(text)
    
    # preprocess the sentences
    stop_words = stopwords.words('english')
    clean_sentences = [preprocess(sentence, stop_words) for sentence in sentences]
    
    # calculate the similarity matrix
    sentence_vectors = [np.array(model.encode(sentence)) for sentence in clean_sentences]
    sim_matrix = cosine_similarity(sentence_vectors)
    
    # convert the similarity matrix into a graph for sentence rank calculation
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)
    
    # calculate the number of sentences for the summary (20% of the original text length)
    summary_length = math.ceil(len(sentences) * 0.2)
    
    # select the top sentences based on the desired criteria while preserving the order
    selected_sentences = []
    sentence_indices = set()
    for score, i, sentence in sorted(((scores[i], i, sentence) for i, sentence in enumerate(sentences)), 
                                     key=lambda x: (x[0], -x[1]), reverse=True):
        if len(selected_sentences) < summary_length and i not in sentence_indices:
            selected_sentences.append(sentence)
            sentence_indices.add(i)
    
    # generate the summary and graph
    summary = " ".join(selected_sentences)
    graph = nx.Graph()
    for i in range(len(selected_sentences)):
        graph.add_node(i)
    for i in range(len(selected_sentences)):
        for j in range(i + 1, len(selected_sentences)):
            graph.add_edge(i, j, weight=sim_matrix[i][j])
    
    # append the summary and graph to the lists
    summaries.append(summary)
    graphs.append(graph)
    return summaries