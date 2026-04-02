Zadanie ma na celu sprawdzenie:
- umiejetnosci samodzielnej konfiguracji srodowiska
- umiejetnosci stworzenia podstawowego endpointa w rails (na podstawie juz istniejacego)
- umiejetnosci stworzenia widoku crud w react (na podstawie juz istniejacego)
- umiejetnosci rozwiazywania bugow
- znajomosci react, rails, redux

do odpalenia backendu:
- nalezy zainstalowac odpowiednia wersje ruby - 2.6.10 
  windows:
  -instalator znajduje sie na stronie https://rubyinstaller.org/downloads/
  -wersja jaka nalezy pobrac to Ruby+Devkit 2.6.10
  -instalujemy z domyslnie zaznaczonymi opcjami
  -po zakonczeniu procesu instalacji pojawi sie okno konfiguracji MSYS2, klikamy enter
  -po skonfigurowaniu klikamy jeszcze raz enter
- zainstalowac dependencies z gemfile przy uzyciu bundlera (bundle install)
- odpalic rake db:setup i rake db:seed
- jezeli wszystko poszlo pomyslnie wystarczy odpalic serwer: rails server

do odpalenia frontendu:
- instalujemy node w wersji v14.x 
- instalujemy dependencies z package.json
- odpalamy npm run start

do zrobienia:
- chcemy miec widok listy certyfikatow (czyli kursow jakie ukonczyl dany user) z mozliwoscia dodawania edycji usuwania (crud)
- certyfikat ma miec pola - nazwa (text), opis (textarea) i user(select)
- bug: po zalogowaniu powinnismy wyladowac na stronie userow (obecnie pokazywana jest strona logowania z gornym menu)
- dodanie menu itema "Terms" ktory po kliknieciu otworzy modal z regulaminem (przy uzyciu redux)