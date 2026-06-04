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
        Schema::create('paiement', function (Blueprint $table) {
            $table->id("idPaiement");
            $table->decimal("montant", 10, 2);
            $table->date("datePaiement");
            $table->string("modePaiement");
            $table->string("preuvePaiment");
            $table->enum("statutVerification", [
                'En attente',
                'Validé',
                'Réfusé'
            ]);
            $table->unsignedBigInteger("idReservation");

            $table->foreign("idReservation")->references("idReservation")->on("reservation")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiement');
    }
};
