<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class storeVoyageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dateDepart' => [
                'required',
                'date',
                'after:today'
            ],

            'dataRetour' => [
                'required',
                'date',
                'after:dateDepart'
            ],
            
            'prix' => [
                'required',
                'numeric',
                'min:0'
            ],

            'placeDispo' => [
                'required',
                'integer',
                'min:1'
            ],
        ];
    }

    //message d'erreur personnalisé pour les données invalide
    public function messages() :array {
        return [
            'dateDepart.required' => "La date de depart est obligatoire",
            'dateDepart.after' => "La date de départ doit être après aujourd'hui",

            'dataRetour.required' => "La date de retour est obligatoire",
            'dataRetour.after' => "La date de retour doit être après la date de départ",

            'prix.required' => "Le prix est obligatoire",
            'prix.min' => "Le prix ne peut pas être négatif",

            'placeDispo.required' => "Le nombre de place est obligatoire",
            'placeDispo.min' => "il doit y avoir au moin une place"
        ];
    }

    //renommer les champs pour les affichaegs au cas où
    public function attributes(): array {
        return [
            'idDestination' => 'Destination',
            'dateDepart' => 'Date de départ',
            'dataRetour' => 'Date de retour',
            'placeDispo' => 'Places disponibles',
        ];
    }
}
