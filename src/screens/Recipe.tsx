import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, ScrollView, View, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pick, types } from '@react-native-documents/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const PROGRESS_KEY = 'app:progress';

export default function RecipeScreen({ navigation }: any) {
  const { t } = useTranslation();

  const [active, setActive] = useState({ dhikr: false, quran: false, jawshan: false, memorization: false, extras: false });
  const [quranTargetInput, setQuranTargetInput] = useState('');
  const [quranTotalInput, setQuranTotalInput] = useState('');
  const [dhikrNameInput, setDhikrNameInput] = useState('');
  const [dailyDhikrTargetInput, setDailyDhikrTargetInput] = useState('');
  const [jawshanTargetInput, setJawshanTargetInput] = useState('');
  const [memizationSurahInput, setMemorizationSurahInput] = useState('');
  const [memorizationStartTargetInput, setMemorizationTargetInput] = useState('');
  const [memorizationEndTargetInput, setMemorizationEndTargetInput] = useState('');
  const [extraDailyTargetInput, setExtraDailyTargetInput] = useState('');
  const [extraStartPageInput, setExtraStartPageInput] = useState('');
  const [extraPdfUri, setExtraPdfUri] = useState<string>('');
  const getFileName = (uri: string) => {
    try {
      if (!uri) return '';
      const parts = uri.split('/');
      return parts[parts.length - 1];
    } catch {
      return '';
    }
  };
  const checkBoxQuranHandler = async (value: boolean) => {
    setActive(prev => ({ ...prev, quran: value }));
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    progress.quran = progress.quran ?? {};
    progress.quran.active = value;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  };

  const checkBoxDhikrHandler = async (value: boolean) => {
    setActive(prev => ({ ...prev, dhikr: value }));
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    progress.dhikr = progress.dhikr ?? {};
    progress.dhikr.active = value;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  };

  const checkBoxJawshanHandler = async (value: boolean) => {
    setActive(prev => ({ ...prev, jawshan: value }));
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    progress.jawshan = progress.jawshan ?? {};
    progress.jawshan.active = value;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  };

  const checkBoxMemorizationHandler = async (value: boolean) => {
    setActive(prev => ({ ...prev, memorization: value }));
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    progress.memorization = progress.memorization ?? {};
    progress.memorization.active = value;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  };

  const checkBoxExtraHandler = async (value: boolean) => {
    setActive(prev => ({ ...prev, extras: value }));
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    progress.extras = progress.extras ?? {};
    progress.extras.active = value;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  };

  const saveQuranHandler = async () => {
    const daily = Number(quranTargetInput.trim());
    if (!quranTargetInput.trim()) { Alert.alert(t('alert_missing'), t('alert_quran_target_empty')); return; }
    if (Number.isNaN(daily) || daily <= 0) { Alert.alert(t('alert_error'), t('alert_quran_target_invalid')); return; }
    if (!quranTotalInput.trim()) { Alert.alert(t('alert_missing'), t('alert_quran_start_empty')); return; }
    const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw);
    const startPage = Number(quranTotalInput.trim()); if (Number.isNaN(startPage)) { Alert.alert(t('alert_error'), t('alert_quran_start_nan')); return; }
    if (startPage < 1) { Alert.alert(t('alert_error'), t('alert_quran_start_invalid')); return; }
    progress.quran = { ...progress.quran, dailyTarget: Number(quranTargetInput.trim()), total: Math.max(0, startPage - 1), todayCount: 0, active: progress.quran?.active ?? true };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    Alert.alert(t('alert_success'), t('alert_quran_saved'));
  };

  const saveDhikrHandler = async () => {
    if (!dhikrNameInput.trim() || !dailyDhikrTargetInput.trim()) { Alert.alert(t('alert_missing'), t('alert_dhikr_empty')); return; }
    if (Number.isNaN(Number(dailyDhikrTargetInput.trim()))) { Alert.alert(t('alert_error'), t('alert_dhikr_invalid')); return; }
    const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw);
    progress.dhikr = { ...progress.dhikr, dhikrName: dhikrNameInput.trim(), dailyTarget: Number(dailyDhikrTargetInput.trim()), todayCount: 0, active: progress.dhikr?.active ?? true };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    Alert.alert(t('alert_success'), t('alert_dhikr_saved'));
  };

  const saveJawshanHandler = async () => {
    if (!jawshanTargetInput.trim()) { Alert.alert(t('alert_missing'), t('alert_jawshan_empty')); return; }
    if (Number.isNaN(Number(jawshanTargetInput.trim()))) { Alert.alert(t('alert_error'), t('alert_jawshan_invalid')); return; }
    const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw);
    progress.jawshan = { ...progress.jawshan, dailyTarget: Number(jawshanTargetInput.trim()), todayCount: 0, active: progress.jawshan?.active ?? true };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    Alert.alert(t('alert_success'), t('alert_jawshan_saved'));
  };

  const saveMemorizationHandler = async () => {
    if (!memizationSurahInput.trim() || !memorizationStartTargetInput.trim() || !memorizationEndTargetInput.trim()) { Alert.alert(t('alert_missing'), t('alert_memorization_empty')); return; }
    if (Number.isNaN(Number(memizationSurahInput.trim())) || Number.isNaN(Number(memorizationStartTargetInput.trim())) || Number.isNaN(Number(memorizationEndTargetInput.trim()))) { Alert.alert(t('alert_error'), t('alert_memorization_invalid')); return; }
    const start = Number(memorizationStartTargetInput.trim()); const end = Number(memorizationEndTargetInput.trim()); if (start > end) { Alert.alert(t('alert_error'), t('alert_memorization_range_invalid')); return; }
    const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw);
    progress.memorization = { ...progress.memorization, surahNumber: Number(memizationSurahInput.trim()), ayahStart: Number(memorizationStartTargetInput.trim()), ayahEnd: Number(memorizationEndTargetInput.trim()), todayCount: 0, active: progress.memorization?.active ?? true };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    Alert.alert(t('alert_success'), t('alert_memorization_saved'));
  };

  const saveExtraHandler = async () => {
    if (!extraDailyTargetInput.trim()) { Alert.alert(t('alert_missing'), 'Günlük hedef boş olamaz.'); return; }
    const daily = Number(extraDailyTargetInput.trim()); if (Number.isNaN(daily) || daily <= 0) { Alert.alert(t('alert_error'), 'Günlük hedef sayı olmalıdır.'); return; }
    if (!extraStartPageInput.trim()) { Alert.alert(t('alert_missing'), 'Başlangıç sayfası boş olamaz.'); return; }
    const startPage = Number(extraStartPageInput.trim()); if (Number.isNaN(startPage) || startPage < 1) { Alert.alert(t('alert_error'), 'Başlangıç sayfası geçersiz.'); return; }
    const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw);
    // Preserve existing todayCount to avoid losing daily progress when saving
    const existingExtras = progress.extras ?? { todayCount: 0, active: true };
    progress.extras = { ...existingExtras, dailyTarget: daily, total: Math.max(0, startPage - 1), todayCount: existingExtras.todayCount, pdfUri: extraPdfUri ? extraPdfUri : null, startPage: startPage, active: existingExtras.active ?? true };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    console.log('[Recipe:saveExtraHandler] Saved extras with preserved todayCount:', { todayCount: existingExtras.todayCount, dailyTarget: daily, startPage, total: Math.max(0, startPage - 1) });
    Alert.alert(t('alert_success'), t('recipe_extra_saved'));
  };

  const pickExtraPdf = async () => {
    try {
      const [res] = await pick({
        type: [types.pdf],
        copyTo: 'documentDirectory',
      });

      const finalUri =
          (res as any).fileCopyUri ||
          (res as any).uri ||
          '';

      setExtraPdfUri(finalUri);

      try {
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        const progress = raw ? JSON.parse(raw) : createDefaultProgress();
        // Safely preserve all existing extras fields when updating pdfUri
        const existingExtras = progress.extras ?? { dailyTarget: 1, total: 0, todayCount: 0, active: true, startPage: 1, pdfUri: null };
        progress.extras = { 
          ...existingExtras, 
          pdfUri: finalUri,
          // Ensure all critical fields are preserved with proper defaults
          dailyTarget: existingExtras.dailyTarget ?? 1,
          startPage: existingExtras.startPage ?? 1,
          total: existingExtras.total ?? 0,
          todayCount: existingExtras.todayCount ?? 0,
          active: existingExtras.active ?? true,
        };
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        console.log('[Recipe:pickExtraPdf] PDF URI saved, extras preserved:', { pdfUri: finalUri, todayCount: progress.extras.todayCount, dailyTarget: progress.extras.dailyTarget, startPage: progress.extras.startPage });
      } catch (persistErr) {
        console.error('[Recipe:pickExtraPdf] Failed to persist PDF URI:', persistErr);
      }

      Alert.alert(t('alert_success'), t('recipe_extra_pdf_selected'));
    } catch (e: any) {
      if (e?.code === 'OPERATION_CANCELED') {
        return;
      }

      console.error('[Recipe:pickExtraPdf] Document picker error:', e);
      Alert.alert(t('alert_error'), t('recipe_extra_pdf_error'));
    }
  };

  const createDefaultProgress = () => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      lastResetDate: today,
      quran: { active: true, dailyTarget: 2, todayCount: 0, total: 0 },
      jawshan: { active: true, dailyTarget: 15, todayCount: 0, total: 0 },
      salawat: { active: true, dailyTarget: 1, todayCount: 0, doneToday: false },
      dhikr: { active: true, dhikrName: 'Ya Latif', dailyTarget: 129, todayCount: 0 },
      memorization: { active: true, surahNumber: 13, ayahStart: 28, ayahEnd: 28, dailyTarget: 3, todayCount: 0, total: 0 },
      extras: { active: true, dailyTarget: 1, todayCount: 0, total: 0, pdfUri: null, startPage: 1 },
    };
  };

  const handleReset = () => { Alert.alert(t('alert_reset_title'), t('alert_reset_confirm'), [ { text: t('alert_reset_cancel'), style: 'cancel', isPreferred: true }, { text: t('alert_reset_action'), style: 'destructive', onPress: async () => { const defaultProgress = createDefaultProgress(); await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultProgress)); Alert.alert(t('alert_success'), t('alert_reset_done')); } } ]); };

    useEffect(() => { const load = async () => { const raw = await AsyncStorage.getItem(PROGRESS_KEY); if (!raw) return; const progress = JSON.parse(raw); setActive({ dhikr: !!progress.dhikr?.active, quran: !!progress.quran?.active, jawshan: !!progress.jawshan?.active, memorization: !!progress.memorization?.active, extras: !!progress.extras?.active }); if (progress.dhikr?.dhikrName) setDhikrNameInput(progress.dhikr.dhikrName); if (typeof progress.dhikr?.dailyTarget === 'number') setDailyDhikrTargetInput(String(progress.dhikr.dailyTarget)); if (progress.memorization) { if (typeof progress.memorization.surahNumber === 'number') setMemorizationSurahInput(String(progress.memorization.surahNumber)); if (typeof progress.memorization.ayahStart === 'number') setMemorizationTargetInput(String(progress.memorization.ayahStart)); if (typeof progress.memorization.ayahEnd === 'number') setMemorizationEndTargetInput(String(progress.memorization.ayahEnd)); } if (progress.quran) { if (typeof progress.quran.dailyTarget === 'number') setQuranTargetInput(String(progress.quran.dailyTarget)); if (typeof progress.quran.total === 'number') setQuranTotalInput(String(progress.quran.total + 1)); } if (progress.jawshan && typeof progress.jawshan.dailyTarget === 'number') setJawshanTargetInput(String(progress.jawshan.dailyTarget)); if (progress.extras) { if (typeof progress.extras.dailyTarget === 'number') setExtraDailyTargetInput(String(progress.extras.dailyTarget)); if (typeof progress.extras.total === 'number') setExtraStartPageInput(String((progress.extras.total ?? 0) + 1)); if (typeof progress.extras.pdfUri === 'string') setExtraPdfUri(progress.extras.pdfUri); } }; load(); }, []);

          // no-op

  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
        >
          <ScrollView contentContainerStyle={styles.content}>
        {/* Top navigation row (since native header is hidden) */}
        <View style={styles.topNav}>
          <Pressable onPress={() => navigation.navigate('Home')} style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}>
            <Text style={styles.topNavText}>← {t('nav_home')}</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>{t('recipe_title')}</Text>

        {/* Dhikr place */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('recipe_dhikr_title')}</Text>
            <CheckBox value={active.dhikr} onValueChange={checkBoxDhikrHandler} tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)' }} />
          </View>
          {active.dhikr && (
            <View style={styles.cardBody}>
              <Text style={styles.smallText}>{t('recipe_dhikr_desc')}</Text>
              <TextInput value={dhikrNameInput} onChangeText={setDhikrNameInput} placeholder={t('recipe_dhikr_placeholder1')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />
              <TextInput value={dailyDhikrTargetInput} onChangeText={setDailyDhikrTargetInput} keyboardType={'numeric'} placeholder={t('recipe_dhikr_placeholder2')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />
              <Pressable onPress={saveDhikrHandler} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{t('recipe_dhikr_button')}</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Quran place */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('recipe_quran_title')}</Text>
            <CheckBox value={active.quran} onValueChange={checkBoxQuranHandler} tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)' }} />
          </View>
          {active.quran && (
            <View style={styles.cardBody}>
              <Text style={styles.smallText}>{t('recipe_quran_desc')}</Text>
              <Text style={styles.smallText}>{t('recipe_quran_label1')}</Text>
              <TextInput value={quranTargetInput} keyboardType={'numeric'} onChangeText={setQuranTargetInput} placeholder={t('recipe_quran_placeholder1')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />
              <Text style={styles.smallText}>{t('recipe_quran_label2')}</Text>
              <TextInput value={quranTotalInput} keyboardType={'numeric'} onChangeText={setQuranTotalInput} placeholder={t('recipe_quran_placeholder2')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />
              <Pressable onPress={saveQuranHandler} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{t('recipe_quran_button')}</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Jawshan place */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('recipe_jawshan_title')}</Text>
            <CheckBox value={active.jawshan} onValueChange={checkBoxJawshanHandler} tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)' }} />
          </View>
          {active.jawshan && (
            <View style={styles.cardBody}>
              <Text style={styles.smallText}>{t('recipe_jawshan_desc')}</Text>
              <TextInput value={jawshanTargetInput} keyboardType={'numeric'} onChangeText={setJawshanTargetInput} placeholder={t('recipe_jawshan_placeholder')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />
              <Pressable onPress={saveJawshanHandler} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{t('recipe_jawshan_button')}</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Memorization place */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('recipe_memorization_title')}</Text>
            <CheckBox value={active.memorization} onValueChange={checkBoxMemorizationHandler} tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)' }} />
          </View>
          {active.memorization && (
            <View style={styles.cardBody}>
              <Text style={styles.smallText}>{t('recipe_memorization_desc')}</Text>
              <Text style={styles.smallText}>{t('recipe_memorization_label1')}</Text>
              <TextInput
                value={memizationSurahInput}
                keyboardType={"numeric"}
                onChangeText={setMemorizationSurahInput}
                placeholder={t("recipe_memorization_placeholder1")}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                style={styles.input}
              />
              <Text style={styles.smallText}>{t('recipe_memorization_label2')}</Text>
              <TextInput
                value={memorizationStartTargetInput}
                keyboardType={"numeric"}
                onChangeText={setMemorizationTargetInput}
                placeholder={t("recipe_memorization_placeholder2")}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                style={styles.input}
              />
              <Text style={styles.smallText}>{t('recipe_memorization_label3')}</Text>
              <TextInput
                value={memorizationEndTargetInput}
                keyboardType={"numeric"}
                onChangeText={setMemorizationEndTargetInput}
                placeholder={t("recipe_memorization_placeholder3")}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                style={styles.input}
              />
              <Pressable onPress={saveMemorizationHandler} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{t('recipe_memorization_button')}</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Extra reading place */}
        <View style={styles.card}>
            <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('recipe_extra_title')}</Text>
            <CheckBox value={active.extras} onValueChange={checkBoxExtraHandler} tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)' }} />
          </View>
          {active.extras && (
            <View style={styles.cardBody}>
              <Text style={styles.smallText}>{t('recipe_extra_desc')}</Text>

              <Text style={styles.smallText}>{t('recipe_extra_label_pdf')}</Text>
              <Pressable onPress={pickExtraPdf} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed, { marginBottom: 8 }]}>
                <Text style={styles.primaryButtonText}>{extraPdfUri ? t('recipe_extra_button_pdf_replace') : t('recipe_extra_button_pdf')}</Text>
              </Pressable>
              {extraPdfUri ? <Text style={styles.smallText}>{t('recipe_extra_selected_label')}: {getFileName(extraPdfUri)}</Text> : null}

              <Text style={styles.smallText}>{t('recipe_extra_label1')}</Text>
              <TextInput value={extraDailyTargetInput} keyboardType={'numeric'} onChangeText={setExtraDailyTargetInput} placeholder={t('recipe_extra_placeholder1')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />

              <Text style={styles.smallText}>{t('recipe_extra_label2')}</Text>
              <TextInput value={extraStartPageInput} keyboardType={'numeric'} onChangeText={setExtraStartPageInput} placeholder={t('recipe_extra_placeholder2')} placeholderTextColor={'rgba(255,255,255,0.5)'} style={styles.input} />

              <Pressable onPress={saveExtraHandler} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                <Text style={styles.primaryButtonText}>{t('recipe_extra_button_save')}</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Pressable onPress={handleReset} style={({ pressed }) => [styles.resetButton, pressed && styles.resetPressed]}>
          <Text style={styles.resetText}>{t('recipe_reset_button')}</Text>
        </Pressable>
      </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const colors = {
  background: '#041219', // deeper dark navy
  card: '#072f36', // deep teal
  accentBlue: '#00ffff', // unified accent color
  accentGreen: '#1f7a3a', // deep green
  buttonBg: '#072a2e',
  textPrimary: '#e6f7ff',
  textSecondary: '#97c9d6',
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginBottom: 12 },
  topNav: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  topNavText: { color: colors.textPrimary, fontWeight: '700' },
  backButton: { padding: 8, backgroundColor: 'transparent' },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
  cardBody: { },

  input: {
    backgroundColor: '#052026',
    color: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)'
  },

  smallText: { color: colors.textSecondary, fontSize: 12, marginBottom: 4 },

  primaryButton: {
    backgroundColor: colors.buttonBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderLeftWidth: 6,
    borderLeftColor: colors.accentGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPressed: { opacity: 0.95, transform: [{ scale: 0.998 }] },
  primaryButtonText: { color: colors.textPrimary, fontWeight: '700' },

  resetButton: {
    marginTop: 40,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#8B0000',
    alignItems: 'center',
  },

  resetPressed: {
    opacity: 0.7,
  },

  resetText: {
    color: 'white',
    fontWeight: '700',
  }
});
