/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

// Das Modul express wird mit der Funktion require einer Konstanten namens express zugwiesen.

const express = require('express');

// Der Body-Parser ermöglicht es uns, Daten aus dem Kundenformular auf dem Server entgegenzunehmen.
// Der Body-Parser wird im Terminal mit dem Befehl 'npm install -g body-parser' installiert.

const bodyParser = require('body-parser');

// Die Anweisungen werden von oben nach unten abgearbeitet. Der Wert 3000 wird von rechts nach links 
// zugewiesen an die Konstante namens PORT. Das einfache Gleichheitszeichen lässt sich also übersetzen
// mit "... wird zugewiesen an ..."

const PORT = 3001;

// Der Wert '0.0.0.0' wird zugewiesen an eine Konstante namens HOST 
const HOST = '0.0.0.0';

// App

const app = express();

// Es wird der App bekanntgegeben, wo die styles zu finden sind.
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Der Bodyparser wird in der app eingebunden.

app.use(bodyParser.urlencoded({extended: true}))


// Hier kommt das Kunden(-berater) objekt hin:

class Kunde{
	constructor(){
		this.Id
		this.Benutzername
		this.Kennwort
		this.Vorname
		this.Nachname
	}
}

let kunde = new Kunde
kunde.id = 1
kunde.benutzername = "Klaus"
kunde.kennwort = "a123"
kunde.vorname = "Klaus"
kunde.nachname = "Schöttler"

class Kundenberater{
	constructor(){
		this.Name
		this.Angesteltenid
	}
}

let kundenberater1 = new Kundenberater
kundenberater1.name = "Frank Müller"
kundenberater1.angesteltenid = 1

let kundenberater2 = new Kundenberater
kundenberater2.name = "Karsten Schoppen"
kundenberater2.angesteltenid = 2

let aktiverberatername
if(kunde.id <=10 && kunde.id >=1){
	aktiverberatername = kundenberater1.name
} else {
	aktiverberatername = kundenberater2.name
}


app.get('/login', (req, res) => {
	res.render('login.ejs',{
		Meldung: ""
	});
});

app.post('/login', (req, res) => {

	// Die Werte, die der Kunde im Formular eingegeben hat, werden an den Server gesendet.
	// Der Wert der Variablen Betrag wird aus dem body der Kundenanfrage (req) ausgelesen und zugewiesen an die lokale Variable
	// namens betrag.

	let kennwort = req.body.Kennwort
	console.log("login: Kennwort: " + kennwort)

	let benutzername = req.body.Benutzername;
	console.log("login: Benutzername " + benutzername)

	if(kunde.benutzername === benutzername && kunde.kennwort === kennwort){
		res.render('index.ejs',{})
	} else {
	res.render('login.ejs',{
		Meldung: "Versuchen sie es erneut"
	})};
});

app.get('/hilfe', (req, res) => {
	res.render('hilfe.ejs',{
		Kundenberater: aktiverberatername
	});
});

app.get('/profil', (req, res) => {
	res.render('profil.ejs',{});
});

app.get('/', (req, res) => {
	res.render('index.ejs',{});
});

app.get('/agb', (req, res) => {
	res.render('agb.ejs',{});
});

app.get('/kontenuebersicht', (req, res) => {
	res.render('kontenuebersicht.ejs',{});
});


app.get('/postfach', (req, res) => {
	res.render('postfach.ejs',{});
});

app.get('/kreditBeantragen', (req, res) => {
	res.render('kreditBeantragen.ejs',{
		Kreditbetrag:120,
		Laufzeit:2,
		Zinssatz:10,
		Meldung: ""
	})
});

app.post('/kreditBeantragen', (req, res) => {

	let kreditbetrag = req.body.Kreditbetrag;
	console.log("kreditBeantragen: Gewünschte Summe: " + kreditbetrag + " Euro")

	let laufzeit = req.body.Laufzeit;
	console.log("kreditBeantragen: Gewünschte Laufzeit: " + laufzeit + " Jahre")

	let zinssatz = req.body.Zinssatz;
	console.log("kreditBeantragen: Gewünschter Zinssatz: " + zinssatz + " Prozent")

	let kredit = kreditbetrag * Math.pow(1 + zinssatz /100, laufzeit);
	console.log("kreditBeantragen: Kredit Summe: " + kredit + " Euro")
	res.render('kreditBeantragen.ejs',{
		Kreditbetrag: kreditbetrag,
		Laufzeit: laufzeit,
		Zinssatz: zinssatz,
		Meldung: "Die zurückzuzahlende Summe beträgt: " + kredit + " Euro"
	});
});

app.get('/ueberweisungAusfuehren', (req, res) => {
	res.render('ueberweisungAusfuehren.ejs',{});
});

// Die Funktion app.get('/geldAnlegen...) wird abgearbeitet, wenn der Benutzer die Seite geldAnlegen
// im Browser ansurft.

app.get('/geldAnlegen', (req, res) => {

	// Die Serverantwort an den Browser wird gerendert an den Browser zurückgegeben.
	// Dazu wird die Funktion render() aufgerufen. 

	res.render('geldAnlegen.ejs',{

		// In der geldAnlegen.ejs gibt es die Variablen Betrag und Laufzeit.
		// Der Server übergibt die folgenden Werte an den Browser:

		Betrag:120,
		Laufzeit:2,
		Meldung: ""
	})
});

// Die Funktion app.post('/geldAnlegen...) wird abgearbeitet, wenn der Kunde auf dem Formular den Absenden-Button klickt.

app.post('/geldAnlegen', (req, res) => {

	// Die Werte, die der Kunde im Formular eingegeben hat, werden an den Server gesendet.
	// Der Wert der Variablen Betrag wird aus dem body der Kundenanfrage (req) ausgelesen und zugewiesen an die lokale Variable
	// namens betrag.

	let betrag = req.body.Betrag;
	console.log("geldAnlegen: Gewünschter Betrag: " + betrag + " Euro")

	let laufzeit = req.body.Laufzeit;
	console.log("geldAnlegen: Gewünschte Laufzeit: " + laufzeit + " Jahre")

	let zinssatz = 0.1

	let zinsen = betrag * zinssatz;

	res.render('geldAnlegen.ejs',{
		Betrag: betrag,
		Laufzeit: laufzeit,
		Meldung: "Ihre Zinsen betragen: " + zinsen
	});
});





// Mit listen() wird der Server angewiesen, auf den angegebenen Host und
// Port zu lauschen.  
app.listen(PORT, HOST);

// Mit der Anweisung console.log() wird dem Server-Administrator auf der
// Konsole angezeigt, was der Server macht. Der Programmierer schreibt dazu 
// in die runden Klammern den Ausdruck, der auf der Konsole angezeigt
// werden soll. Die Werte der beiden Konstanten HOST und PORT werden in den
// Ausdruck übergeben. Ein Verb mit anschließenden runden Klammern steht
// immer für eine Anweisung etwas zu tun. 
console.log(`Running on http://${HOST}:${PORT}`);
