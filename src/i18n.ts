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
                    nav1: "Malzemeleri Ayarla   ⚙️",
                    nav2: "Yemek Vakti  🥖",
                    nav3: "Bilgi    ℹ",

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
                    recipe_reset_button: "Tüm Tarifeleri Sıfırla",


                    // Extra Reading (PDF)
                    recipe_extra_title: "Ekstra Okuma",
                    recipe_extra_desc: "Cihazınızdan bir PDF seçip hangi sayfadan başlayacağınızı belirleyin. Günlük hedef sayısını girin.",
                    recipe_extra_label_pdf: "PDF seç / değiştir",
                    recipe_extra_button_pdf: "PDF Seç",
                    recipe_extra_button_pdf_replace: "PDF Değiştir",
                    recipe_extra_label1: "Günde kaç sayfa?",
                    recipe_extra_placeholder1: "Günde kaç sayfa? (ör: 2)",
                    recipe_extra_label2: "PDF hangi sayfadan başlıyor? (1 = PDF sayfa 1)",
                    recipe_extra_placeholder2: "Kaçıncı sayfadan başlamak istersiniz? (ör: 1)",
                    recipe_extra_button_save: "Kaydet",
                    recipe_extra_pdf_selected: "PDF seçildi.",
                    recipe_extra_pdf_error: "PDF seçilemedi.",
                    recipe_extra_saved: "Ekstra okuma hedefi kaydedildi.",
                    recipe_extra_selected_label: "Seçilen PDF",
                    today_extra_title: "Ekstra Okuma",
                    nav_home: "Ana Menü",

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

                    alert_reset_title: "Tüm veriler sıfırlansın mı?",
                    alert_reset_confirm: "Bu işlem cihazınızdaki kayıtlı ilerlemeyi ve lokal verileri silecek. Bu işlem geri alınamaz.",
                    alert_reset_cancel: "İptal",
                    alert_reset_action: "Sıfırla",
                    alert_reset_done: "Tüm veriler sıfırlandı.",


                    // Today Screen
                    salavat_label_send: "Peygamberimize selam gönder.",
                    today_dhikr_title: "Zikir",
                    today_quran_title: "Kur'an-ı Kerim",
                    today_jawshan_title: "Cevşen",
                    today_memorization_title: "Ezber",
                    toggle_open: "Aç",
                    toggle_close: "Kapat",

                    // Info Screen
                    // About App
                    app_title: "Uygulama Hakkında",
                    app_desc: "Ruhun Gıdası, günlük ibadet ve manevi hedeflerinizi düzenli takip edebilmeniz için geliştirilmiş bir uygulamadır.\n" +
                        "Uygulama içerisinde:\n" +
                        "- Peygamberimize selam göndermeyi hatırlayabilir\n" +
                        "- Zikir hedefi belirleyebilir\n" +
                        "- Kur'an-ı Kerim için günlük sayfa planı oluşturabilir\n" +
                        "- Cevşen okuma düzeni kurabilir\n" +
                        "- Ezber çalışmaları için sure ve ayet aralığı seçebilirsiniz\n" +
                        "Belirlenen hedefler Yemek Vakti ekranında günlük olarak takip edilir.\n" +
                        "Gün değiştiğinde günlük sayaçlar otomatik olarak kontrol edilir ve gerekli sıfırlamalar yapılır.",
                    // Sources
                    sources_title: "Kaynaklar",
                    sources_desc: "-Kur'an metinleri Açık Kuran (acikkuran.com) projesinden alınmıştır.\n" +
                        "Lisans: CC BY-NC-SA 4.0.\n",
                    sources_quran: "https://github.com/acik-kuran/acikkuran-api",

                    // Feedback
                    feedback_title: "Geri Bildirim",
                    feedback_desc: "Herhangi bir hata, eksik veya öneri için:",
                    feedback_email: "cetinkaya-oguzhan@hotmail.com",
                    feedback_github: "https://github.com/OgYYRe",






                    //Components
                    action_configure: "Malzemeleri Ayarla ->",
                    confirm_title: "Onay",
                    confirm_cancel: "İptal",
                    confirm_yes: "Evet",

                    // DhikrCounter
                    dhikr_inactive: "Zikir kapalı. Zikir'i malzemelere eklemek için",
                    dhikr_done_message: "Allah kabul etsin",
                    //QuranTracker
                    quran_inactive: "Kur'an-ı Kerim kapalı. Malzemelere eklemek için",
                    quran_page: "{{currentPage}}. Sayfa",
                    confirm_mark_page: "{{currentPage}}. sayfayı okudunuz mu?",
                    quran_mark_read: "{{currentPage}}. Sayfayi okudum ✔",
                    quran_daily_done_title: "Günlük hedef tamamlandı",
                    quran_daily_done_desc: "Bugünkü {{target}} sayfa hedefi tamamlandı.",
                    // QuranPDFView
                    pdf_preview_open_page: "{{page}}. sayfayı açmak için tıkla",
                    // JawshanTracker
                    jawshan_confirm_desc: "{{currentBab}}. Bab'ı okudunuz mu?",
                    jawshan_inactive: "Cevşen kapalı. Cevşen'i malzemelere eklemek için ",
                    jawshan_completed_title: "Cevşen tamamlandı",
                    jawshan_completed_total: "Toplam: {{TOTAL_PARTS}}/{{TOTAL_PARTS}}",
                    jawshan_daily_done_title: "Günlük hedef tamamlandı",
                    jawshan_daily_done_desc: "Bugünkü {{target}} bab hedefi tamamlandı.",
                    // MemorizationTracker
                    error_invalid: "Hata: ",
                    error_invalid_message: "Günlük hedef yanlış tanımlanmış ya da geçersiz. Lütfen malzemelerden kontrol edin.",
                    error_invalid_range: "Hata: Ayet aralığı geçersiz (başlangıç bitişten büyük olamaz). Lütfen malzemelerden kontrol edin.",
                    loading_text: "Yükleniyor...",
                    memorization_missing: "Ezber için ayar bulunamadı.",
                    memorization_inactive: "Ezber kapalı. Ezber'i malzemelere eklemek için",
                    memorization_surah:"Sure: {{number}}",
                    memorization_surah_missing: "Sure bulunamadi",
                    memorization_ayah_range: "Ayet aralığı: {{start}}-{{end}}",
                    jawshan_mark_read: "{{currentBab}}. Bab'i okudum ✔",
                    memorization_button_read: "Okudum (+)",
                    memorization_read_done: "Okuma tamamlandı",
                    memorization_read_done_message: "Bugünlük hedef tamamlandı. Yarın görüşmek üzere.",


                    // JawshanView
                    jawshan_bab_missing: "{{number}}. bab bulunamadi",
                    // SalavatSlider
                    salawat_done: "Salavat gönderildi",
                    salawat_prayer_text: "Allahümme salli alâ seyyidinâ Muhammed",


                    // ExtraPDFView
                    extra_inactive: "Ekstra okuma kapalı. Malzemelere eklemek için",
                    extra_page: "{{currentPage}}. Sayfa",
                    extra_confirm_mark_page: "{{currentPage}}. sayfayı okudunuz mu?",
                    extra_mark_read: "{{currentPage}}. sayfayı okudum ✔",
                    extra_daily_done_title: "Günlük hedef tamamlandı",
                    extra_daily_done_desc: "Bugünkü {{target}} sayfa hedefi tamamlandı.",



                }
            },
            en: {
                translation: {
                    // Home Screen
                    home_title: "Food of the Soul",
                    welcome_1: "Welcome to Food of the Soul.",
                    home_intro_1: "In the Configure Ingredients menu, you can choose what you want to add to Food of the Soul.",
                    home_intro_2: "In Food Time, you can take your daily nourishment based on your selected ingredients.",
                    nav1: "Configure Ingredients    ⚙️",
                    nav2: "Food Time   🥖",
                    nav3: "Info   ℹ",

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
                    recipe_reset_button: "Reset All Recipes",


                    // Extra Reading (PDF)
                    recipe_extra_title: "Extra Reading",
                    recipe_extra_desc: "Choose a PDF from your device and set which page corresponds to page 1 of your book. Also set daily target.",
                    recipe_extra_label_pdf: "Select / replace PDF",
                    recipe_extra_button_pdf: "Select PDF",
                    recipe_extra_button_pdf_replace: "Replace PDF",
                    recipe_extra_label1: "How many pages per day?",
                    recipe_extra_placeholder1: "How many pages per day? (e.g. 2)",
                    recipe_extra_label2: "Which PDF page is your book page 1?",
                    recipe_extra_placeholder2: "Which page to start from? (e.g. 1)",
                    recipe_extra_button_save: "Save",
                    recipe_extra_pdf_selected: "PDF selected.",
                    recipe_extra_pdf_error: "Could not select PDF.",
                    recipe_extra_saved: "Extra reading target saved.",

                    recipe_extra_selected_label: "Selected PDF",
                    today_extra_title: "Extra Reading",
                    nav_home: "Home",
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


                    alert_reset_title: "Reset all data?",
                    alert_reset_confirm: "This will delete all saved progress and local data on this device. This action cannot be undone.",
                    alert_reset_cancel: "Cancel",
                    alert_reset_action: "Reset",
                    alert_reset_done: "All data has been reset.",

                    // Today Screen
                    salavat_label_send: "Send greetings to our Prophet.",
                    today_dhikr_title: "Dhikr",
                    today_quran_title: "Qur'an",
                    today_jawshan_title: "Jawshan",
                    today_memorization_title: "Memorization",
                    toggle_open: "Open",
                    toggle_close: "Close",

                    // Info Screen
                    // About App
                    app_title: "About the App",
                    app_desc: "Food of the Soul is an application developed to help you regularly track your daily worship and spiritual goals.\n" +
                        "Within the app you can:\n" +
                        "- Send greetings to our Prophet\n" +
                        "- Set a daily dhikr target\n" +
                        "- Create a daily page plan for the Qur'an\n" +
                        "- Set a Jawshan reading schedule\n" +
                        "- Select a surah and ayah range for memorization\n" +
                        "Your selected goals are tracked daily on the Food Time screen.\n" +
                        "When the day changes, daily counters are automatically checked and reset when necessary.",

                    // Sources
                    sources_title: "Sources",
                    sources_desc: "- Qur'an texts are obtained from the Açık Kuran project (acikkuran.com).\n" +
                        "License: CC BY-NC-SA 4.0.\n",

                    sources_quran: "https://github.com/acik-kuran/acikkuran-api",

                    // Feedback
                    feedback_title: "Feedback",
                    feedback_desc: "If you notice any errors, omissions, or have suggestions:",
                    feedback_email: "cetinkaya-oguzhan@hotmail.com",
                    feedback_github: "https://github.com/OgYYRe",



                    // Components
                    action_configure: "Configure ingredients ->",
                    confirm_title: "Confirm",
                    confirm_cancel: "Cancel",
                    confirm_yes: "Yes",
                    // DhikrCounter
                    dhikr_inactive: "Dhikr is disabled. To add Dhikr to ingredients",
                    dhikr_done_message: "May Allah accept it",
                    // QuranTracker
                    quran_inactive: "Qur'an is disabled. To add it to ingredients ",
                    quran_page: "Page {{currentPage}}",
                    confirm_mark_page: "Did you read page {{currentPage}}?",
                    quran_mark_read: "I read page {{currentPage}} ✔",
                    quran_daily_done_title: "Daily target completed",
                    quran_daily_done_desc: "Today's target of {{target}} pages completed.",
                    // QuranPDFView
                    pdf_preview_open_page: "Tap to open page {{page}}",
                    // JawshanTracker
                    jawshan_confirm_desc: "Did you read Bab {{currentBab}}?",
                    jawshan_inactive: "Jawshan is disabled. To add it to ingredients",
                    jawshan_completed_title: "Jawshan completed",
                    jawshan_completed_total: "Total: {{TOTAL_PARTS}}/{{TOTAL_PARTS}}",
                    jawshan_daily_done_title: "Daily target completed",
                    jawshan_daily_done_desc: "Today's target of {{target}} bab completed.",
                    // MemorizationTracker
                    error_invalid: "Error:",
                    error_invalid_message: "Daily target is invalid or not defined. Please check ingredients.",
                    error_invalid_range: "Error: Invalid ayah range (start cannot be greater than end). Please check ingredients.",
                    loading_text: "Loading...",
                    memorization_missing: "No memorization configuration found.",
                    memorization_inactive: "Memorization is disabled. To add it to ingredients",
                    memorization_surah: "Surah: {{number}}",
                    memorization_surah_missing: "Surah not found",
                    memorization_ayah_range: "Ayah range: {{start}}-{{end}}",
                    memorization_button_read: "I read (+)",
                    memorization_read_done: "Reading completed",
                    memorization_read_done_message: "Today's target completed. See you tomorrow.",
                    // JawshanView
                    jawshan_bab_missing: "Bab {{number}} not found",
                    jawshan_mark_read: "I read Bab {{currentBab}} ✔",
                    // SalavatSlider
                    salawat_done: "Salawat sent",
                    salawat_prayer_text: "O Allah, send blessings upon our master Muhammad",

                    // ExtraPDFView
                    extra_inactive: "Extra reading is disabled. To add it to ingredients",
                    extra_page: "Page {{currentPage}}",
                    extra_confirm_mark_page: "Did you read page {{currentPage}}?",
                    extra_mark_read: "I read page {{currentPage}} ✔",
                    extra_daily_done_title: "Daily target completed",
                    extra_daily_done_desc: "Today's target of {{target}} pages completed.",




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
                    nav1: "Zutaten einstellen   ⚙️",
                    nav2: "Essenszeit    🥖",
                    nav3: "Info   ℹ",

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
                    recipe_jawshan_title: "Cevşen (islamisches Schutzgebet)",
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
                    recipe_reset_button: "Alle Rezepte zurücksetzen",

                    // Extra Reading (PDF)
                    recipe_extra_title: "Extra Lesen",
                    recipe_extra_desc: "Wähle ein PDF von deinem Gerät und lege fest, welche PDF-Seite Seite 1 deines Buches ist. Setze außerdem das Tagesziel.",
                    recipe_extra_label_pdf: "PDF auswählen/ersetzen",
                    recipe_extra_button_pdf: "PDF auswählen",
                    recipe_extra_button_pdf_replace: "PDF ersetzen",
                    recipe_extra_label1: "Wie viele Seiten pro Tag?",
                    recipe_extra_placeholder1: "Wie viele Seiten pro Tag? (z. B. 2)",
                    recipe_extra_label2: "Welche PDF-Seite entspricht Buchseite 1?",
                    recipe_extra_placeholder2: "Ab welcher Seite beginnen? (z. B. 1)",
                    recipe_extra_button_save: "Speichern",
                    recipe_extra_pdf_selected: "PDF ausgewählt.",
                    recipe_extra_pdf_error: "PDF konnte nicht ausgewählt werden.",
                    recipe_extra_saved: "Extra-Leseziel gespeichert.",
                    recipe_extra_selected_label: "Ausgewählte PDF",
                    today_extra_title: "Extra Lesen",
                    nav_home: "Startseite",
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


                    alert_reset_title: "Alle Daten zurücksetzen?",
                    alert_reset_confirm: "Dadurch werden alle gespeicherten Fortschritte und lokalen Daten auf diesem Gerät gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
                    alert_reset_cancel: "Abbrechen",
                    alert_reset_action: "Zurücksetzen",
                    alert_reset_done: "Alle Daten wurden zurückgesetzt.",

                    // Today Screen
                    salavat_label_send: "Sende Segenswünsche an unseren Propheten.",
                    today_dhikr_title: "Dhikr",
                    today_quran_title: "Qur'an",
                    today_jawshan_title: "Jawshan",
                    today_memorization_title: "Auswendiglernen",
                    toggle_open: "Öffnen",
                    toggle_close: "Schließen",

                    // Info Screen
                    // About App
                    app_title: "Über die App",
                    app_desc: "Seelenbrot ist eine Anwendung, die entwickelt wurde, um dir zu helfen, deine täglichen religiösen und spirituellen Ziele regelmäßig zu verfolgen.\n" +
                        "In der App kannst du:\n" +
                        "- Segenswünsche an unseren Propheten senden\n" +
                        "- Ein tägliches Dhikr-Ziel festlegen\n" +
                        "- Einen täglichen Seitenplan für den Qur'an erstellen\n" +
                        "- Einen Leseplan für Jawshan festlegen\n" +
                        "- Eine Sure und einen Ayah-Bereich zum Auswendiglernen auswählen\n" +
                        "Deine festgelegten Ziele werden täglich im Menü Essenszeit verfolgt.\n" +
                        "Wenn der Tag wechselt, werden die Tageszähler automatisch überprüft und bei Bedarf zurückgesetzt.",

                    // Sources
                    sources_title: "Quellen",
                    sources_desc: "- Die Qur'an-Texte stammen aus dem Projekt Açık Kuran (acikkuran.com).\n" +
                        "Lizenz: CC BY-NC-SA 4.0.\n",
                    sources_quran: "https://github.com/acik-kuran/acikkuran-api",

                    // Feedback
                    feedback_title: "Feedback",
                    feedback_desc: "Wenn Sie Fehler, fehlende Inhalte oder Verbesserungsvorschläge bemerken:",
                    feedback_email: "cetinkaya-oguzhan@hotmail.com",
                    feedback_github: "https://github.com/OgYYRe",



                    // Components
                    action_configure: "Zutaten konfigurieren ->",
                    confirm_title: "Bestätigung",
                    confirm_cancel: "Abbrechen",
                    confirm_yes: "Ja",

                    // DhikrCounter
                    dhikr_inactive: "Dhikr ist deaktiviert. Um Dhikr zu den",
                    dhikr_done_message: "Möge Allah es annehmen",
                    // QuranTracker
                    quran_inactive: "Der Qur'an ist deaktiviert. Um ihn zu den ",
                    quran_page: "Seite {{currentPage}}",
                    confirm_mark_page: "Haben Sie Seite {{currentPage}} gelesen?",
                    quran_mark_read: "Ich habe Seite {{currentPage}} gelesen ✔",
                    quran_daily_done_title: "Tagesziel erreicht",
                    quran_daily_done_desc: "Das heutige Ziel von {{target}} Seiten ist erreicht.",
                    // QuranPDFView
                    pdf_preview_open_page: "Tippen, um Seite {{page}} zu öffnen",
                    // JawshanTracker
                    jawshan_confirm_desc: "Haben Sie Bab {{currentBab}} gelesen?",
                    jawshan_inactive: "Jawshan ist deaktiviert. Um es zu den ",
                    jawshan_completed_title: "Jawshan abgeschlossen",
                    jawshan_completed_total: "Gesamt: {{TOTAL_PARTS}}/{{TOTAL_PARTS}}",
                    jawshan_daily_done_title: "Tagesziel erreicht",
                    jawshan_daily_done_desc: "Das heutige Ziel von {{target}} Bab ist erreicht.",
                    // MemorizationTracker
                    error_invalid: "Fehler:",
                    error_invalid_message: "Tagesziel ist ungültig oder nicht definiert. Bitte überprüfen Sie die Zutaten.",
                    error_invalid_range: "Fehler: Ungültiger Ayah-Bereich (Start darf nicht größer als Ende sein). Bitte Zutaten prüfen.",
                    loading_text: "Wird geladen...",
                    memorization_missing: "Keine Konfiguration für das Auswendiglernen gefunden.",
                    memorization_inactive: "Auswendiglernen ist deaktiviert. Um es zu den",
                    memorization_surah: "Surah: {{number}}",
                    memorization_surah_missing: "Sure nicht gefunden",
                    memorization_ayah_range: "Ayah bereich: {{start}}-{{end}}",
                    memorization_button_read: "Gelesen (+)",
                    memorization_read_done: "Lesen abgeschlossen",
                    memorization_read_done_message: "Das Tagesziel ist erreicht. Bis morgen.",
                    // JawshanView
                    jawshan_bab_missing: "Bab {{number}} nicht gefunden",
                    jawshan_mark_read: "Bab {{currentBab}} gelesen ✔",
                    // SalavatSlider
                    salawat_done: "Salawat gesendet",
                    salawat_prayer_text: "O Allah, sende Segen über unseren Meister Muhammad",


                    // ExtraPDFView
                    extra_inactive: "Extra-Lesen ist deaktiviert. Um es zu den ",
                    extra_page: "Seite {{currentPage}}",
                    extra_confirm_mark_page: "Haben Sie Seite {{currentPage}} gelesen?",
                    extra_mark_read: "Ich habe Seite {{currentPage}} gelesen ✔",
                    extra_daily_done_title: "Tagesziel erreicht",
                    extra_daily_done_desc: "Das heutige Ziel von {{target}} Seiten ist erreicht.",



                }
            }
        },
        interpolation: { escapeValue: false }
    });




export default i18n;

