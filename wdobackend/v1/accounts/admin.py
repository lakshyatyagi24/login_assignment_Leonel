from django.contrib import admin
from .models import WDOUserModel

# Register your models here.

class WDOUserAdmin(admin.ModelAdmin):
    # Customize the display fields in the admin list view
    list_display = ('email', 'is_staff', 'date_joined')

    # Customize the search fields in the admin list view
    search_fields = ('email',)

    # Customize the filter options in the admin list view
    list_filter = ('is_staff', 'is_active')

    # Customize the fields displayed in the admin detail view
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    # Customize the ordering of objects in the admin list view
    ordering = ('-date_joined',)

admin.site.register(WDOUserModel, WDOUserAdmin)