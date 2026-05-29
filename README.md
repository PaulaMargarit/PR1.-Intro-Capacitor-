# PR1. Intro Capacitor
Autor: **Paula Margarit Corominas**

## Descripció
L’aplicació permet a l’usuari seleccionar una imatge de la galeria del dispositiu i extreure’n automàticament una paleta de colors mitjançant la llibreria *ColorThief*. A partir d’aquesta paleta, la Pantalla 3 genera una composició visual dinàmica utilitzant **p5.js**, dibuixant cercles aleatoris amb els colors obtinguts.

El projecte incorpora un **mode clar/fosc**, que modifica tant la interfície com el fons del canvas. L’estat del mode nit i la paleta seleccionada es guarden al `localStorage`, de manera que es mantenen encara que l’usuari tanqui l’aplicació.

La navegació entre pantalles es gestiona amb JavaScript, i l’aplicació està preparada per executar-se tant al navegador com en un dispositiu Android gràcies a **Capacitor**. A Android, l’usuari pot accedir a la galeria mitjançant el plugin oficial de la càmera.

## Tecnologies utilitzades
- Java Script
- HTML / CSS
- p5.js
- Capacitor
- Android Studio
- Vite 8
- ColorThief.js

## Instal·lació
1. Entra al directori del projecte:
   ```bash
   cd nom-del-repo

3. Instal·la les dependències:
   npm install
   
4. Executa el projecte en mode desenvolupament:
   npm run dev
   
## Executar a Android
1. Instal·la dependències (si no s’ha fet abans):
   npm install

2. Sincronitza Capacitor:
   npx cap sync

3. Obre el projecte a Android Studio:
   npx cap open android
   
4. Executar l’app en un emulador o dispositiu físic.
   
## Llicència 
Aquest projecte està publicat sota la llicència MIT.
