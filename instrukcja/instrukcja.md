
# Instrukcja

## Dodawanie plików zaimportowanych

  Aby dodać plik zaimportowany, należy w `index.kit` dodać wpis `@@include('_nav.kit')`, a w utworzonym pliku dodać wpis np `<nav></nav>`.

## Sprawdzanie aktualizacji pakietów

  Aby sprawdzić aktualizacje pakietów i utworzyć plik z informacjami o aktualizacjach, wykonaj następujące kroki:

  1. Otwórz terminal w katalogu głównym projektu.
  2. Wpisz polecenie `gulp checkPackageUpdates`.
  3. Zadanie sprawdzi dostępne aktualizacje pakietów i wyświetli informacjami o aktualizacjach.

  Pamiętaj, aby regularnie sprawdzać aktualizacje, aby utrzymać swoje zależności na bieżąco.
  
## Tworzenie kopii zapasowej

Aby utworzyć kopię zapasową folderów "dist", "html", "instrukcja", "src" oraz plików "gulpfile.mjs", ".gitignore" i "package.json", wykonaj następujące kroki:

1. Upewnij się, że dodano funkcję "backupProject" oraz odpowiednie importy do pliku "gulpfile.mjs" oraz zdefiniowano nowe zadanie Gulp o nazwie "backup".

2. Otwórz konsolę i przejdź do katalogu głównego projektu.

3. Wpisz w konsoli polecenie: gulp backup

4. Kopia zostanie wykonana "Z:_www"
5. w Katalogu głównym sprawdz plik nr.txt w którym będzie unikalny numer backup utworzonego dla twojej kopii
6. Utworzona kopia będzie miała nazwę z tym numerem

## Pamiętaj o meta

<!-- <meta
      name="description"
      content="Jesteśmy młodym "
    />
    <meta
      name="keywords"
      content="tworzenie stron www... "
    />
    <meta name="robots" content="index, follow">
    <meta name="author" content="uroboros.online">
</meta> -->

## Kompresja obrazów za pomocą TinyPNG

Funkcja "compressImages" pozwala na kompresję obrazów w formatach PNG, JPG i JPEG za pomocą usługi TinyPNG. Kompresja obrazów może znacznie zmniejszyć ich rozmiar, co przekłada się na szybsze wczytywanie strony.

Aby skorzystać z funkcji "compressImages", należy wykonać następujące kroki:

1. Upewnij się, że pakiet "gulp-tinypng-compress" jest zainstalowany w projekcie (jeśli nie, postępuj zgodnie z wcześniejszymi instrukcjami instalacji).

2. Zamień "YOUR_API_KEY" na klucz API TinyPNG w funkcji "compressImages" w pliku "gulpfile.mjs". Klucz API można uzyskać, rejestrując się na stronie [TinyPNG Developer API](https://tinypng.com/developers).

3. Uruchom zadanie Gulp, które kompresuje obrazy za pomocą TinyPNG. Otwórz terminal w katalogu głównym projektu i wpisz polecenie:

gulp compressImages

Skompresowane obrazy zostaną zapisane w folderze "dist/img".

## Wyjaśnienie funkcji

createServerFile() - Funkcja createServerFile tworzy plik server.js, który służy jako prosty serwer HTTP. Dzięki temu można szybko uruchomić lokalny serwer, aby sprawdzić działanie aplikacji lub strony internetowej w środowisku deweloperskim.
  
Plik server.js jest tworzony w głównym katalogu projektu (tam, gdzie znajduje się plik gulpfile.mjs).
 
Aby uruchomić serwer, otwórz terminal w głównym katalogu projektu i wpisz:

node server.js

Po uruchomieniu, serwer będzie dostępny pod adresem http://localhost:3005/.

compressImages - funkcja kompresuje obrazy w formatach PNG, JPG i JPEG za pomocą usługi TinyPNG. Skompresowane obrazy zostają zapisane w folderze "dist/img".

optimizeImages - funkcja optymalizuje obrazy, zmniejszając ich rozmiar bez znacznego wpływu na jakość. Obrazy zoptymalizowane zostają zapisane w folderze "dist/img".

createFolders - funkcja tworzy foldery niezbędne do prawidłowego działania projektu, jeśli jeszcze nie istnieją.

copyImages - funkcja kopiuje obrazy z folderu "src/img" do folderu "dist/img".

checkFoldersExist - funkcja sprawdza, czy wszystkie potrzebne foldery istnieją.

createFiles - funkcja tworzy pliki niezbędne do prawidłowego działania projektu, jeśli jeszcze nie istnieją.

checkFoldersAndFiles - funkcja wywołuje funkcje createFolders oraz createFiles.

minifyJS - funkcja minifikuje pliki JavaScript z folderu "src/js" i zapisuje je w folderze "dist/js" z rozszerzeniem ".min.js".

checkPHP - funkcja kopiuje pliki PHP z folderu "src/php" do głównego folderu projektu.

compileKit - funkcja kompiluje pliki .kit z folderu "html" do plików .html i zapisuje je w głównym folderze projektu.

minifyCSS - funkcja kompiluje i minifikuje pliki SCSS z folderu "src/sass" do plików CSS, zapisując je w folderze "dist/css" z rozszerzeniem ".min.css".

watch - funkcja monitoruje zmiany we wszystkich plikach projektu i wywołuje odpowiednie funkcje, gdy pliki zostają zmienione. Ponadto, funkcja synchronizuje przeglądarkę, aby odświeżać stronę po każdej zmianie.

checkPackageUpdates - funkcja sprawdza dostępne aktualizacje pakietów npm, a następnie tworzy plik "aktualizacja.txt" z informacjami o aktualizacjach.

backupProject - funkcja tworzy kopię zapasową projektu, zapisując ją jako plik .zip w określonym katalogu.