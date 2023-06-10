from django.urls import path
from . import views_manager, views_admin

urlpatterns = [
    #manager
    path('cars/', views_manager.cars,name='voitures'),
    path('delete_car/<int:car_id>/', views_manager.delete_car),
    path('update_car/', views_manager.update_car),
    path('car/<int:car_id>/', views_manager.show_car),
    path('cars_available/', views_manager.show_cars_availble),
    path('cars_reserved/', views_manager.show_cars_reserved),


    path('insert_client/', views_manager.insert_client),
    path('client/<int:client_id>/', views_manager.show_client),
    path('delete_client/<int:client_id>/', views_manager.delete_client),
    path('update_client/', views_manager.update_client),
    path('clients/', views_manager.show_all_clients),

    path('insert_request_reservation/', views_manager.insert_request_reservation),
    path('all_request/', views_manager.all_waiting_reservations),
    path('accept_reservation/', views_manager.accept_reservation),
    path('finish_reservation/', views_manager.finish_reservation),
    path('all_finished_reservations/', views_manager.all_finished_reservations),
    path('show_reservation/<int:reservation_id>/', views_manager.show_reservation),
    path('all_reservations/', views_manager.all_reservations),
    path('refuse_reservation/', views_manager.refuse_reservation),

    #admin
    path('managers/', views_admin.managers,name='managers'),
    path('delete_manager/<int:manager_id>/', views_admin.delete_manager),
    path('update_manager/', views_admin.update_manager),
    path('manager/<int:manager_id>/', views_admin.manager),
    path('calculer_somme_clients/', views_admin.calculer_somme_clients),
    path('get_user_status/<email>/', views_admin.get_user_status),
    path('calculer_somme_reservations/', views_admin.calculer_somme_reservations),
    path('calculer_somme_managers/', views_admin.calculer_somme_managers),

    #manager

]