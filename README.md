# Roamly

Podczas planowania wakacji lub podróży, dużym problemem dla ludzi jest określenie optymalnej trasy między kilkoma punktami zaplanowanymi do odwiedzenia. Aby rozwiązać ten problem, pojawił się pomysł stworzenia wygodnej aplikacji mobilnej, która pomoże użytkownikom planować i organizować wycieczki, budując trasę między wybranymi punktami.

Aplikacja posiada trzy różne typy tworzenia tras: osobisty, optymalny i względem czasu zaplanowanego na podróż. W przypadku niektórych typów tras konieczne będzie określenie dodatkowych parametrów, które będą brane pod uwagę w algorytmie podczas tworzenia trasy. Po wybraniu miejsc do odwiedzenia, określeniu parametrów i kryterium budowy trasy, aplikacja buduje trasę za pomocą algorytmu do obliczenia najbardziej efektywnej trasy.

Aplikacja, która ma funkcjonalność planowania podróży i budowania optymalnej trasy z uwzględnieniem różnorodnych potrzeb użytkowników, stanie się asystentem nie tylko w podróżach, ale także w procesach biznesowych. 


## Główne funkcje aplikacji
**Sposoby znajdowania miejsc.**

Aby uzyskać żądane miejsca, należy najpierw otworzyć okno modalne, klikając przycisk „Places”, który znajduje się na pasku menu na ekranie głównym.

W aplikacji istnieją dwa sposoby znalezienia miejsca. 

Pierwszym sposobem jest wprowadzenie tekstu do pola tekstowego. 

Drugim sposobem na znalezienie miejsca jest wypełnienie filtrów. 

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/sposoby%20znajdowania%20miejsc%20-%20autocomplete.png" width="250">      <img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/sposoby%20znajdowania%20miejsc%20-%20filtr.PNG" width="250">

**Informacje o miejscu oraz dodawanie i usuwanie miejsc z zapisanych.**

Aby uzyskać więcej informacji o danym miejscu, należy kliknąć na jego blok wśród listy miejsc. Następnie pojawi się okno zawierające informacje o wybranej lokalizacji. Okno modalne może zawierać informacje, takie jak zdjęcia, ocena, nazwa, adres, współrzędne, strona internetowa, numer telefonu, godziny otwarcia i recenzje.

Miejsca w aplikacji można zapisać jako miejsca, które zostały już odwiedzone i te, które jeszcze nie zostały odwiedzone. W ten sposób użytkownik może śledzić swoje plany na przyszłą wizytę i przypomnieć sobie przeszłe wycieczki.

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/informacje%20o%20miejscu.PNG" width="250">

**Tworzenie własnego miejsca.**

Aplikacja zapewnia możliwość tworzenia własnych miejsc. Ta funkcjonalność umożliwia użytkownikowi dodawanie nowych miejsc, które mogą być dla niego osobiście przydatne i ważne.

Aby stworzyć własne miejsce należy najpierw otworzyć okno modalne „Places” i wpisać nazwę miejsca w polu tekstowym, a następnie kliknąć ikonę. 

Znacznik miejsca utworzony w ten sposób ma możliwość poruszania się. Dzięki temu użytkownik może łatwo i wygodnie zmienić pozycję znacznika, po prostu przeciągając go do nowej lokalizacji.

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/tworzenie%20w%C5%82asnego%20miejsca.png" width="250">

**Budowanie tras.**

Aplikacja posiada trzy różne typy tworzenia tras, dzięki czemu użytkownicy mogą wybrać najbardziej odpowiedni dla siebie.

Pierwszy typ trasy nazywa się „do podróży”. Buduje trasę w stosunku do czasu określonego przez użytkownika. Czas, który można określić, jest podzielony na 2 typy, czas w godzinach, które użytkownik chce spędzić w drodze dziennie i liczbę dni na podróż. Obowiązkowym parametrem jest miejsce, do którego użytkownik powróci na noc – może to być hotel, hostel lub pole namiotowe. 

W tego typu trasie dodano przycisk umożliwiający zmianę dni, jeśli zajdzie taka potrzeba. Ten przycisk pozwala użytkownikom wybrać konkretny dzień, aby wyświetlić trasę.

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/budowanie%20tras%20-%20do%20podrozy.PNG" width="250">      <img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/budowanie%20tras%20-%20do%20podrozy%20trasa.PNG" width="250">

Drugi typ to optymalna trasa, budowana w stosunku do wszystkich punktów, które zostały zapisane jako miejsca do odwiedzenia. Istnieją 4 kryteria optymalnych dróg według czasu, odległości, oceny i wszystkich kryteriów. W tym typie można określić punkt początkowy i końcowy, aby zbudować trasę. 

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/budowanie%20tras%20-%20optymalna.PNG" width="250">      <img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/budowanie%20tras%20-%20optymalna%20trasa.PNG" width="250">

Ostatni trzeci rodzaj budowy drogi nazywa się „osobistym”, można go zbudować, przeciągając bloki z miejscami w określonej kolejności. Ten typ umożliwia użytkownikom tworzenie niestandardowych i unikalnych tras.

Po pomyślnym zbudowaniu trasy w aplikacji użytkownik może otworzyć okno modalne, które pokaże plan trasy. W tym oknie modalnym zostanie wyświetlona lista nazw miejsc w kolejności ich odwiedzania.

<img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/budowanie%20tras%20-%20osobista.PNG" width="250">      <img src="https://github.com/AliaksandraH/Roamly/blob/main/overview/trasa.PNG" width="250">

## Jak zacząć korzystać z aplikacji:
1. Instalacja *Expo Go*.

Aby uruchomić aplikację, musisz najpierw zainstalować aplikację *Expo Go* na swoim urządzeniu mobilnym. Możesz znaleźć ją w *App Store* dla urządzeń *iOS* lub w *Google Play* dla urządzeń *Android*.

2. Uruchomienie aplikacji.
   
Po zainstalowaniu *Expo Go* na swoim urządzeniu, zeskanuj poniższy kod *QR* za pomocą aplikacji *Expo Go* lub *Aparatu*:

![QR](https://github.com/AliaksandraH/Roamly/blob/main/overview/QR.png)

**Gotowe!**

Teraz możesz cieszyć się korzystaniem z mojej aplikacji mobilnej. 



**Jeśli masz jakiekolwiek pytania lub wątpliwości, skontaktuj się ze mną :)**

**Kontakt: aliaksandra.hurskaya@gmail.com**
