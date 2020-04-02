---
layout: post
title: Use filter in Django Rest Framework (DRF)
subtitle: Query easily with filter in DRF.
---

DRF provided a very robus method to query from client. Client can query multiple dataset without adding new endpoint.

For example: Assume we have 2 models, `Category` and `Article` 1 article can be belong to 1 category or no category at all.

Our customer wants to:
- Getting full list of articles
- Filter articles by cateogry ID, category UID
- Order articles by created time
- Order articles by category's created time

These requirements seem too much but it's very simple in DRF realm.

All we need are 2 kind of filters:
- `django_filter`: https://github.com/carltongibson/django-filter (note: use 2.x version)
- Build-in `OrderingFilter` of DRF

To use `django_filter`, we need 2 steps if we don't use `generics.ListAPIView`:
- Define custom filter
- Tell DRF the filters we want to use
- Declare `filterset_class` in the view we want to use.

## Define custom filter:
I recommend to put filters in separate file instead of inside `models.py`.
`api/apps/article/filters.py`
```
from django_filters import rest_framework as filters
from .models import Article


class ArticleFilter(filters.FilterSet):
    category = filters.NumberFilter(field_name='category_id')
    category_uid = filters.CharFilter(field_name='category__uid')

    class Meta:
        model = Article
        fields = {
            'category': ['exact', 'isnull'],
            'category_uid': ['exact'],
        }
```

## Tell DRF the filters we want to use in `settings.py`:
```
REST_FRAMEWORK = {
    '''
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        ...
    ),
    ...
}
```

## Declare filter:
```
class ArticleViewSet(GenericViewSet):
    filterset_class = ArticleFilter
    ordering_fields = ('id', 'category', )
    ...
```
That is, this is the [demo](https://github.com/tbson/demo_django_filter):
