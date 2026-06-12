<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation', function (Blueprint $table) {
            $table->id("idReservation");
            $table->date("dateReservation");
            $table->integer("nombrePersonnes");
            $table->decimal("montantTotal", 10, 2);
            $table->enum("statut", [
                'En attente',
                'Paiement en vérification',
                'Confirmée',
                'Annulée'
            ]);
            $table->unsignedBigInteger("idClient");
            $table->unsignedBigInteger("idVoyage");

            $table->foreign("idClient")->references("idClient")->on("client")->onDelete("cascade");
            $table->foreign("idVoyage")->references("idVoyage")->on("voyage")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};
