import json

from bson import ObjectId
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from pymongo.collection import Collection

from .models import Voiture

def get_next_sequence_value(sequence_name):
    client = MongoClient()
    db = client.rent_cars
    counters = db.counters
    counter = counters.find_one_and_update(
        {"id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        upsert=True,
        return_document=True
    )
    return counter["sequence_value"]

#################################################manaers########################################################################
@csrf_exempt
# afficher tout les managers avec la methode get et ajouter une managers
def managers(request):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        managers_list = list(collection.find({}, {"_id": 0,"mot_de_passe":0}))  # Exclude the _id field
        return JsonResponse(managers_list, safe=False)

    elif request.method == 'POST':
        nom_utilisateur= request.POST.get('nom_utilisateur')
        mot_de_passe = request.POST.get('mot_de_passe')
        nom_complet = request.POST.get('nom_complet')
        email = request.POST.get('email')
        manager = {
            "id": get_next_sequence_value("manager_sequence"),  # Generate a unique ID for the document
            "nom_utilisateur":   nom_utilisateur,
            "mot_de_passe": mot_de_passe,
            "nom_complet": nom_complet,
            "email": email,
        }
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        print(managers)
        result = collection.insert_one(dict(manager))
        return JsonResponse("added successfully", safe=False)



@csrf_exempt
#supprimer un manager
def delete_manager(request, manager_id):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        result = collection.delete_one({'id': int(manager_id)})
        if result.deleted_count > 0:
            response = {"error": 0, "msg": "Manager deleted successfully"}
            return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Manager not found"}
            return JsonResponse(response, safe=False)


@csrf_exempt
#modifier un manager
def update_manager(request):
    if request.method == 'POST':
        nom_utilisateur = request.POST.get('nom_utilisateur')
        mot_de_passe = request.POST.get('mot_de_passe')
        nom_complet = request.POST.get('nom_complet')
        email = request.POST.get('email')
        manager_id=request.POST.get('id')
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        result = collection.update_one(
            {'id': int(manager_id)},
            {'$set': {
                'nom_utilisateur': nom_utilisateur,
                'mot_de_passe': mot_de_passe,
                'nom_complet': nom_complet,
                'email': email
            }}
        )
        if result.modified_count > 0:
            response = {"error": 0, "msg": "Manager updated successfully"}
            return JsonResponse(response, safe=False)
        else:
            response = {"error": 1, "msg": "Manager not found"}
            return JsonResponse(response, safe=False)




# afficher les champs la manager que je veux modifier
@csrf_exempt
def manager(request,manager_id):
    if request.method == 'GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        manager = collection.find_one({'id': int(manager_id)},{"_id": 0})
        return JsonResponse(manager, safe=False)



# afficher la somme des managers

#afficher la somme des reservations

#afficher la somme des utilisateurs

def get_user_status(request,email):
    if request.method=='GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        manager = collection.find_one({'email': email}, {"_id": 0})
        if manager:
            response = {"error": 0, "status": "manager"}
            return JsonResponse(response, safe=False)
        else:
            collection = db.get_collection('administrateurs')
            admin = collection.find_one({'email': email}, {"_id": 0})
            if admin:
                response = {"error": 0, "status": "admin"}
                return JsonResponse(response, safe=False)
        response = {"error": 1, "msg": "none"}
        return JsonResponse(response, safe=False)

# afficher la somme des managers

#afficher la somme des reservations

#afficher la somme des utilisateurs

def calculer_somme_clients(request):
    if request.method=='GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('clients')
        somme = collection.count_documents({})  # Compte le nombre total de documents dans la collection
        return JsonResponse(somme, safe=False)

def calculer_somme_reservations(request):
    if request.method=='GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('reservations')
        somme = collection.count_documents({})  # Compte le nombre total de documents dans la collection
        return JsonResponse(somme, safe=False)


def calculer_somme_managers(request):
    if request.method=='GET':
        client = MongoClient()
        db = client.rent_cars
        collection = db.get_collection('managers')
        somme = collection.count_documents({})  # Compte le nombre total de documents dans la collection
        return JsonResponse(somme, safe=False)