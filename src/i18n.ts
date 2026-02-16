import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        lng: "tr",
        fallbackLng: "en",
        resources: {
            tr: {
                translation: {
                    // Home Screen
                    home_title: "Ruhun Gıdası",
                    welcome_1: "Ruhun Gıdası'na hoş geldiniz.",
                    home_intro_1: "Malzemeleri Ayarla menüsünden seçim yapabilirsiniz.",
                    home_intro_2: "Yemek Vakti menüsünde günlük gıdanızı alabilirsiniz.",
                    nav1: "Malzemeleri Ayarla",
                    nav2: "Yemek Vakti",
                    nav3: "Bilgi",

                    // Recipe Screen
                    recipe_title: "Ruhun Gıdası — Malzemeleri Ayarla",
                    // Dhikr
                    recipe_dhikr_title: "Zikir",
                    recipe_dhikr_desc: "Zikir adını ve günde kaç adet yapmayı hedeflediğinizi yazabilirsiniz. (Ör: \"Ya Latif\", 129 kere).",
                    recipe_dhikr_placeholder1: "Hangi zikir? (ör: Ya Latif)",
                    recipe_dhikr_placeholder2: "Kaç adet? (ör: 129)",
                    recipe_dhikr_button: "+ Tarife Ekle",
                    // Quran
                    recipe_quran_title: "Kur'an-ı Kerim",
                    recipe_quran_desc: "Kur'an-ı Kerim hedefi için günde kaç sayfa okumak istediğinizi ve hangi sayfadan başlayacağınızı belirtebilirsiniz. (Ör: Günde 2 sayfa, 1. sayfadan başlamak).",
                    recipe_quran_label1: "Günde kaç sayfa? (ör: 2)",
                    recipe_quran_placeholder1: "Günde kaç sayfa? (ör: 2)",
                    recipe_quran_label2: "Kaçıncı sayfadan başlamak istersiniz?",
                    recipe_quran_placeholder2: "Kaçıncı sayfadan başlamak istersiniz? (ör: 1)",
                    recipe_quran_button: "+ Tarife Ekle",
                    // Jawshan
                    recipe_jawshan_title: "Cevşen",
                    recipe_jawshan_desc: "Cevşen hedefi için günde kaç bab okumak istediğinizi yazabilirsiniz. (Ör: Günde 15 bab, haftada 1 Cevşen biter).",
                    recipe_jawshan_placeholder: "Günde kaç bab? (ör: 15)",
                    recipe_jawshan_button: "+ Tarife Ekle",
                    // Memorization
                    recipe_memorization_title: "Ezber",
                    recipe_memorization_desc: "Ezber hedefi için ezberlemek istediğiniz surenin numarasını, başlangıç ayet numarasını ve bitiş ayet numarasını (dahil) belirtin. (Ör: Ra'd=13, 28-28 sadece 1 ayettir).",
                    recipe_memorization_label1: "Kaçıncı sure? (ör: Ra'd=13, Bakara=2)",
                    recipe_memorization_placeholder1: "Kaçıncı sure? (ör: Ra'd=13, Bakara=2)",
                    recipe_memorization_label2: "Ayet başlangıç numarası? (ör: 28)",
                    recipe_memorization_placeholder2: "Ayet başlangıç numarası? (ör: 28)",
                    recipe_memorization_label3: "Ayet bitiş numarası? (ör: 28)",
                    recipe_memorization_placeholder3: "Ayet bitiş numarası? (ör: 28)",
                    recipe_memorization_button: "+ Tarife Ekle",

                    // Alerts
                    alert_error: "Hata",
                    alert_missing: "Eksik",
                    alert_success: "Başarılı",

                    alert_quran_target_empty: "Kur'an-ı Kerim hedefi boş olamaz.",
                    alert_quran_target_invalid: "Günlük hedef 1 veya daha büyük olmalıdır.",
                    alert_quran_start_empty: "Kur'an-ı Kerim başlangıç sayfası boş olamaz.",
                    alert_quran_start_invalid: "Başlangıç sayfası 1 veya daha büyük olmalıdır.",
                    alert_quran_start_nan: "Kur'an-ı Kerim başlangıç sayfası sayı olmalıdır.",
                    alert_quran_saved: "Kur'an hedefi eklendi.",

                    alert_dhikr_empty: "Zikir adı ve adet boş olamaz.",
                    alert_dhikr_invalid: "Zikir adeti sayı olmalıdır.",
                    alert_dhikr_saved: "Zikir hedefi eklendi.",

                    alert_jawshan_empty: "Cevşen hedefi boş olamaz.",
                    alert_jawshan_invalid: "Cevşen hedefi sayı olmalıdır.",
                    alert_jawshan_saved: "Cevşen hedefi eklendi.",

                    alert_memorization_empty: "Ezber hedefi boş olamaz.",
                    alert_memorization_invalid: "Ezber hedefi sayı olmalıdır.",
                    alert_memorization_range_invalid: "Ayet aralığı hatalı (başlangıç bitişten büyük olamaz).",
                    alert_memorization_saved: "Ezber hedefi tarife eklendi.",

                    // Reset Progress
                    recipe_reset_button: "Tüm ayarları sıfırla",
                    alert_reset_confirm: "Tüm ayarlar ve ilerleme verileri silinecek. Devam etmek istiyor musunuz?",
                    alert_reset_done: "Tüm ayarlar başarıyla sıfırlandı.",

                }
            },
            en: {
                translation: {
                    // Home Screen
                    home_title: "Food of the Soul",
                    welcome_1: "Welcome to Food of the Soul.",
                    home_intro_1: "In the Configure Ingredients menu, you can choose what you want to add to Food of the Soul.",
                    home_intro_2: "In Food Time, you can take your daily nourishment based on your selected ingredients.",
                    nav1: "Configure Ingredients",
                    nav2: "Food Time",
                    nav3: "Info",

                    // Recipe Screen
                    recipe_title: "Food of the Soul — Configure Ingredients",
                    // Dhikr
                    recipe_dhikr_title: "Dhikr",
                    recipe_dhikr_desc: "Enter the dhikr name and your daily target. (Example: Ya Latif, 129 times.)",
                    recipe_dhikr_placeholder1: "Which dhikr? (e.g. Ya Latif)",
                    recipe_dhikr_placeholder2: "How many times? (e.g. 129)",
                    recipe_dhikr_button: "+ Add",
                    // Quran
                    recipe_quran_title: "Qur'an",
                    recipe_quran_desc: "Set your daily page target and the page you want to start from. (Example: 2 pages per day, start at page 1.)",
                    recipe_quran_label1: "How many pages per day? (e.g. 2)",
                    recipe_quran_placeholder1: "How many pages per day? (e.g. 2)",
                    recipe_quran_label2: "Which page do you want to start from?",
                    recipe_quran_placeholder2: "Which page do you want to start from? (e.g. 1)",
                    recipe_quran_button: "+ Add",
                    // Jawshan
                    recipe_jawshan_title: "Jawshan",
                    recipe_jawshan_desc: "Set how many sections (bab) you want to read per day. (Example: 15 bab per day, one Jawshan per week.)",
                    recipe_jawshan_placeholder: "How many bab per day? (e.g. 15)",
                    recipe_jawshan_button: "+ Add",
                    // Memorization
                    recipe_memorization_title: "Memorization",
                    recipe_memorization_desc: "Enter the surah number and the start-end ayah numbers (inclusive). (Example: 13 (Ra'd), 28-28 is one ayah.)",
                    recipe_memorization_label1: "Which surah? (e.g. Ra'd=13, Baqarah=2)",
                    recipe_memorization_placeholder1: "Which surah? (e.g. Ra'd=13, Baqarah=2)",
                    recipe_memorization_label2: "Start ayah number? (e.g. 28)",
                    recipe_memorization_placeholder2: "Start ayah number? (e.g. 28)",
                    recipe_memorization_label3: "End ayah number? (e.g. 28)",
                    recipe_memorization_placeholder3: "End ayah number? (e.g. 28)",
                    recipe_memorization_button: "+ Add",
                    // Alerts
                    alert_error: "Error",
                    alert_missing: "Missing",
                    alert_success: "Success",

                    alert_quran_target_empty: "Qur'an daily target cannot be empty.",
                    alert_quran_target_invalid: "Daily target must be 1 or greater.",
                    alert_quran_start_empty: "Start page cannot be empty.",
                    alert_quran_start_invalid: "Start page must be 1 or greater.",
                    alert_quran_start_nan: "Start page must be a number.",
                    alert_quran_saved: "Qur'an target added.",

                    alert_dhikr_empty: "Dhikr name and count cannot be empty.",
                    alert_dhikr_invalid: "Dhikr count must be a number.",
                    alert_dhikr_saved: "Dhikr target added.",

                    alert_jawshan_empty: "Jawshan target cannot be empty.",
                    alert_jawshan_invalid: "Jawshan target must be a number.",
                    alert_jawshan_saved: "Jawshan target added.",

                    alert_memorization_empty: "Memorization goal cannot be empty.",
                    alert_memorization_invalid: "Memorization goal must be a number.",
                    alert_memorization_range_invalid: "Invalid ayah range (start cannot be greater than end).",
                    alert_memorization_saved: "Memorization goal added.",

                    // Reset Progress
                    recipe_reset_button: "Reset all settings",
                    alert_reset_confirm: "All settings and progress data will be deleted. Do you want to continue?",
                    alert_reset_done: "All settings have been successfully reset.",

                }
            },
            de: {
                translation: {
                    // DE - natürliche deutsche Formulierungen
                    home_title: "Seelenbrot",
                    // Home Screen
                    welcome_1: "Willkommen bei Seelenbrot.",
                    home_intro_1: "Im Menü ‚Zutaten einstellen‘ kannst du auswählen, was du zu Seelenbrot hinzufügen möchtest.",
                    home_intro_2: "Im Menü ‚Essenszeit‘ kannst du deine tägliche Zufuhr entsprechend den gewählten Zutaten einnehmen.",
                    nav1: "Zutaten einstellen",
                    nav2: "Essenszeit",
                    nav3: "Info",

                    // Recipe Screen
                    recipe_title: "Seelenbrot — Zutaten einstellen",
                    // Dhikr
                    recipe_dhikr_title: "Dhikr",
                    recipe_dhikr_desc: "Gib den Namen des Dhikr und dein Tagesziel an (z. B. ‚Ya Latif‘, 129-mal).",
                    recipe_dhikr_placeholder1: "Welcher Dhikr? (z. B. Ya Latif)",
                    recipe_dhikr_placeholder2: "Wie oft? (z. B. 129)",
                    recipe_dhikr_button: "+ Hinzufügen",
                    // Quran
                    recipe_quran_title: "Koran",
                    recipe_quran_desc: "Lege dein tägliches Seitenziel fest und gib an, ab welcher Seite du beginnen möchtest (z. B. 2 Seiten/Tag, Start bei Seite 1).",
                    recipe_quran_label1: "Wie viele Seiten pro Tag? (z. B. 2)",
                    recipe_quran_placeholder1: "Wie viele Seiten pro Tag? (z. B. 2)",
                    recipe_quran_label2: "Ab welcher Seite möchtest du beginnen?",
                    recipe_quran_placeholder2: "Ab welcher Seite möchtest du beginnen? (z. B. 1)",
                    recipe_quran_button: "+ Hinzufügen",
                    // Jawshan
                    recipe_jawshan_title: "Cevşen",
                    recipe_jawshan_desc: "Gib an, wie viele Abschnitte (Bab) du pro Tag lesen möchtest (z. B. 15 Bab/Tag). Ein Cevşen ist damit ungefähr in einer Woche gelesen.",
                    recipe_jawshan_placeholder: "Wie viele Bab pro Tag? (z. B. 15)",
                    recipe_jawshan_button: "+ Hinzufügen",
                    // Memorization
                    recipe_memorization_title: "Auswendiglernen",
                    recipe_memorization_desc: "Gib die Nummer der Sure sowie die Start- und End-Ayah-Nummern (inklusive) an (z. B. Sure 13 (Ra'd), 28–28 ist eine Aya).",
                    recipe_memorization_label1: "Welche Sure? (z. B. Ra'd=13, Baqara=2)",
                    recipe_memorization_placeholder1: "Welche Sure? (z. B. Ra'd=13, Baqara=2)",
                    recipe_memorization_label2: "Start-Ayah-Nummer? (z. B. 28)",
                    recipe_memorization_placeholder2: "Start-Ayah-Nummer? (z. B. 28)",
                    recipe_memorization_label3: "End-Ayah-Nummer? (z. B. 28)",
                    recipe_memorization_placeholder3: "End-Ayah-Nummer? (z. B. 28)",
                    recipe_memorization_button: "+ Hinzufügen",
                    // Alerts
                    alert_error: "Fehler",
                    alert_missing: "Fehlend",
                    alert_success: "Erfolgreich",

                    alert_quran_target_empty: "Das Tagesziel darf nicht leer sein.",
                    alert_quran_target_invalid: "Das Tagesziel muss 1 oder größer sein.",
                    alert_quran_start_empty: "Die Startseite darf nicht leer sein.",
                    alert_quran_start_invalid: "Die Startseite muss 1 oder größer sein.",
                    alert_quran_start_nan: "Die Startseite muss eine Zahl sein.",
                    alert_quran_saved: "Koran-Ziel hinzugefügt.",

                    alert_dhikr_empty: "Dhikr-Name und Anzahl dürfen nicht leer sein.",
                    alert_dhikr_invalid: "Die Anzahl muss eine Zahl sein.",
                    alert_dhikr_saved: "Dhikr-Ziel hinzugefügt.",

                    alert_jawshan_empty: "Cevşen-Ziel darf nicht leer sein.",
                    alert_jawshan_invalid: "Das Cevşen-Ziel muss eine Zahl sein.",
                    alert_jawshan_saved: "Cevşen-Ziel hinzugefügt.",

                    alert_memorization_empty: "Das Auswendiglern-Ziel darf nicht leer sein.",
                    alert_memorization_invalid: "Das Auswendiglern-Ziel muss eine Zahl sein.",
                    alert_memorization_range_invalid: "Ungültiger Ayah-Bereich (Start darf nicht größer als Ende sein).",
                    alert_memorization_saved: "Auswendiglern-Ziel hinzugefügt.",

                    // Reset Progress
                    recipe_reset_button: "Alle Einstellungen zurücksetzen",
                    alert_reset_confirm: "Alle Einstellungen und Fortschrittsdaten werden gelöscht. Möchten Sie fortfahren?",
                    alert_reset_done: "Alle Einstellungen wurden erfolgreich zurückgesetzt.",

                }
            }
        },
        interpolation: { escapeValue: false }
    });


export default i18n;

