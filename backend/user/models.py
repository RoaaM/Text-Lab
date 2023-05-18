from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from .manager import CustomUserManager

USERNAME_REGEX = r"^[\w.@+\- ]+$"


class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[RegexValidator(regex=USERNAME_REGEX, code="invalid_username")],
    )

    email = models.EmailField(_("email address"), unique=True)

    is_admin = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
