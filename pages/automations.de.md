---
title: Automationen
weight: 4
lang: de
description: Sinric Pro Automationen per Drag-and-drop erstellen. Geräte nach Uhrzeit, Sonnenauf- oder -untergang, Verzögerungen und Geräteereignissen auslösen und Push-Benachrichtigungen senden.
---

### Einführung in SinricPro Automationen

Mit SinricPro kannst du intelligente, automatisierte Abläufe für dein Smart Home erstellen, indem du Geräte verbindest und logische Abläufe festlegst. Im übersichtlichen Automations-Editor mit Drag-and-drop entwirfst du eigene Szenarien, die auf Ereignisse reagieren – ausgelöst durch Gerätezustände, die Uhrzeit oder Umgebungsbedingungen – ohne eine einzige Zeile Code zu schreiben.

Von einfachen Aufgaben wie dem Einschalten des Lichts bei Sonnenuntergang bis zu komplexen Abfolgen mit mehreren Geräten und zeitlichen Verzögerungen: SinricPro Automationen machen dein Smart Home intelligenter und reaktionsschneller. Ob du Abläufe für den Alltag einrichtest oder ganz persönliche Szenarien gestaltest, das Automations-Werkzeug von SinricPro ist flexibel, einfach zu bedienen und leistungsfähig – und das alles in einer aufgeräumten, benutzerfreundlichen Oberfläche.

## Schritt 1: Basic Info

![Sinric Pro automation creation intro]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-info.png) 

Im ersten Schritt gibst du die grundlegenden Informationen zur Automation an.

### Felder

- **Automation Name**  
  Gib einen aussagekräftigen Namen für deine Automation ein.  
  *Beispiel:* `TV Time`

- **Automation Description**  
  Beschreibe kurz, was die Automation tut. So weißt du später noch, wofür sie gedacht ist.  
  *Beispiel:* `When TV is on, dim lights`

### Navigation
Wenn du die grundlegenden Informationen ausgefüllt hast, klicke auf die Schaltfläche **Next**, um mit der Konfiguration des Ablaufs (Flow) fortzufahren.

---

## Schritt 2: Konfiguration des Ablaufs (Flow)

![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-flow.png) 

In diesem Schritt legst du die Logik deiner Automation fest, indem du Auslöser (Starter), Bedingungen (optional) und Aktionen einrichtest.

### Geräte als Auslöser, Bedingungen und Aktionen

Dieser Bereich listet die verfügbaren Geräte auf, die du als Auslöser oder Bausteine deiner Automation verwenden kannst. Du kannst diese Geräte per Drag-and-drop in den passenden Abschnitt ziehen (Starter, Conditions oder Actions).

#### **Starter**

Das ist das Ereignis, das die Automation startet. Es ist der „Wenn“-Teil, der den Ablauf in Gang setzt. Beispiel: `TV turned on`

#### **Conditions (optional)**

Das sind zusätzliche Prüfungen, die stattfinden, nachdem der Auslöser eingetreten ist. Sind die angegebenen Bedingungen nicht erfüllt, werden die Aktionen der Automation nicht ausgeführt, auch wenn der Auslöser eingetreten ist.

#### **Actions**

Die Aktionen, die ausgeführt werden sollen, z. B. das Licht einschalten oder den Thermostat verstellen.

 
####  Weitere Auslöser und Bausteine:

- **At a specific time** (zu einer bestimmten Uhrzeit)  
  *Beispiel:* `5:30pm on a Sunday`  
  Löst die Automation zu einer festgelegten Uhrzeit aus.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-select-a-time.png)


- **At sunrise or sunset** (bei Sonnenaufgang oder Sonnenuntergang)  
  *Beispiel:* `1hr before sunrise`  
  Löst abhängig von astronomischen Ereignissen aus.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-sunset-or-sunrise.png)

- **Between two times** (zwischen zwei Uhrzeiten)  
  *Beispiel:* `between 08:00 to 18:00`  
  Führt die Automation nur in einem bestimmten Zeitfenster aus. (Wird als Bedingung verwendet)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-between-two-times.png) 

- **Time delay** (Zeitverzögerung)  

  Fügt eine Verzögerung zwischen den Schritten des Ablaufs ein. (Wird als Aktion verwendet)

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-add-time-delay.png) 

- **Push Notification**  
  Sendet eine Push-Benachrichtigung, wenn die Automation ausgelöst wird.

  ![Sinric Pro automation creation flow]({{ site.github.url }}/public/img/sinricpro-portal-automation-creation-push-notification.png) 

> 💡 Tipp: Mit diesen Optionen ergänzt du deine Automation um zeit- oder kontextabhängige Logik.

Wenn du alle Teile der Automation eingerichtet hast:

- Klicke unten rechts auf die Schaltfläche **Save**, um deine Automation zu speichern.

---

## Beispiel für einen Automationsablauf

Gehen wir ein Beispiel durch:

1. **Basic Info**
   - Automation Name: `Evening Lights`
   - Automation Description: `Turn on living room lights at sunset`

2. **Flow**
   - **Starter:** Füge „At sunset“ aus dem rechten Bereich hinzu.
   - **Conditions:** Keine (optional).
   - **Actions:** Ziehe „living room light“ in den Abschnitt Actions und stelle es auf Einschalten.

So entsteht eine einfache Automation, die jeden Abend bei Sonnenuntergang das Licht im Wohnzimmer einschaltet.

---

## Bewährte Vorgehensweisen

- Verwende klare und knappe Namen und Beschreibungen.
- Teste Automationen nach dem Speichern, um sicherzugehen, dass sie wie erwartet funktionieren.
- Kombiniere Geräteereignisse mit zeitbasierten Auslösern, damit dein Zuhause intelligenter reagiert.
