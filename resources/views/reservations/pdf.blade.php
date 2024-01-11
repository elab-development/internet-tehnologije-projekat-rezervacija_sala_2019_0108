<!DOCTYPE html>
<html>
<head>
    <title>Rezervacija</title>
</head>
<body>
    <h1>Detalji Rezervacije</h1>
    <p><strong>ID Rezervacije:</strong> {{ $reservation->id }}</p>
    <p><strong>ID Korisnika:</strong> {{ $reservation->user_id }}</p>
    <p><strong>ID Sobe:</strong> {{ $reservation->room_id }}</p>
    <p><strong>Datum Rezervacije:</strong> {{ $reservation->reserved_date }}</p>
    <p><strong>Status:</strong> {{ $reservation->status }}</p>
    <!-- Ovde dodajte dodatne informacije po potrebi -->
</body>
</html>
