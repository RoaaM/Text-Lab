import api from "../api";

export const convertApi = api.injectEndpoints({
  endpoints: (builder) => ({
    textExtraction: builder.mutation({
      query: (data) => ({
        url: "api/img_text/",
        method: "POST",
        body: data,
      }),
      //   providesTags: (result) =>
      //     result
      //       ? [
      //           ...result.map(({ slug }) => ({ type: "Category", slug })),
      //           { type: "Category", id: "LIST" },
      //         ]
      //       : [{ type: "Category", id: "LIST" }],
    }),
    summarizeText: builder.mutation({
      query: (data) => ({
        url: "api/summari_text/",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    videoToText: builder.mutation({
      query: (data) => ({
        url: `api/video_txt/`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: (result, error, { parent }) => [
      //   { type: "Category", id: parent },
      // ],
    }),
    audioToText: builder.mutation({
      query: (data) => ({
        url: `api/voice_text/`,
        method: "POST",
        body: data,
      }),
    }),
    textToAudio: builder.mutation({
      query: (data) => ({
        url: `api/txt_audio/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useTextExtractionMutation,
  useSummarizeTextMutation,
  useVideoToTextMutation,
  useAudioToTextMutation,
  useTextToAudioMutation,
} = convertApi;
