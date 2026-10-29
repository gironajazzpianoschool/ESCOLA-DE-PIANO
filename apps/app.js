/**
 * TONAL EMOTIONS - v18 (Versió Neta i Corregida)
 */

/* ══════════════════════════════════════════════════════════════ */
/* 1. CONFIGURACIÓ                                                */
/* ══════════════════════════════════════════════════════════════ */
const CONFIG = {
  PASS_HASH: "e04dc6405154e1be4887eb34e8aa6237661a15a975e2c13a5e78e056d161099f",
  MAX_ATTEMPTS: 3,
  DESIGN_WIDTH: 1280,
  STORAGE_KEYS: {
    LAYOUT: 'sensacions_notes_layout_v5',
    ZOOM: 'tonal_emotions_zoom',
    MIDI_TAB: 'midi_active_tab'
  },
  IMAGE_PATH: './img/',
  MUSICAL_KEYS: ["C","Db","D","Eb","E","F","F# / Gb","G","Ab","A","Bb","B"],
  CENTERED_NUMBERS: [0,1,2,7,9,10],
  NOTE_IMAGES: {
    0:'1_casa.png', 1:'b2_bestia.png', 2:'2_encongir.png', 3:'b3_tristesa.png',
    4:'3_alegria.png', 5:'4_amen.png', 6:'s4_alerta.png', 7:'5_musculs.png',
    8:'b6_aliens.png', 9:'6_canttenor.png', 10:'b7_ferida.png', 11:'7_imant.png'
  },
  DEFAULT_LAYOUT: {
    0:{name:'1_casa.png',x:51.1,y:54,size:260,z:106},
    1:{name:'b2_bestia.png',x:40.1,y:60.8,size:170,z:107},
    2:{name:'2_encongir.png',x:37.7,y:45.4,size:150,z:10},
    3:{name:'b3_tristesa.png',x:53.9,y:36.8,size:140,z:10},
    4:{name:'3_alegria.png',x:46.9,y:36,size:140,z:105},
    5:{name:'4_amen.png',x:39.9,y:28.1,size:160,z:10},
    6:{name:'s4_alerta.png',x:67.5,y:56.9,size:130,z:115},
    7:{name:'5_musculs.png',x:61.3,y:52.4,size:280,z:114},
    8:{name:'b6_aliens.png',x:66.6,y:40.2,size:120,z:113},
    9:{name:'6_canttenor.png',x:47.9,y:71,size:160,z:108},
    10:{name:'b7_ferida.png',x:62.5,y:30.8,size:130,z:10},
    11:{name:'7_imant.png',x:57.8,y:69.1,size:100,z:116}
  }
};

const PIANO_DEFAULTS = {
  volume: 1.0, fadeIn: 0, attack: 80, decay: 1.73,
  sustain: 0.9, duration: 4.0, brightness: 1.1, instrument: 'piano'
};

const PIANO_VOL_MIN = 0.25;
const pianoTuning = Object.assign({}, PIANO_DEFAULTS);

const INSTRUMENTS = {
  piano: {wave:'triangle', harmonics:[1.0,0.5,0.25,0.125], filter:0},
  soft: {wave:'sine', harmonics:[1.0,0.3,0.1,0.05], filter:0},
  epiano: {wave:'sine', harmonics:[1.0,0.6,0.15,0.2], filter:0},
  organ: {wave:'triangle', harmonics:[1.0,0.5,0.33,0.25], filter:0},
  strings: {wave:'sawtooth', harmonics:[0.6,0.3,0.15,0.08], filter:2500},
  flute: {wave:'sine', harmonics:[1.0,0.15,0.02,0.0], filter:0}
};

const TEST_IMAGE_MS = 1000, TEST_EXPLORE_MS = 2000, BATTLE_HIDE_MS = 500, BATTLE_ADVANCE_MS = 1000, BATTLE_TURN_MS = 1100;

/* ══════════════════════════════════════════════════════════════ */
/* DETECCIÓ DE DISPOSITIU                                         */
/* ══════════════════════════════════════════════════════════════ */
const UA = navigator.userAgent;
const IS_IPAD = /iPad/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IS_ANDROID_TABLET = /Android/.test(UA) && !/Mobile/.test(UA);
const IS_TABLET = IS_IPAD || IS_ANDROID_TABLET;
const IS_SMARTPHONE = /iPhone|iPod/.test(UA) || (/Android/.test(UA) && /Mobile/.test(UA));
const IS_MAC = /Macintosh|MacIntel/.test(navigator.platform) && !IS_IPAD;
const IS_PC = !IS_TABLET && !IS_SMARTPHONE && !IS_MAC;

/* ══════════════════════════════════════════════════════════════ */
/* 2. TRADUCCIONS                                                 */
/* ══════════════════════════════════════════════════════════════ */
const translations = {
  ca:{
    pw_title:"🔐 Accés Restringit", pw_placeholder:"Introdueix la contrasenya", pw_button:"Entrar",
    pw_error:"Contrasenya incorrecta. Intent {X}/{Y}", pw_denied:"Accés denegat: massa intents fallits",
    start_midi:"🎹 LABORATORI AUDITIU", start_ear:"🎧 ENTRENAMENT AUDITIU",
    waiting_midi:"Esperant connexió MIDI...", midi_connected:"MIDI connectat!", midi_port:"MIDI: ",
    piano:"Piano", sustain:"Sustain", delay_label:"Retard: ", delay:"Retard", normal:"Normal",
    lead:"Lead", bass:"Baix", multi:"Combinat", adjust_zoom:"Ajustar", edit:"Edita",
    back:"← Enrere", fullscreen:"Pantalla Completa", exit_fullscreen:"Surt de Pantalla",
    edit_mode:"Mode Edició", save:"Desa", reset:"Reinicia", cancel:"Cancel·la", saved_ok:"Desat correctament!",
    proposed_answer:"🎯 Resposta Proposada", accuracy:"🎯 Precisió", test_complete:"🎯 Prova Completada!", ok:"D'ACORD",
    key:"Tonalitat", duration:"Durada", pedal_vol:"Vol. Pedal", notes:"Notes", diatonic:"Diatòniques",
    non_diatonic:"No-Diat", all_notes:"Totes", test_mode:"TEST", practice_mode:"PRÀCTICA",
    listen_mode:"ESCOLTA", battle_mode:"BATALLA", start:"INICIA", stop:"ATURA",
    listen_tonic:"Escolta la tònica...", listen_cadence:"Escolta la cadència completa de la tonalitat",
    multi_tab_warning:"⚠️ MIDI ja actiu en una altra pestanya", reset_confirm:"Tornar a la disposició original?",
    piano_on:"🎹 Piano Intern: ACTIVAT", piano_off:"🔇 Piano Intern: DESACTIVAT",
    ear_info:"Rang: C2 - C7<br>Seqüència aleatòria", let_s_go:"Som-hi!", word_notes:"notes",
    mode_prefix:"Mode: ", word_major:"Major", min:"min", sec:"s", manual:"Manual",
    manual_control:"Control Manual", easy:"Fàcil", hard:"Difícil", instrument:"Instrument",
    inst_piano:"Piano", inst_soft:"Piano Suau", inst_epiano:"E-Piano", inst_organ:"Orgue",
    inst_strings:"Corda", inst_flute:"Flauta", test_sound:"▶ Prova", sc_title:"🎹 CONTROLS DE SO",
    sc_volume:"Volum", sc_fadein:"Fade In", sc_attack:"Atac", sc_decay:"Decaiment",
    sc_sustain:"Cos", sc_duration:"Durada", sc_bright:"Brillantor",
    info_title:"ℹ️ Què és TONAL EMOTIONS?",
        info_text:"TONAL EMOTIONS és l'eina del bloc auditiu del nivell fonamental de l'escola online Girona Jazz Piano School®. El seu objectiu és entrenar l'oïda associant cada grau de l'escala a una emoció o sensació.<br><br>🎹 LABORATORI AUDITIU: visualitza les imatges de les notes que toques (modes Normal, Principal, Baix, Combinat, Retard, Ajustar i Editar).<br>🎧 ENTRENAMENT AUDITIU: quatre modes: ESCOLTA (escolta i veu la resposta), PRÀCTICA (prova amb feedback), TEST (avaluació amb percentatge) i BATALLA (2 jugadors per torns).<br><br>Tria tonalitat, tipus de notes i dificultat: FÀCIL (amb la cadència I-IV-V-I de referència) o DIFÍCIL (només amb la tònica de fons).<br><br>🤖 Aquesta aplicació l'ha desenvolupat el propi professor amb l'ajuda de Qwen3.7-Plus i Qwen3.8-MAX, després de més de 100 hores de dedicació entre disseny, programació i proves amb alumnes reals.",
    hardcore_title:"MODE HARDCORE", hardcore_text:"Sense la referència de la cadència, reconèixer notes ja comença a ser exigent.",
    result_excel:"🎉 Felicitats! Tens una oïda molt ben entrenada!",
    result_diat:"Has encertat el {X}% de les notes.", result_non_diat:"Has encertat el {X}% de les notes.",
    result_good:"Has encertat el {X}% de les notes. Bona feina!",
    result_keep:"Has encertat el {X}% de les notes. Segueix practicant.",
    result_crack:"🏆 Ets un CRACK! Has encertat TOTES les notes!",
    result_short:"💡 Consell: Prova de fer sessions més curtes.",
    result_filtered:"Has encertat el {X}% amb una selecció reduïda.",
    pause_title:"⏸️ Pausa", pause_message:"Prova en pausa. Què vols fer?", resume:"▶ Continuar", abort:"⏹ Abortar",
    pause_cheat:"⚠️ Massa pauses!", help_title:"📖 Instruccions",
    help_midi:(IS_TABLET ? "<h3>🎹 Laboratori (Tablet)</h3><ul><li><b>Mode Normal:</b> mostra la imatge de l'última nota tocada.</li><li><b>🎛️ Teclat manual:</b> sempre visible.</li><li><b>⚠️ MIDI:</b> no disponible en tablets.</li></ul>" : "<h3>🎹 Laboratori Auditiu</h3><ul><li><b>Normal:</b> mostra la imatge de l'última nota.</li><li><b>Lead:</b> nota més aguda.</li><li><b>Baix:</b> nota més greu.</li><li><b>Combinat:</b> cada nota.</li><li><b>Retard:</b> imatge al cap d'uns segons.</li></ul>"),
    help_ear:(IS_TABLET ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Teclat manual:</b> sempre visible.</li><li><b>⚠️ MIDI:</b> no disponible.</li></ul>" : "<h3>🎧 Ear Training</h3><ul><li><b>Escolta:</b> escolta i veus la resposta.</li><li><b>Pràctica:</b> prova amb feedback.</li><li><b>Test:</b> avaluació amb percentatge.</li><li><b>Batalla:</b> 2 jugadors per torns.</li></ul>"),
    sustain_hint:"🎹 Prova el pedal sustain", caps_on:"⇪ Majúscules activades",
    filter_info_some:"Notes configurades: ", filter_info_all_diat:"Configurades totes les notes diatòniques",
    filter_info_all_nondiat:"Configurades totes les notes no diatòniques", filter_info_all:"Configurades totes les notes",
    filter_btn_test:"CONFIGURAR TEST", filter_btn_listen:"CONFIGURAR NOTES",
    filter_btn_practice:"CONFIGURAR PROVA", filter_btn_battle:"CONFIGURAR BATALLA",
    filter_title:"Notes actives", filter_hint:"Mínim 2 notes actives.",
    tonic_btn:"🎵 TÒNICA", tonic_tip:"Activa la nota pedal de la tònica.",
    emo_title:"Sensació tonal", emo_0:"Repòs absolut.", emo_1:"Amenaça.", emo_2:"Dubte.", emo_3:"Melancolia.",
    emo_4:"Dolçor pura.", emo_5:"Amén.", emo_6:"Alerta.", emo_7:"Força i múscul.", emo_8:"Misteri.",
    emo_9:"Cant al cel.", emo_10:"Ferida emocional.", emo_11:"Imant.",
    battle_title:"⚔️ MODE BATALLA", battle_description:"Introduïu els noms dels dos jugadors.",
    player:"Jugador", start_battle_btn:"⚔️ COMENÇAR", battle_enter_hint:"⏎ Prem INTRO",
    battle_complete:"⚔️ FINALITZADA!", battle_winner:"🏆 {X} guanya!", battle_tie:"🤝 Empat!",
    battle_your_turn:"Torn de {X}", sudden_death_title:"MORT SÚBITA",
    sudden_death_text:"Empat! Qui falli quan l'altre encerti, perd.", sd_accept:"⚔️ ACCEPTAR", sd_decline:"🏳️ VEURE RESULTAT",
    v10_flash_nice:"MOLT BÉ!", v10_flash_miss:"FALLADA!", v10_timeout:"TEMPS!", v10_correct:"encerts", v10_avg:"s/resposta", exit_app:"❌ SORTIR"
  },
  es:{
    pw_title:"🔐 Acceso Restringido", pw_placeholder:"Introduce la contraseña", pw_button:"Entrar",
    pw_error:"Contraseña incorrecta. Intento {X}/{Y}", pw_denied:"Acceso denegado",
    start_midi:"🎹 LABORATORIO AUDITIVO", start_ear:"🎧 ENTRENAMIENTO AUDITIVO",
    waiting_midi:"Esperando MIDI...", midi_connected:"¡MIDI conectado!", midi_port:"MIDI: ",
    piano:"Piano", sustain:"Sustain", delay_label:"Retardo: ", delay:"Retardo", normal:"Normal",
    lead:"Lead", bass:"Bajo", multi:"Combinado", adjust_zoom:"Ajustar", edit:"Editar",
    back:"← Volver", fullscreen:"Pantalla Completa", exit_fullscreen:"Salir",
    edit_mode:"Modo Edición", save:"Guardar", reset:"Reiniciar", cancel:"Cancelar", saved_ok:"¡Guardado!",
    proposed_answer:"🎯 Respuesta", accuracy:"🎯 Precisión", test_complete:"🎯 ¡Completada!", ok:"OK",
    key:"Tonalidad", duration:"Duración", pedal_vol:"Vol. Pedal", notes:"Notas", diatonic:"Diatónicas",
    non_diatonic:"No-Diat", all_notes:"Todas", test_mode:"TEST", practice_mode:"PRÁCTICA",
    listen_mode:"ESCUCHAR", battle_mode:"BATALLA", start:"INICIAR", stop:"DETENER",
    listen_tonic:"Escucha la tónica...", listen_cadence:"Escucha la cadencia",
    multi_tab_warning:"⚠️ MIDI activo en otra pestaña", reset_confirm:"¿Volver a disposición original?",
    piano_on:"🎹 Piano Interno: ON", piano_off:"🔇 Piano Interno: OFF",
    ear_info:"Rango: C2 - C7<br>Secuencia aleatoria", let_s_go:"¡Vamos!", word_notes:"notas",
    mode_prefix:"Modo: ", word_major:"Mayor", min:"min", sec:"s", manual:"Manual",
    manual_control:"Control Manual", easy:"Fácil", hard:"Difícil", instrument:"Instrumento",
    inst_piano:"Piano", inst_soft:"Piano Suave", inst_epiano:"E-Piano", inst_organ:"Órgano",
    inst_strings:"Cuerda", inst_flute:"Flauta", test_sound:"▶ Prueba", sc_title:"🎹 CONTROLES",
    sc_volume:"Volumen", sc_fadein:"Fade In", sc_attack:"Ataque", sc_decay:"Decadencia",
    sc_sustain:"Cuerpo", sc_duration:"Duración", sc_bright:"Brillo",
    info_title:"ℹ️ ¿Qué es?",     info_text:"Herramienta del bloque auditivo del nivel fundamental de Girona Jazz Piano School®. Su objetivo es entrenar el oído asociando cada grado de la escala a una emoción o sensación.<br><br>🎹 LABORATORIO AUDITIVO: visualiza las imágenes de las notas que tocas (modos Normal, Principal, Bajo, Combinado, Retardo, Ajustar y Editar).<br> ENTRENAMIENTO AUDITIVO: cuatro modos: ESCUCHAR (escuchas y ves la respuesta), PRÁCTICA (prueba con feedback), TEST (evaluación con porcentaje) y BATALLA (2 jugadores por turnos).<br><br>Elige tonalidad, tipo de notas y dificultad: FÁCIL (con cadencia I-IV-V-I de referencia) o DIFÍCIL (solo con la tónica de fondo).<br><br>🤖 Esta aplicación la ha desarrollado el propio profesor con la ayuda de Qwen3.7-Plus y Qwen3.8-MAX, tras más de 100 horas de dedicación entre diseño, programación y pruebas con alumnos reales.",
    hardcore_title:"MODO HARDCORE", hardcore_text:"Sin referencia de cadencia, reconocer notas es exigente.",
    result_excel:"🎉 ¡Felicidades!", result_diat:"Has acertado el {X}%.", result_non_diat:"Has acertado el {X}%.",
    result_good:"Has acertado el {X}%. ¡Buen trabajo!", result_keep:"Has acertado el {X}%. Sigue practicando.",
    result_crack:"🏆 ¡Eres un CRACK!", result_short:"💡 Consejo: sesiones más cortas.",
    result_filtered:"Has acertado el {X}% con selección reducida.",
    pause_title:"⏸️ Pausa", pause_message:"Prueba en pausa.", resume:"▶ Continuar", abort:"⏹ Abortar",
    pause_cheat:"⚠️ ¡Demasiadas pausas!", help_title:"📖 Instrucciones",
    help_midi:(IS_TABLET ? "<h3>🎹 Laboratorio (Tablet)</h3><ul><li><b>Modo Normal:</b> muestra la imagen de la última nota.</li><li><b>⚠️ MIDI:</b> no disponible.</li></ul>" : "<h3>🎹 Laboratorio Auditivo</h3><ul><li><b>Normal:</b> última nota.</li><li><b>Lead:</b> nota más aguda.</li><li><b>Bajo:</b> nota más grave.</li><li><b>Combinado:</b> cada nota.</li><li><b>Retardo:</b> imagen tras segundos.</li></ul>"),
    help_ear:(IS_TABLET ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Teclado manual:</b> visible.</li><li><b>⚠️ MIDI:</b> no disponible.</li></ul>" : "<h3>🎧 Modos de entrenamiento</h3><ul><li><b>Escuchar:</b> escuchas y ves la respuesta.</li><li><b>Práctica:</b> prueba con feedback.</li><li><b>Test:</b> evaluación con porcentaje.</li><li><b>Batalla:</b> 2 jugadores por turnos.</li></ul>"),
    sustain_hint:"🎹 Prueba el pedal sustain", caps_on:"⇪ Mayúsculas activadas",
    filter_info_some:"Notas configuradas: ", filter_info_all_diat:"Configuradas todas las diatónicas",
    filter_info_all_nondiat:"Configuradas todas las no diatónicas", filter_info_all:"Configuradas todas",
    filter_btn_test:"CONFIGURAR TEST", filter_btn_listen:"CONFIGURAR NOTAS",
    filter_btn_practice:"CONFIGURAR PRUEBA", filter_btn_battle:"CONFIGURAR BATALLA",
    filter_title:"Notas activas", filter_hint:"Mínimo 2 notas activas.",
    tonic_btn:"🎵 TÓNICA", tonic_tip:"Activa la nota pedal de la tónica.",
    emo_title:"Sensación tonal", emo_0:"Reposo absoluto.", emo_1:"Amenaza.", emo_2:"Duda.", emo_3:"Melancolía.",
    emo_4:"Dulzura pura.", emo_5:"Amén.", emo_6:"Alerta.", emo_7:"Fuerza y músculo.", emo_8:"Misterio.",
    emo_9:"Canto al cielo.", emo_10:"Herida emocional.", emo_11:"Imán.",
    battle_title:"⚔️ MODO BATALLA", battle_description:"Introducid los nombres.",
    player:"Jugador", start_battle_btn:"⚔️ COMENZAR", battle_enter_hint:"⏎ Pulsa INTRO",
    battle_complete:"⚔️ ¡FINALIZADA!", battle_winner:"🏆 ¡{X} gana!", battle_tie:"🤝 ¡Empate!",
    battle_your_turn:"Turno de {X}", sudden_death_title:"MUERTE SÚBITA",
    sudden_death_text:"¡Empate! Quien falle cuando el otro acierte, pierde.", sd_accept:"⚔️ ACEPTAR", sd_decline:"🏳️ VER RESULTADO",
    v10_flash_nice:"¡BIEN!", v10_flash_miss:"¡FALLO!", v10_timeout:"¡TIEMPO!", v10_correct:"aciertos", v10_avg:"s/respuesta", exit_app:"❌ SALIR"
  },
  en:{
    pw_title:"🔐 Restricted Access", pw_placeholder:"Enter password", pw_button:"Enter",
    pw_error:"Wrong password. Attempt {X}/{Y}", pw_denied:"Access denied",
    start_midi:"🎹 AUDITORY LAB", start_ear:"🎧 EAR TRAINING",
    waiting_midi:"Waiting for MIDI...", midi_connected:"MIDI connected!", midi_port:"MIDI: ",
    piano:"Piano", sustain:"Sustain", delay_label:"Delay: ", delay:"Delay", normal:"Normal",
    lead:"Lead", bass:"Bass", multi:"Multi", adjust_zoom:"Adjust", edit:"Edit",
    back:"← Back", fullscreen:"Fullscreen", exit_fullscreen:"Exit",
    edit_mode:"Edit Mode", save:"Save", reset:"Reset", cancel:"Cancel", saved_ok:"Saved!",
    proposed_answer:"🎯 Proposed", accuracy:"🎯 Accuracy", test_complete:"🎯 Complete!", ok:"OK",
    key:"Key", duration:"Duration", pedal_vol:"Pedal Vol", notes:"Notes", diatonic:"Diatonic",
    non_diatonic:"Non-Diat", all_notes:"All", test_mode:"TEST", practice_mode:"PRACTICE",
    listen_mode:"LISTEN", battle_mode:"BATTLE", start:"START", stop:"STOP",
    listen_tonic:"Listen to tonic...", listen_cadence:"Listen to cadence",
    multi_tab_warning:"⚠️ MIDI active in another tab", reset_confirm:"Return to original?",
    piano_on:"🎹 Internal Piano: ON", piano_off:"🔇 Internal Piano: OFF",
    ear_info:"Range: C2 - C7<br>Random", let_s_go:"Let's go!", word_notes:"notes",
    mode_prefix:"Mode: ", word_major:"Major", min:"min", sec:"s", manual:"Manual",
    manual_control:"Manual Control", easy:"Easy", hard:"Hard", instrument:"Instrument",
    inst_piano:"Piano", inst_soft:"Soft Piano", inst_epiano:"E-Piano", inst_organ:"Organ",
    inst_strings:"Strings", inst_flute:"Flute", test_sound:"▶ Test", sc_title:"🎹 SOUND",
    sc_volume:"Volume", sc_fadein:"Fade In", sc_attack:"Attack", sc_decay:"Decay",
    sc_sustain:"Body", sc_duration:"Duration", sc_bright:"Brightness",
    info_title:"ℹ️ What is it?",     info_text:"TONAL EMOTIONS is the ear-training tool for the fundamental level of the online school Girona Jazz Piano School®. Its goal is to train the ear by associating each scale degree with an emotion or sensation.<br><br>🎹 AUDITORY LAB: visualizes the images of the notes you play (Normal, Lead, Bass, Multi, Delay, Adjust and Edit modes).<br>🎧 EAR TRAINING: four modes: LISTEN (hear and see the answer), PRACTICE (try with feedback), TEST (graded with percentage) and BATTLE (2 players in turns).<br><br>Choose key, note type and difficulty: EASY (with the reference I-IV-V-I cadence) or HARD (only with the tonic pedal).<br><br>🤖 This application was developed by the teacher himself with the help of Qwen3.7-Plus and Qwen3.8-MAX, after more than 100 hours of dedication between design, programming and testing with real students.",
    hardcore_title:"HARDCORE MODE", hardcore_text:"Without cadence reference, recognizing notes is demanding.",
    result_excel:"🎉 Congratulations!", result_diat:"You answered {X}% correctly.", result_non_diat:"You answered {X}% correctly.",
    result_good:"You answered {X}% correctly. Great job!", result_keep:"You answered {X}% correctly. Keep practicing.",
    result_crack:"🏆 You're a CRACK!", result_short:"💡 Tip: shorter sessions.",
    result_filtered:"You scored {X}% with reduced selection.",
    pause_title:"⏸️ Paused", pause_message:"Test paused.", resume:"▶ Resume", abort:"⏹ Abort",
    pause_cheat:"⚠️ Too many pauses!", help_title:"📖 Instructions",
    help_midi:(IS_TABLET ? "<h3>🎹 Lab (Tablet)</h3><ul><li><b>Normal Mode:</b> shows the last note image.</li><li><b>⚠️ MIDI:</b> not available.</li></ul>" : "<h3>🎹 Auditory Lab</h3><ul><li><b>Normal:</b> last note image.</li><li><b>Lead:</b> highest note.</li><li><b>Bass:</b> lowest note.</li><li><b>Multi:</b> every note.</li><li><b>Delay:</b> image after seconds.</li></ul>"),
    help_ear:(IS_TABLET ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Manual keyboard:</b> visible.</li><li><b>⚠️ MIDI:</b> not available.</li></ul>" : "<h3>🎧 Training modes</h3><ul><li><b>Listen:</b> hear and see answer.</li><li><b>Practice:</b> try with feedback.</li><li><b>Test:</b> graded with percentage.</li><li><b>Battle:</b> 2 players in turns.</li></ul>"),
    sustain_hint:"🎹 Try sustain pedal", caps_on:"⇪ Caps Lock is on",
    filter_info_some:"Configured notes: ", filter_info_all_diat:"All diatonic configured",
    filter_info_all_nondiat:"All non-diatonic configured", filter_info_all:"All notes configured",
    filter_btn_test:"CONFIGURE TEST", filter_btn_listen:"CONFIGURE NOTES",
    filter_btn_practice:"CONFIGURE PRACTICE", filter_btn_battle:"CONFIGURE BATTLE",
    filter_title:"Active notes", filter_hint:"At least 2 active notes.",
    tonic_btn:"🎵 TONIC", tonic_tip:"Turn on tonic pedal note.",
    emo_title:"Tonal feeling", emo_0:"Absolute rest.", emo_1:"Threat.", emo_2:"Doubt.", emo_3:"Melancholy.",
    emo_4:"Pure sweetness.", emo_5:"Amen.", emo_6:"Alert.", emo_7:"Strength.", emo_8:"Mystery.",
    emo_9:"Song to sky.", emo_10:"Emotional wound.", emo_11:"Magnet.",
    battle_title:"⚔️ BATTLE MODE", battle_description:"Enter names of both players.",
    player:"Player", start_battle_btn:"⚔️ START", battle_enter_hint:"⏎ Press ENTER",
    battle_complete:"⚔️ COMPLETE!", battle_winner:"🏆 {X} wins!", battle_tie:"🤝 Tie!",
    battle_your_turn:"{X}'s turn", sudden_death_title:"SUDDEN DEATH",
    sudden_death_text:"Tie! Whoever misses while other hits, loses.", sd_accept:"⚔️ ACCEPT", sd_decline:"🏳️ SEE RESULT",
    v10_flash_nice:"NICE!", v10_flash_miss:"MISS!", v10_timeout:"TIME!", v10_correct:"correct", v10_avg:"s/answer", exit_app:"❌ EXIT"
  }
};

/* ══════════════════════════════════════════════════════════════ */
/* 3. ESTAT GLOBAL I DOM                                          */
/* ══════════════════════════════════════════════════════════════ */
let currentLang = 'ca', passwordAttempts = 0, sharedCtx = null, pianoBus = null, noteData = {};
let isMidiActive = false, showTimeout = null, activeNotes = new Set(), heldByPedal = new Set(), editMode = false;
let dragElement = null, dragOffset = {x:0, y:0}, maxZIndex = 100;
let exclusiveMode = 'multi', sustainPedalActive = false, currentKeyRoot = 0, internalPianoEnabled = true;
let activeOscillators = {}, pedalVolume = 0.0375;
let earTrainingActive = false, earTimer = null, earTimeRemaining = 0, earSequence = [], earCurrentIndex = 0;
let earModeType = 'listen', earNoteMode = 'diatonic', warmupInterval = null, earCurrentTargetPitchClass = null;
let earUserAlreadyAnswered = false, earCorrectNotes = 0, earTotalNotes = 0, earUserHasPlayed = false, hasAdvanced = false;
let listenDisplayTimeout = null, feedbackHideTimeout = null, advanceTimeout = null, earImageTimeout = null;
let showCorrectTimeout = null, delayCountdownInterval = null, manualPanelVisible = false, currentZoom = 100;
let isPaused = false, pauseCount = 0, consecutivePauses = 0, totalPauses = 0, delayStartTime = null;
let delayCheckInterval = null, delayPendingNote = null, pausedByUser = false, earDifficulty = 'easy';
let cadenceTimeouts = [], inAnswerPhase = false, hardcoreTimeout = null;
let lastNoteOnTime = {}, physicalHeld = new Set(), wrappers = {}, editData = null, pressedStack = [];
let normalSustainHold = null, testSustainTimeout = null, testExploringNoImage = false;
let battleMode = false, battlePlayer1Name = '', battlePlayer2Name = '', battleCurrentPlayer = 1;
let bp1 = {correct:0, total:0, times:[]}, bp2 = {correct:0, total:0, times:[]};
let turnIndicatorTimeout = null, battleLastQ = 0, battleResultTimeout = null;
let sdActive = false, sdCount = 0, sdWinner = null, sdPairMiss = [false, false], sdPairAns = 0, sdTotalPairs = 0;
let lastStopWasFade = false, naturalEnd = false, v10LastNoteAt = 0, wasInAnswer = false, v10LastHumanNote = 0, soloTimes = [];
let v10PendingFlash = null, v10PendingTurn = null, thumbTO = null, battleResultImg = null, flashTO = null;
let activePedalNotes = new Map(), midiAccessPromise = null;
let earFilterDiat = new Set([0,11,2,7,4,5,9]), earFilterNonDiat = new Set([1,3,6,8,10]), earFilterAll = new Set([0,1,2,3,4,5,6,7,8,9,10,11]);
let earFilterPanelVisible = false, filterBtn = null, filterPanel = null, filterTitleEl = null, filterRowEl = null, filterHintEl = null, filterInfoEl = null;
let activeManualNotes = new Set(), numHeld = {}, pendingAcc = 0, pendingAccTO = null;
let emotionTextEl = null, tonicBtnEl = null, tonicTipEl = null, tonicVolEl = null;
let tonicPedalOscs = [], tonicPedalGains = [], tonicPedalMasterGain = null, tonicPedalFilter = null;
let provaTimers = [], provaSustain = true, provaPlaying = false, provaBtnActive = null;

const $ = id => document.getElementById(id);
const startScreen = $('start-screen'), midiMode = $('midi-mode'), earMode = $('ear-mode'), multiTabWarning = $('multi-tab-warning');
const delayCountdownEl = $('delay-countdown'), imgElement = $('current-image'), proposedAnswerImage = $('proposed-answer-image');
const proposedAnswerBox = $('proposed-answer-box'), feedbackCorrect = $('feedback-correct'), feedbackWrong = $('feedback-wrong');
const statusElement = $('status'), modeDisplay = $('mode-display'), keySelect = $('key-select'), editControls = $('edit-controls');
const toast = $('toast'), pianoToast = $('piano-toast'), sustainLed = $('sustain-led'), earSustainLed = $('ear-sustain-led');
const delayConfig = $('delay-config'), accuracyPanel = $('accuracy-panel'), accuracyValue = $('accuracy-value'), accuracyDetails = $('accuracy-details');
const resultModal = $('result-modal'), resultPercentage = $('result-percentage'), resultDetails = $('result-details'), resultMessage = $('result-message');
const manualPanel = $('manual-panel'), pauseModal = $('pause-modal'), thinkingEmoji = $('thinking-emoji'), warmupText = $('warmup-text');
const infoModal = $('info-modal'), hardcoreWarning = $('hardcore-warning'), earPanel = $('ear-panel-full');
const battleModal = $('battle-modal'), battleScoreboard = $('battle-scoreboard'), battleTurnIndicator = $('battle-turn-indicator'), battleResultModal = $('battle-result-modal');
const p1Box = $('p1-box'), p1AnswerImage = $('p1-answer-image'), p1AccuracyValue = $('p1-accuracy-value'), p1AccuracyDetails = $('p1-accuracy-details');
const p2Box = $('p2-box'), p2AnswerImage = $('p2-answer-image'), p2AccuracyValue = $('p2-accuracy-value'), p2AccuracyDetails = $('p2-accuracy-details');

const flash = document.createElement('div');
flash.style.cssText = 'position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);font-size:64px;font-weight:900;z-index:9500;opacity:0;pointer-events:none;transition:opacity .3s;text-shadow:0 0 20px currentColor;';
document.body.appendChild(flash);

const thumb = document.createElement('div');
thumb.style.cssText = 'position:fixed;font-size:34px;z-index:10003;opacity:0;pointer-events:none;transition:opacity .3s;';
document.body.appendChild(thumb);

function setFlashVisible(v) { flash.style.opacity = v ? '1' : '0'; }
function setThumbVisible(v) { thumb.style.opacity = v ? '1' : '0'; }

/* ══════════════════════════════════════════════════════════════ */
/* 4. UTILITATS                                                   */
/* ══════════════════════════════════════════════════════════════ */
function t(k) { return translations[currentLang][k] || k; }
function getTransposedIndex(pc) { return (pc - currentKeyRoot + 12) % 12; }
function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function getDegreeNumber(pc) { return ['1','b2','2','b3','3','4','#4','5','b6','6','b7','7'][pc]; }
function formatTime(s) { return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`; }
function shuffleArray(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
function logEv(msg) { console.log('[TONAL]', msg); }
function logSoloTime() {
  if (v10LastNoteAt) soloTimes.push(performance.now() - v10LastNoteAt);
  v10LastNoteAt = performance.now();
  v10LastHumanNote = performance.now();
}

function updateLanguageUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (translations[currentLang][k]) {
      if (el.tagName === 'INPUT') el.placeholder = translations[currentLang][k];
      else if (['SPAN','DIV','H2','H3','H4','BUTTON','P','OPTION'].includes(el.tagName)) el.innerHTML = translations[currentLang][k];
    }
  });
  const scMap = {'sc-title':'sc_title','sc-lbl-vol':'sc_volume','sc-lbl-fade':'sc_fadein','sc-lbl-atk':'sc_attack','sc-lbl-dec':'sc_decay','sc-lbl-sus':'sc_sustain','sc-lbl-dur':'sc_duration','sc-lbl-bri':'sc_bright'};
  Object.keys(scMap).forEach(id => { const el = $(id); if (el) el.textContent = t(scMap[id]); });
  const scTest = $('sc-test');
  if (scTest && !scTest.classList.contains('stop')) scTest.textContent = t('test_sound');
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
  const mk = $('key-select'), ek = $('ear-key-select');
  const mv = mk.value || currentKeyRoot, ev = ek.value || currentKeyRoot;
  let html = '';
  CONFIG.MUSICAL_KEYS.forEach((n, i) => { html += `<option value="${i}">${n} ${t('word_major')}</option>`; });
  mk.innerHTML = html; ek.innerHTML = html; mk.value = mv; ek.value = ev;
  if (battleModal) {
    battleModal.querySelector('h2').textContent = t('battle_title');
    battleModal.querySelector('.battle-box > p').textContent = t('battle_description');
    $('btn-battle-start').textContent = t('start_battle_btn');
    const hint = battleModal.querySelector('.battle-hint');
    if (hint) hint.textContent = t('battle_enter_hint');
  }
  updateModeDisplay(); updateAccuracyDisplay(); updateDifficultyButtons();
}

function updateModeDisplay() {
  modeDisplay.textContent = t('mode_prefix') + exclusiveMode.toUpperCase();
  delayConfig.classList.toggle('visible', exclusiveMode === 'delay');
}

function updateAccuracyDisplay() {
  if (battleMode) { updateBattleAccuracy(); return; }
  const p = earTotalNotes > 0 ? Math.round(earCorrectNotes / earTotalNotes * 100) : 0;
  accuracyValue.textContent = `${p}%`;
  accuracyDetails.textContent = `${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;
  if (earModeType === 'test' && earTrainingActive) accuracyPanel.classList.add('visible');
  else if (!resultModal.classList.contains('visible')) accuracyPanel.classList.remove('visible');
}

function updateDifficultyButtons() {
  $('btn-easy').className = 'difficulty-btn' + (earDifficulty === 'easy' ? ' active-easy' : '');
  $('btn-hard').className = 'difficulty-btn' + (earDifficulty === 'hard' ? ' active-hard' : '');
  renderFilterPanel();
}

function updateModeButtons() {
  $('btn-listen-mode').className = 'mode-toggle-btn' + (earModeType === 'listen' ? ' active-listen' : '');
  $('btn-practice-mode').className = 'mode-toggle-btn' + (earModeType === 'practice' ? ' active-practice' : '');
  $('btn-test-mode').className = 'mode-toggle-btn' + (earModeType === 'test' ? ' active-test' : '');
  $('btn-battle-mode').className = 'mode-toggle-btn' + (earModeType === 'battle' ? ' active-battle' : '');
  renderFilterPanel();
}

function hideAllFeedback() {
  if (feedbackHideTimeout) { clearTimeout(feedbackHideTimeout); feedbackHideTimeout = null; }
  feedbackCorrect.className = ''; feedbackWrong.className = '';
}

function showFeedbackCorrect() {
  if (feedbackHideTimeout) clearTimeout(feedbackHideTimeout);
  if (battleMode) { showThumb(true); return; }
  feedbackCorrect.className = 'visible'; feedbackWrong.className = '';
  feedbackHideTimeout = setTimeout(() => { feedbackCorrect.className = ''; feedbackWrong.className = ''; }, 1200);
}

function showFeedbackWrong() {
  if (feedbackHideTimeout) clearTimeout(feedbackHideTimeout);
  if (battleMode) { showThumb(false); return; }
  feedbackWrong.className = 'visible'; feedbackCorrect.className = '';
  feedbackHideTimeout = setTimeout(() => { feedbackCorrect.className = ''; feedbackWrong.className = ''; }, 1200);
}

/* ══════════════════════════════════════════════════════════════ */
/* 5. MOTOR D'ÀUDIO                                               */
/* ══════════════════════════════════════════════════════════════ */
function getSharedCtx() {
  if (!sharedCtx) sharedCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (sharedCtx.state === 'suspended') sharedCtx.resume();
  return sharedCtx;
}

function getPianoBus() {
  const ctx = getSharedCtx();
  if (!pianoBus) {
    pianoBus = ctx.createDynamicsCompressor();
    pianoBus.threshold.value = -20; pianoBus.knee.value = 12; pianoBus.ratio.value = 4;
    pianoBus.attack.value = 0.003; pianoBus.release.value = 0.25;
    pianoBus.connect(ctx.destination);
  }
  return pianoBus;
}

function refreshSoundLabels() {
  $('sc-volume-val').textContent = Math.round(pianoTuning.volume * 100) + '%';
  $('sc-fadein-val').textContent = Math.round(pianoTuning.fadeIn * 1000) + 'ms';
  $('sc-attack-val').textContent = Math.round(pianoTuning.attack) + '%';
  $('sc-decay-val').textContent = pianoTuning.decay.toFixed(2) + 's';
  $('sc-sustain-val').textContent = Math.round(pianoTuning.sustain * 100) + '%';
  $('sc-duration-val').textContent = pianoTuning.duration.toFixed(1) + 's';
  $('sc-bright-val').textContent = Math.round(pianoTuning.brightness * 100) + '%';
}

function syncSoundSliders() {
  $('sc-volume').value = Math.round((pianoTuning.volume - PIANO_VOL_MIN) / (1 - PIANO_VOL_MIN) * 100);
  $('sc-fadein').value = Math.round(pianoTuning.fadeIn * 1000);
  $('sc-attack').value = Math.round(pianoTuning.attack);
  $('sc-decay').value = Math.round(pianoTuning.decay * 100);
  $('sc-sustain').value = Math.round(pianoTuning.sustain * 100);
  $('sc-duration').value = pianoTuning.duration;
  $('sc-bright').value = Math.round(pianoTuning.brightness * 100);
  $('sc-instrument').value = pianoTuning.instrument;
}

function buildPianoVoice(midiNote, baseVolume, useSustain = true) {
  const ctx = getSharedCtx();
  if (activeOscillators[midiNote]) {
    const {oscillators, masterGain} = activeOscillators[midiNote];
    const now = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0.001, now + 0.05);
    oscillators.forEach(({osc}) => { try { osc.stop(now + 0.1); } catch(e) {} });
    delete activeOscillators[midiNote];
  }
  const freq = midiToFreq(midiNote), now = ctx.currentTime;
  const volume = Math.min(0.6, baseVolume * pianoTuning.volume);
  const duration = (sustainPedalActive && useSustain) ? pianoTuning.duration + 3 : pianoTuning.duration;
  const fadeIn = Math.max(0.0005, pianoTuning.fadeIn);
  const peak = Math.min(0.9, volume * (1 + (pianoTuning.attack / 100) * 0.6));
  const inst = INSTRUMENTS[pianoTuning.instrument] || INSTRUMENTS.piano;
  const masterGain = ctx.createGain();
  if (inst.filter) {
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = inst.filter; f.Q.value = 0.7;
    masterGain.connect(f); f.connect(getPianoBus());
  } else { masterGain.connect(getPianoBus()); }
  const oscillators = [], drift = (Math.random() * 8) - 4;
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(peak, now + fadeIn);
  masterGain.gain.linearRampToValueAtTime(volume * pianoTuning.sustain, now + fadeIn + pianoTuning.decay);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  const b = pianoTuning.brightness;
  const harmonics = inst.harmonics.map((g, i) => ({ freq: freq * (i + 1), gain: g * b, type: inst.wave }));
  harmonics.forEach(h => {
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = h.type; osc.frequency.setValueAtTime(h.freq, now); osc.detune.setValueAtTime(drift, now);
    gain.gain.setValueAtTime(h.gain * volume, now); gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain); gain.connect(masterGain); osc.start(now); osc.stop(now + duration);
    oscillators.push({osc, gain});
  });
  activeOscillators[midiNote] = {oscillators, masterGain};
}

function createPianoVoice(midiNote, baseVolume, useSustain = true) {
  const ctx0 = getSharedCtx();
  if (ctx0.state === 'suspended') { ctx0.resume().then(() => buildPianoVoice(midiNote, baseVolume, useSustain)); return; }
  buildPianoVoice(midiNote, baseVolume, useSustain);
}

function startPianoNote(midiNote, volume = 0.3, useSustain = true) { if (!internalPianoEnabled) return; createPianoVoice(midiNote, volume, useSustain); }
function startEarPianoNote(midiNote, volume = 0.3) { createPianoVoice(midiNote, volume); }

function stopPianoNote(midiNote) {
  if (!activeOscillators[midiNote]) return;
  const ctx = getSharedCtx(), {oscillators, masterGain} = activeOscillators[midiNote], now = ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now); masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  oscillators.forEach(({osc}) => { try { osc.stop(now + 0.8); } catch(e) {} });
  delete activeOscillators[midiNote];
}
function stopEarPianoNote(midiNote) { stopPianoNote(midiNote); }
function stopAllPianoNotes() { Object.keys(activeOscillators).forEach(n => stopPianoNote(parseInt(n))); activeOscillators = {}; }
function stopAllEarPianoNotes() { stopAllPianoNotes(); }

function updatePianoButtons() {
  const a = $('btn-piano'), b = $('btn-ear-piano');
  if (internalPianoEnabled) { if (a) a.classList.add('active'); if (b) b.classList.add('active'); }
  else { if (a) a.classList.remove('active'); if (b) b.classList.remove('active'); }
}

function startTonicPedal() {
  stopTonicPedal(false);
  const ctx = getSharedCtx(), oct = currentKeyRoot <= 5 ? 36 : 24, freq = midiToFreq(currentKeyRoot + oct), now = ctx.currentTime;
  tonicPedalMasterGain = ctx.createGain();
  tonicPedalMasterGain.gain.setValueAtTime(0, now); tonicPedalMasterGain.gain.linearRampToValueAtTime(1, now + 2);
  tonicPedalMasterGain.connect(ctx.destination);
  tonicPedalFilter = ctx.createBiquadFilter(); tonicPedalFilter.type = 'lowpass'; tonicPedalFilter.frequency.value = 4000; tonicPedalFilter.Q.value = 0.5;
  const bb = ctx.createBiquadFilter(); bb.type = 'lowshelf'; bb.frequency.value = 200; bb.gain.value = 6;
  bb.connect(tonicPedalFilter); tonicPedalFilter.connect(tonicPedalMasterGain);
  tonicPedalOscs = []; tonicPedalGains = [];
  [{t:'sawtooth', d:0, g:0.4}, {t:'triangle', d:0, g:0.35}, {t:'sine', d:0, g:0.25}].forEach(cfg => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = cfg.t; o.frequency.value = freq; o.detune.value = cfg.d;
    g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(pedalVolume * cfg.g, now + 2);
    o.connect(g); g.connect(bb); o.start(now);
    tonicPedalOscs.push(o); tonicPedalGains.push(g);
  });
}

function stopTonicPedal(fadeOut = false) {
  if (tonicPedalOscs.length) {
    const ctx = getSharedCtx(), now = ctx.currentTime;
    
    if (tonicPedalMasterGain) {
      tonicPedalMasterGain.gain.cancelScheduledValues(now);
      if (fadeOut) {
        tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value, now);
        tonicPedalMasterGain.gain.linearRampToValueAtTime(0.001, now + 3);
      } else {
        tonicPedalMasterGain.gain.setValueAtTime(0.001, now);
      }
    }
    
    tonicPedalOscs.forEach(o => {
      try { o.stop(now); } catch(e) {}
    });
    
    tonicPedalOscs = [];
    tonicPedalGains = [];
    tonicPedalMasterGain = null;
    tonicPedalFilter = null;
  }
}

function playNoteWithPedalSound(midiNote) {
  const ctx = getSharedCtx();
  if (activePedalNotes.has(midiNote)) stopNoteWithPedalSound(midiNote);
  const freq = midiToFreq(midiNote), now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now); masterGain.gain.linearRampToValueAtTime(0.5, now + 0.1);
  masterGain.connect(ctx.destination);
  const bb = ctx.createBiquadFilter(); bb.type = 'lowshelf'; bb.frequency.value = 200; bb.gain.value = 6; bb.connect(masterGain);
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 4000; f.Q.value = 0.5; f.connect(bb);
  const oscs = [];
  [{t:'sawtooth', d:0, g:0.4}, {t:'triangle', d:0, g:0.35}, {t:'sine', d:0, g:0.25}].forEach(cfg => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = cfg.t; o.frequency.value = freq; o.detune.value = cfg.d;
    g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(pedalVolume * cfg.g * 3, now + 0.1);
    o.connect(g); g.connect(f); o.start(now); oscs.push(o);
  });
  activePedalNotes.set(midiNote, {oscs, masterGain});
}

function stopNoteWithPedalSound(midiNote) {
  const h = activePedalNotes.get(midiNote); if (!h) return;
  const now = getSharedCtx().currentTime;
  h.masterGain.gain.cancelScheduledValues(now); h.masterGain.gain.setValueAtTime(h.masterGain.value, now);
  h.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.3);
  h.oscs.forEach(o => { try { o.stop(now + 0.3); } catch(e) {} });
  activePedalNotes.delete(midiNote);
}

function stopAllPedalSounds() { Array.from(activePedalNotes.keys()).forEach(n => stopNoteWithPedalSound(n)); }

/* ══════════════════════════════════════════════════════════════ */
/* 6. DELAYS I COMPTADORS                                         */
/* ══════════════════════════════════════════════════════════════ */
function stopDelayCountdown() {
  if (delayCountdownInterval) { clearInterval(delayCountdownInterval); delayCountdownInterval = null; }
  if (delayCountdownEl) delayCountdownEl.classList.remove('visible');
}

function startDelayCountdown(sec) {
  stopDelayCountdown(); if (!delayCountdownEl) return;
  delayCountdownEl.classList.add('visible'); let remaining = sec; delayCountdownEl.textContent = remaining;
  delayCountdownInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) delayCountdownEl.textContent = remaining;
    else stopDelayCountdown();
  }, 1000);
}

function cancelDelayProcess() {
  if (delayCheckInterval) { clearInterval(delayCheckInterval); delayCheckInterval = null; }
  delayPendingNote = null; delayStartTime = null; stopDelayCountdown();
}

function startDelayProcess(note) {
  cancelDelayProcess(); delayPendingNote = note; delayStartTime = performance.now();
  const delaySec = parseInt($('delay-input').value) || 4; startDelayCountdown(delaySec);
  delayCheckInterval = setInterval(() => {
    const elapsed = (performance.now() - delayStartTime) / 1000;
    if (elapsed >= delaySec) {
      cancelDelayProcess();
      if (delayPendingNote !== null && exclusiveMode === 'delay') {
        const idx = getTransposedIndex(delayPendingNote % 12), n = CONFIG.NOTE_IMAGES[idx];
        if (n && imgElement) { imgElement.src = CONFIG.IMAGE_PATH + n; imgElement.classList.add('visible'); }
      }
    }
  }, 50);
}

/* ══════════════════════════════════════════════════════════════ */
/* 7. MIDI                                                        */
/* ══════════════════════════════════════════════════════════════ */
function getMIDIAccess() {
  if (!midiAccessPromise) {
    midiAccessPromise = navigator.requestMIDIAccess().catch(err => { midiAccessPromise = null; throw err; });
  }
  return midiAccessPromise;
}

async function initMIDI() {
  if (IS_TABLET) { statusElement.textContent = ' Mode Tablet (MIDI no disponible)'; statusElement.style.color = '#ffaa00'; return; }
  if (IS_MAC && !('requestMIDIAccess' in navigator)) {
    statusElement.textContent = '🎹 Mac: Utilitza el teclat manual'; statusElement.style.color = '#ffaa00';
    setTimeout(() => alert('🎹 Estàs utilitzant TONAL EMOTIONS des d\'un Mac.\n\nCom que el MIDI no està disponible, hauràs d\'utilitzar el control manual.'), 500);
    return;
  }
  try {
    const ma = await getMIDIAccess(); statusElement.textContent = t('midi_connected');
    for (let input of ma.inputs.values()) { input.onmidimessage = handleMIDIMessage; statusElement.textContent = `${t('midi_port')} ${input.name}`; }
    ma.onstatechange = e => {
      if (e.port.type === 'input' && e.port.state === 'connected') {
        e.port.onmidimessage = handleMIDIMessage; statusElement.textContent = `${t('midi_port')} ${e.port.name}`;
      }
    };
  } catch(err) { statusElement.textContent = '🎹 Piano intern activat'; statusElement.style.color = '#00ff66'; }
}

function getNoteToShow() {
  if (exclusiveMode === 'normal') {
    if (pressedStack.length) return pressedStack[pressedStack.length - 1];
    if (sustainPedalActive && normalSustainHold !== null) return normalSustainHold;
    return null;
  }
  if (activeNotes.size === 0) return null;
  if (exclusiveMode === 'lead' || exclusiveMode === 'delay') return Math.max(...activeNotes);
  if (exclusiveMode === 'bass') return Math.min(...activeNotes);
  return null;
}

function showProposedAnswer(pc) {
  const n = CONFIG.NOTE_IMAGES[getTransposedIndex(pc)]; if (!n) return;
  if (battleMode) {
    const useP1 = battleCurrentPlayer === 1, img = useP1 ? p1AnswerImage : p2AnswerImage, box = useP1 ? p1Box : p2Box;
    img.src = CONFIG.IMAGE_PATH + n; img.classList.add('visible'); box.classList.add('visible');
  } else {
    proposedAnswerImage.src = CONFIG.IMAGE_PATH + n; proposedAnswerImage.classList.add('visible'); proposedAnswerBox.classList.add('visible');
  }
}

function hideProposedAnswer() {
  p1AnswerImage.classList.remove('visible'); p2AnswerImage.classList.remove('visible'); proposedAnswerImage.classList.remove('visible');
  if (!battleMode) proposedAnswerBox.classList.remove('visible');
}

function handleMIDIMessage(event) {
  const [status, note, velocity] = event.data, command = status & 0xf0;
  if (command === 0x90 && velocity > 0) {
    const now = performance.now();
    if (lastNoteOnTime[note] !== undefined && now - lastNoteOnTime[note] < 50) return;
    lastNoteOnTime[note] = now;
  }
  const inMidiMode = midiMode && midiMode.classList.contains('active'), inEarMode = earMode && earMode.classList.contains('active');
  if (!inMidiMode && !inEarMode) {
    if (command === 0xB0 && note === 64) {
      const p = velocity >= 64; sustainPedalActive = p;
      if (!p && internalPianoEnabled) stopAllPianoNotes();
    } else if (internalPianoEnabled) {
      if (command === 0x90 && velocity > 0) startPianoNote(note, 0.3);
      else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        if (sustainPedalActive) heldByPedal.add(note); else stopPianoNote(note);
      }
    }
    return;
  }
  if (isPaused) return;
  if (earTrainingActive) {
    const pc = note % 12, isTestLike = (earModeType === 'test' || earModeType === 'battle');
    if (command === 0xB0 && note === 64) {
      const p = velocity >= 64; sustainPedalActive = p;
      sustainLed.classList.toggle('active', p); earSustainLed.classList.toggle('active', p);
      if (!p) {
        if (internalPianoEnabled) stopAllEarPianoNotes();
        const r = Array.from(heldByPedal); heldByPedal.clear(); r.forEach(n => activeNotes.delete(n));
      }
      return;
    }
    if (earModeType === 'listen') {
      if (command === 0x90 && velocity > 0) { if (internalPianoEnabled) startEarPianoNote(note, 0.3); }
      else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        if (internalPianoEnabled) { if (sustainPedalActive) heldByPedal.add(note); else stopEarPianoNote(note); }
      }
      return;
    }
    if (command === 0x90 && velocity > 0 && !earUserAlreadyAnswered) {
      testExploringNoImage = false; if (testSustainTimeout) { clearTimeout(testSustainTimeout); testSustainTimeout = null; }
    }
    if (earDifficulty === 'easy') {
      if (command === 0x90 && velocity > 0) {
        if (!testExploringNoImage && !testSustainTimeout) showProposedAnswer(pc);
        if (isTestLike && !earUserAlreadyAnswered) {
          earUserAlreadyAnswered = true; earUserHasPlayed = true; logSoloTime();
          const ok = pc === earCurrentTargetPitchClass;
          if (ok) { earCorrectNotes++; showFeedbackCorrect(); } else showFeedbackWrong();
          earTotalNotes++; updateAccuracyDisplay();
          if (battleMode) battlePlayerAnswered(ok);
          if (advanceTimeout) clearTimeout(advanceTimeout); if (testSustainTimeout) clearTimeout(testSustainTimeout);
          const hideMs = battleMode ? BATTLE_HIDE_MS : TEST_IMAGE_MS, advMs = battleMode ? BATTLE_ADVANCE_MS : (TEST_IMAGE_MS + TEST_EXPLORE_MS);
          testSustainTimeout = setTimeout(() => { testSustainTimeout = null; hideProposedAnswer(); stopEarPianoNote(note); testExploringNoImage = true; }, hideMs);
          advanceTimeout = setTimeout(() => { if (earTrainingActive) advanceToNextNote(); }, advMs);
        } else if (earModeType === 'practice' && inAnswerPhase) {
          const ok = pc === earCurrentTargetPitchClass;
          if (ok) { showFeedbackCorrect(); if (advanceTimeout) clearTimeout(advanceTimeout); advanceTimeout = setTimeout(() => { if (earTrainingActive) advanceToNextNote(); }, 1200); }
          else showFeedbackWrong();
        }
      } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        if (internalPianoEnabled && !testSustainTimeout) stopEarPianoNote(note);
        if (!testSustainTimeout) hideProposedAnswer();
      }
      if (command === 0x90 && velocity > 0 && internalPianoEnabled) startEarPianoNote(note, 0.3);
      return;
    }
    if (command === 0x90 && velocity > 0) {
      if (!testExploringNoImage && !testSustainTimeout) showProposedAnswer(pc);
      if (!earUserAlreadyAnswered) {
        earUserAlreadyAnswered = true; earUserHasPlayed = true; logSoloTime();
        const ok = pc === earCurrentTargetPitchClass;
        if (ok) { earCorrectNotes++; showFeedbackCorrect(); } else showFeedbackWrong();
        earTotalNotes++; updateAccuracyDisplay();
        if (battleMode) battlePlayerAnswered(ok);
        if (advanceTimeout) clearTimeout(advanceTimeout);
        if (isTestLike) {
          const hideMs = battleMode ? BATTLE_HIDE_MS : TEST_IMAGE_MS, advMs = battleMode ? BATTLE_ADVANCE_MS : (TEST_IMAGE_MS + TEST_EXPLORE_MS);
          if (testSustainTimeout) clearTimeout(testSustainTimeout);
          testSustainTimeout = setTimeout(() => { testSustainTimeout = null; hideProposedAnswer(); stopEarPianoNote(note); testExploringNoImage = true; }, hideMs);
          advanceTimeout = setTimeout(() => { if (earTrainingActive) advanceToNextNote(); }, advMs);
        } else {
          advanceTimeout = setTimeout(() => { if (earTrainingActive) advanceToNextNote(); }, 1200);
        }
      }
      if (internalPianoEnabled) startEarPianoNote(note, 0.3);
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      if (internalPianoEnabled && !testSustainTimeout) { if (sustainPedalActive) heldByPedal.add(note); else stopEarPianoNote(note); }
      if (!sustainPedalActive && !testSustainTimeout) hideProposedAnswer();
    }
    return;
  }
  if (internalPianoEnabled) {
    if (command === 0x90 && velocity > 0) startPianoNote(note, 0.3);
    else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      if (sustainPedalActive) heldByPedal.add(note); else stopPianoNote(note);
    }
  }
  const pc = note % 12, idx = getTransposedIndex(pc);
  if (command === 0x90 && velocity > 0) {
    activeNotes.add(note); if (!pressedStack.includes(note)) pressedStack.push(note);
    normalSustainHold = null; physicalHeld.add(note); heldByPedal.delete(note);
    if (inEarMode && !earTrainingActive && wrappers[idx]) { wrappers[idx].style.display = 'block'; wrappers[idx].classList.add('visible'); wrappers[idx].style.opacity = '1'; }
    if (exclusiveMode === 'multi' && wrappers[idx]) { wrappers[idx].style.display = 'block'; wrappers[idx].classList.add('visible'); wrappers[idx].style.opacity = '1'; }
    if (exclusiveMode === 'complete' && wrappers[idx] && wrappers[idx].noteNumber) wrappers[idx].noteNumber.classList.add('active-note');
    if (exclusiveMode === 'delay') {
      const pr = [...physicalHeld];
      if (pr.length === 1) startDelayProcess(pr[0]); else cancelDelayProcess();
    }
    if (exclusiveMode === 'normal' || exclusiveMode === 'lead' || exclusiveMode === 'bass') {
      const nt = getNoteToShow();
      if (nt !== null) { const n = CONFIG.NOTE_IMAGES[getTransposedIndex(nt % 12)]; if (n) { imgElement.src = CONFIG.IMAGE_PATH + n; imgElement.classList.add('visible'); } }
    }
  } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
    pressedStack = pressedStack.filter(n => n !== note); physicalHeld.delete(note);
    if (pressedStack.length === 0 && sustainPedalActive) normalSustainHold = note;
    else if (pressedStack.length) normalSustainHold = null;
    if (sustainPedalActive) heldByPedal.add(note);
    else {
      activeNotes.delete(note);
      if (inEarMode && !earTrainingActive && wrappers[idx]) { wrappers[idx].classList.remove('visible'); wrappers[idx].style.opacity = '0'; wrappers[idx].style.display = 'none'; }
      if (exclusiveMode === 'multi' && wrappers[idx]) { wrappers[idx].classList.remove('visible'); wrappers[idx].style.opacity = '0'; }
      if (exclusiveMode === 'complete' && wrappers[idx] && wrappers[idx].noteNumber) wrappers[idx].noteNumber.classList.remove('active-note');
      if (exclusiveMode === 'delay') cancelDelayProcess();
      if (exclusiveMode === 'normal' || exclusiveMode === 'lead' || exclusiveMode === 'bass') {
        const nt = getNoteToShow();
        if (nt === null) imgElement.classList.remove('visible');
        else { const n = CONFIG.NOTE_IMAGES[getTransposedIndex(nt % 12)]; if (n) { imgElement.src = CONFIG.IMAGE_PATH + n; imgElement.classList.add('visible'); } }
      }
    }
  }
}

/* ══════════════════════════════════════════════════════════════ */
/* 8. EAR TRAINING                                                */
/* ══════════════════════════════════════════════════════════════ */
function generateEarSequence() {
  const d = [0,2,4,5,7,9,11], nd = [1,3,6,8,10]; let allowed;
  if (earNoteMode === 'diatonic') allowed = d.filter(x => earFilterDiat.has(x));
  else if (earNoteMode === 'non-diatonic') allowed = nd.filter(x => earFilterNonDiat.has(x));
  else allowed = [0,1,2,3,4,5,6,7,8,9,10,11].filter(x => earFilterAll.has(x));
  if (allowed.length < 2) allowed = (earNoteMode === 'diatonic') ? d : (earNoteMode === 'non-diatonic') ? nd : [0,1,2,3,4,5,6,7,8,9,10,11];
  let pool = [];
  for (let o = 2; o <= 7; o++) { for (let g of allowed) { const m = currentKeyRoot + g + o * 12; if (m >= 36 && m <= 96) pool.push(m); } }
  let s = shuffleArray(pool);
  for (let i = 2; i < s.length; i++) {
    const a = (s[i] - currentKeyRoot) % 12, b = (s[i-1] - currentKeyRoot) % 12, c = (s[i-2] - currentKeyRoot) % 12;
    if (a === b && b === c) {
      for (let j = i + 1; j < s.length; j++) {
        if ((s[j] - currentKeyRoot) % 12 !== a) { [s[i], s[j]] = [s[j], s[i]]; break; }
      }
    }
  }
  return s;
}

// ⚠️ VERSIÓ BLINDADA I UNIFICADA (sense duplicats)
function startBattle() {
  battlePlayer1Name = $('battle-player1-name').value.trim() || (t('player') + ' 1');
  battlePlayer2Name = $('battle-player2-name').value.trim() || (t('player') + ' 2');
  bp1 = {correct:0, total:0, times:[]}; bp2 = {correct:0, total:0, times:[]};
  battleCurrentPlayer = 1; battleMode = true;
  sdActive = false; sdCount = 0; sdWinner = null; sdPairMiss = [false, false]; sdPairAns = 0; sdTotalPairs = 0; naturalEnd = false;
  hideBattleModal(); document.body.classList.add('battle-on');
  battleScoreboard.classList.add('visible'); p1Box.classList.add('visible'); p2Box.classList.add('visible');
  proposedAnswerBox.classList.remove('visible'); accuracyPanel.classList.remove('visible'); resultModal.classList.remove('visible');
  hideAllFeedback();
  $('p1-name-label').textContent = battlePlayer1Name; $('p2-name-label').textContent = battlePlayer2Name;
  updateBattleScoreboard(); updateBattleAccuracy(); positionBattleBoxes();
  
  // Neteja agressiva del localStorage per evitar fantasmes de pestanyes tancades
  localStorage.removeItem(CONFIG.STORAGE_KEYS.MIDI_TAB);
  
  startEarTraining();
  showBattleTurn();
}

// ⚠️ VERSIÓ BLINDADA I UNIFICADA (amb detecció d'iPad robusta)
function startEarTraining() {
  // 1. Detecció de tablet BLINDADA (fallback per si IS_IPAD falla en iOS nou)
  const isTablet = IS_TABLET || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) || /iPad|Android/.test(navigator.userAgent);
  // 2. Comprovar si estem en mode batalla (doble verificació)
  const isBattle = (earModeType === 'battle' || battleMode === true);
  // 3. Només comprovem pestanyes si NO és tablet i NO és batalla
  const shouldCheckTab = !isBattle && !isTablet;
  
  console.log('[TONAL DEBUG] isBattle:', isBattle, '| isTablet:', isTablet, '| shouldCheckTab:', shouldCheckTab, '| otherTabActive:', otherTabActive());
  
  if (shouldCheckTab && otherTabActive()) {
    console.log('[TONAL] Altra pestanya activa, cancel·lant inici.');
    multiTabWarning.classList.add('visible');
    setTimeout(() => multiTabWarning.classList.remove('visible'), 3000);
    return;
  }
  
  // 4. Neteja i reclamació de pestanya (seguretat extra)
  localStorage.removeItem(CONFIG.STORAGE_KEYS.MIDI_TAB);
  claimActiveTab();
  console.log('[TONAL] Pestanya reclamada amb èxit. TAB_ID:', TAB_ID);
  
  getSharedCtx(); earTrainingActive = true; earPanel.classList.add('running');
  earTimeRemaining = parseInt($('ear-duration-full').value) * 60;
  earSequence = generateEarSequence(); earCurrentIndex = 0; earCurrentTargetPitchClass = null;
  earUserAlreadyAnswered = false; earCorrectNotes = 0; earTotalNotes = 0; earUserHasPlayed = false; soloTimes = [];
  hasAdvanced = false; pauseCount = 0; pausedByUser = false; inAnswerPhase = false;
  consecutivePauses = 0; totalPauses = 0; testExploringNoImage = false; battleLastQ = 0;
  if (testSustainTimeout) { clearTimeout(testSustainTimeout); testSustainTimeout = null; }
  if (earModeType === 'test' || earModeType === 'battle') accuracyPanel.classList.remove('visible');
  proposedAnswerBox.classList.remove('visible'); resultModal.classList.remove('visible'); hideAllFeedback();
  thinkingEmoji.classList.remove('visible'); imgElement.style.display = ''; imgElement.classList.remove('visible');
  Object.values(wrappers).forEach(w => {
    w.style.display = 'none'; w.style.opacity = '0'; w.classList.remove('visible', 'active-note');
    if (w.noteNumber) w.noteNumber.classList.remove('visible', 'active-note');
  });
  $('btn-ear-start-full').style.display = 'none'; $('btn-ear-stop-full').style.display = 'block'; $('btn-help-ear').style.display = 'none';
  ['ear-duration-full', 'ear-delay-input-full', 'ear-key-select'].forEach(id => $(id).disabled = true);
  document.querySelectorAll('.ear-mode-btn').forEach(b => b.disabled = true);
  $('btn-easy').disabled = true; $('btn-hard').disabled = true;
  $('btn-test-mode').disabled = true; $('btn-practice-mode').disabled = true; $('btn-listen-mode').disabled = true; $('btn-battle-mode').disabled = true;
  if (sdActive) $('ear-timer-full').style.display = 'none';
  else { $('ear-timer-full').style.display = ''; $('ear-timer-full').textContent = formatTime(earTimeRemaining); }
  if (earNoteMode === 'all' && earDifficulty === 'hard' && earModeType === 'test' && earFilterAll.size >= 12) {
    hardcoreWarning.classList.add('visible');
    hardcoreTimeout = setTimeout(() => { hardcoreWarning.classList.remove('visible'); hardcoreTimeout = null; startWarmup(); }, 12000);
  } else startWarmup();
  earFilterPanelVisible = false; hideFilterInfo(); renderFilterPanel();
  if (battleMode) { positionBattleBoxes(); showBattleTurn(); }
}

function startWarmup() {
  if (earDifficulty !== 'easy') startTonicPedal();
  const ov = $('warmup-overlay'), cd = $('warmup-countdown');
  ov.classList.add('visible'); warmupText.textContent = (earDifficulty === 'easy') ? t('listen_cadence') : t('listen_tonic');
  let c = 5; cd.textContent = c;
  if (warmupInterval) clearInterval(warmupInterval);
  warmupInterval = setInterval(() => {
    c--;
    if (c > 0) cd.textContent = c;
    else if (c === 0) cd.textContent = t('let_s_go');
    else { clearInterval(warmupInterval); warmupInterval = null; ov.classList.remove('visible'); startMainTimer(); }
  }, 1000);
}

function startMainTimer() {
  if (!sdActive) {
    earTimer = setInterval(() => {
      if (!isPaused) {
        earTimeRemaining--;
        if (earTimeRemaining <= 0) {
          earTimeRemaining = 0; if (!sdActive) $('ear-timer-full').textContent = formatTime(0);
          if (battleMode && bp1.total !== bp2.total) {
            battleLastQ = ((inAnswerPhase && !earUserAlreadyAnswered) || cadenceTimeouts.length > 0) ? 2 : 1;
            clearInterval(earTimer); earTimer = null;
          } else stopEarTraining(true);
        } else if (!sdActive) $('ear-timer-full').textContent = formatTime(earTimeRemaining);
      }
    }, 1000);
  }
  playEarNote(); updateFilterInfo();
}

function playEarNote() {
  if (!earTrainingActive || hasAdvanced || isPaused) return;
  testExploringNoImage = false;
  if (testSustainTimeout) { clearTimeout(testSustainTimeout); testSustainTimeout = null; }
  if (earCurrentIndex >= earSequence.length) { earSequence = generateEarSequence(); earCurrentIndex = 0; }
  const ci = earCurrentIndex, midiNote = earSequence[ci], pc = midiNote % 12, delaySec = parseInt($('ear-delay-input-full').value) || 4;
  earCurrentTargetPitchClass = pc; earUserAlreadyAnswered = false; hasAdvanced = false; inAnswerPhase = false;
  hideAllFeedback(); hideProposedAnswer(); imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible');
  if (earModeType === 'practice') proposedAnswerBox.classList.add('mid-position');
  else proposedAnswerBox.classList.remove('mid-position');
  Object.values(wrappers).forEach(w => {
    w.style.display = 'none'; w.style.opacity = '0'; w.classList.remove('visible', 'active-note');
    if (w.noteNumber) w.noteNumber.classList.remove('visible', 'active-note');
  });
  const onTimeout = () => {
    stopDelayCountdown(); thinkingEmoji.classList.remove('visible');
    if (!earTrainingActive || hasAdvanced || earCurrentIndex !== ci) return;
    if (earModeType === 'listen') {
      const n = CONFIG.NOTE_IMAGES[getTransposedIndex(pc)];
      if (n) { imgElement.src = CONFIG.IMAGE_PATH + n; imgElement.classList.add('visible'); }
      if (listenDisplayTimeout) clearTimeout(listenDisplayTimeout);
      listenDisplayTimeout = setTimeout(() => {
        if (earTrainingActive && !hasAdvanced && earCurrentIndex === ci) {
          hasAdvanced = true; imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible'); earCurrentIndex++;
          setTimeout(() => { if (earTrainingActive) { hasAdvanced = false; playEarNote(); } }, 300);
        }
      }, 3000);
      return;
    }
    if (!earUserAlreadyAnswered) {
      earUserAlreadyAnswered = true; logSoloTime(); earTotalNotes++; updateAccuracyDisplay(); showFeedbackWrong();
      if (battleMode) { logEv('⏱ J' + battleCurrentPlayer + ' TIMEOUT'); battlePlayerAnswered(false); }
      if (showCorrectTimeout) clearTimeout(showCorrectTimeout);
      const advMs = battleMode ? BATTLE_ADVANCE_MS : 1200;
      showCorrectTimeout = setTimeout(() => { if (earTrainingActive && !hasAdvanced && earCurrentIndex === ci) advanceToNextNote(); }, advMs);
    }
  };
  if (earDifficulty === 'easy') {
    playCadenceWithPedalSound(() => {
      inAnswerPhase = true; if (earModeType === 'listen') thinkingEmoji.classList.add('visible');
      startEarPianoNote(midiNote, 0.3); startDelayCountdown(delaySec);
      if (earImageTimeout) clearTimeout(earImageTimeout); earImageTimeout = setTimeout(onTimeout, delaySec * 1000);
    });
  } else {
    inAnswerPhase = true; startEarPianoNote(midiNote, 0.3); startDelayCountdown(delaySec);
    if (earModeType === 'listen') thinkingEmoji.classList.add('visible');
    if (earImageTimeout) clearTimeout(earImageTimeout); earImageTimeout = setTimeout(onTimeout, delaySec * 1000);
  }
}

function advanceToNextNote() {
  if (hasAdvanced || !earTrainingActive) return;
  if (battleMode && battleLastQ === 2) { stopEarTraining(false); return; }
  if (battleMode && battleLastQ === 1) battleLastQ = 2;
  hasAdvanced = true; testExploringNoImage = false;
  if (testSustainTimeout) { clearTimeout(testSustainTimeout); testSustainTimeout = null; }
  [earImageTimeout, showCorrectTimeout, advanceTimeout].forEach(t0 => { if (t0) clearTimeout(t0); });
  earImageTimeout = showCorrectTimeout = advanceTimeout = null;
  hideAllFeedback(); hideProposedAnswer(); imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible');
  earCurrentIndex++;
  setTimeout(() => { if (earTrainingActive) { hasAdvanced = false; playEarNote(); } }, 200);
}

function stopEarTraining(fadeOut = false) {
  const wasBattle = battleMode;
  releaseActiveTab(); earTrainingActive = false; hasAdvanced = false; battleLastQ = 0; earPanel.classList.remove('running');
  stopDelayCountdown(); stopCadence();
  if (testSustainTimeout) { clearTimeout(testSustainTimeout); testSustainTimeout = null; }
  testExploringNoImage = false;
  if (hardcoreTimeout) { clearTimeout(hardcoreTimeout); hardcoreTimeout = null; }
  hardcoreWarning.classList.remove('visible');
  if (warmupInterval) { clearInterval(warmupInterval); warmupInterval = null; }
  if (earTimer) clearInterval(earTimer);
  [earImageTimeout, showCorrectTimeout, advanceTimeout, feedbackHideTimeout, listenDisplayTimeout].forEach(t0 => { if (t0) clearTimeout(t0); });
  stopTonicPedal(fadeOut); stopAllEarPianoNotes(); hideAllFeedback();
  imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible'); hideProposedAnswer();
  $('warmup-overlay').classList.remove('visible');
  $('btn-ear-start-full').style.display = 'block'; $('btn-ear-stop-full').style.display = 'none'; $('btn-help-ear').style.display = '';
  ['ear-duration-full', 'ear-delay-input-full', 'ear-key-select'].forEach(id => $(id).disabled = false);
  $('btn-easy').disabled = false; $('btn-hard').disabled = false;
  document.querySelectorAll('.ear-mode-btn').forEach(b => b.disabled = false);
  $('btn-test-mode').disabled = false; $('btn-practice-mode').disabled = false; $('btn-listen-mode').disabled = false; $('btn-battle-mode').disabled = false;
  const durVal = parseInt($('ear-duration-full').value) || 5;
  $('ear-timer-full').style.display = ''; $('ear-timer-full').textContent = formatTime(durVal * 60);
  if (wasBattle) {
    if (earUserHasPlayed && !sdActive && bp1.total > 0 && bp1.correct === bp2.correct) { showSuddenDeathProposal(); return; }
    cleanupBattleUI();
    if (earUserHasPlayed) {
      updateBattleAccuracy();
      battleResultTimeout = setTimeout(() => { battleResultTimeout = null; showBattleResultModal(); }, 500);
    }
  } else if (earModeType === 'test' && earUserHasPlayed) {
    updateAccuracyDisplay(); accuracyPanel.classList.add('visible'); setTimeout(showResultMessage, 500);
  } else accuracyPanel.classList.remove('visible');
  hideFilterInfo(); renderFilterPanel();
}

function playCadenceWithPedalSound(cb) {
  const root = currentKeyRoot + 36, fourth = (currentKeyRoot + 5) % 12 + 24, fifth = (currentKeyRoot + 7) % 12 + 24;
  stopAllPedalSounds(); cadenceTimeouts.forEach(t0 => clearTimeout(t0)); cadenceTimeouts = [];
  playNoteWithPedalSound(root);
  cadenceTimeouts.push(setTimeout(() => { stopNoteWithPedalSound(root); playNoteWithPedalSound(fourth); }, 1000));
  cadenceTimeouts.push(setTimeout(() => { stopNoteWithPedalSound(fourth); playNoteWithPedalSound(fifth); }, 2000));
  cadenceTimeouts.push(setTimeout(() => {
    stopNoteWithPedalSound(fifth); playNoteWithPedalSound(root);
    cadenceTimeouts.push(setTimeout(() => { stopNoteWithPedalSound(root); if (cb) cb(); }, 2000));
  }, 3000));
}

function stopCadence() { cadenceTimeouts.forEach(t0 => clearTimeout(t0)); cadenceTimeouts = []; stopAllPedalSounds(); }

function pauseEarTraining() {
  if (!earTrainingActive || isPaused) return;
  pauseCount++; consecutivePauses++; totalPauses++;
  if (consecutivePauses > 10) {
    resultMessage.textContent = t('pause_cheat'); resultPercentage.textContent = '-'; resultDetails.textContent = `${totalPauses} pauses`;
    resultModal.classList.add('visible'); stopEarTraining(false); return;
  }
  isPaused = true; pausedByUser = true; pauseModal.classList.add('visible');
  if (tonicPedalMasterGain && sharedCtx) {
    const now = sharedCtx.currentTime;
    tonicPedalMasterGain.gain.cancelScheduledValues(now); tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value, now);
    tonicPedalMasterGain.gain.linearRampToValueAtTime(0, now + 1.5);
  }
}

function resumeEarTraining() {
  if (!isPaused) return;
  isPaused = false; pauseModal.classList.remove('visible'); consecutivePauses = 0;
  if (tonicPedalMasterGain && sharedCtx) {
    const now = sharedCtx.currentTime;
    tonicPedalMasterGain.gain.cancelScheduledValues(now); tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value, now);
    tonicPedalMasterGain.gain.linearRampToValueAtTime(1, now + 1);
  }
}

function abortEarTraining() { if (!isPaused) return; isPaused = false; pauseModal.classList.remove('visible'); stopEarTraining(false); }

function showResultMessage() {
  if (earModeType !== 'test' || !earUserHasPlayed) return;
  const p = earTotalNotes > 0 ? Math.round(earCorrectNotes / earTotalNotes * 100) : 0;
  resultPercentage.textContent = `${p}%`; resultDetails.textContent = `${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;
  const filtered = (earFilterDiat.size < 7) || (earFilterNonDiat.size < 5) || (earFilterAll.size < 12);
  let m = '';
  if (p === 100) m = t('result_crack');
  else if (p >= 90) m = (earNoteMode === 'diatonic') ? t('result_diat').replace('{X}', p) : (earNoteMode === 'non-diatonic') ? t('result_non_diat').replace('{X}', p) : t('result_excel');
  else if (p >= 70) m = t('result_good').replace('{X}', p);
  else if (p < 30 && earTotalNotes > 10) m = t('result_short');
  else m = t('result_keep').replace('{X}', p);
  if (filtered) m += ' ' + t('result_filtered').replace('{X}', p);
  resultMessage.textContent = m; resultModal.classList.add('visible');
}

/* ══════════════════════════════════════════════════════════════ */
/* 9. BATALLA                                                     */
/* ══════════════════════════════════════════════════════════════ */
function showBattleModal() {
  battleModal.classList.add('visible');
  $('battle-player1-name').value = battlePlayer1Name; $('battle-player2-name').value = battlePlayer2Name;
  setTimeout(() => $('battle-player1-name').focus(), 50);
}
function hideBattleModal() { battleModal.classList.remove('visible'); }

function positionBattleBoxes() {
  if (!p1Box.classList.contains('visible')) return;
  const r = earPanel.getBoundingClientRect(); let top = r.bottom + 12;
  const h = Math.max(p1Box.offsetHeight || 220, p2Box.offsetHeight || 220), maxTop = innerHeight - h - 90;
  if (top > maxTop) top = Math.max(90, maxTop);
  p1Box.style.top = top + 'px'; p2Box.style.top = top + 'px';
}

function showBattleTurn() {
  if (!battleMode) return;
  const name = battleCurrentPlayer === 1 ? battlePlayer1Name : battlePlayer2Name;
  battleTurnIndicator.textContent = '🎯 ' + t('battle_your_turn').replace('{X}', name);
  battleTurnIndicator.classList.add('visible');
  if (turnIndicatorTimeout) clearTimeout(turnIndicatorTimeout);
  turnIndicatorTimeout = setTimeout(() => { battleTurnIndicator.classList.remove('visible'); turnIndicatorTimeout = null; }, BATTLE_TURN_MS);
  updateBattleScoreboard();
}

function updateBattleScoreboard() {
  if (!battleMode) return;
  $('battle-p1-name').textContent = battlePlayer1Name; $('battle-p2-name').textContent = battlePlayer2Name;
  $('battle-p1-score').textContent = bp1.correct; $('battle-p2-score').textContent = bp2.correct;
  $('battle-p1-display').classList.toggle('active', battleCurrentPlayer === 1);
  $('battle-p2-display').classList.toggle('active', battleCurrentPlayer === 2);
  p1Box.classList.toggle('active-turn', battleCurrentPlayer === 1); p2Box.classList.toggle('active-turn', battleCurrentPlayer === 2);
}

function updateBattleAccuracy() {
  const p1p = bp1.total ? Math.round(bp1.correct / bp1.total * 100) : 0, p2p = bp2.total ? Math.round(bp2.correct / bp2.total * 100) : 0;
  p1AccuracyValue.textContent = p1p + '%'; p1AccuracyDetails.textContent = `${bp1.correct} / ${bp1.total} ${t('word_notes')}`;
  p2AccuracyValue.textContent = p2p + '%'; p2AccuracyDetails.textContent = `${bp2.correct} / ${bp2.total} ${t('word_notes')}`;
}

// ⚠️ VERSIÓ CORREGIDA PER AL CANVI DE TORN RÀPID
function battlePlayerAnswered(ok) {
  console.log('[TONAL BATTLE] battlePlayerAnswered cridada!', {
    battleMode: battleMode,
    ok: ok,
    currentPlayer: battleCurrentPlayer,
    timestamp: performance.now()
  });
  
  if (!battleMode) {
    console.log('[TONAL BATTLE] ERROR: battleMode és false, sortint!');
    return;
  }
  
  if (v10PendingFlash) clearTimeout(v10PendingFlash);
  if (v10PendingTurn) clearTimeout(v10PendingTurn);
  if (advanceTimeout) clearTimeout(advanceTimeout);
  
  setFlashVisible(false); 
  battleTurnIndicator.classList.remove('visible');
  
  const answerer = battleCurrentPlayer;
  const cur = answerer === 1 ? bp1 : bp2;
  if (!cur.times) cur.times = [];
  
  const isTimeout = !sdActive && !ok && (performance.now() - v10LastHumanNote > 2500);
  cur.total++;
  
  let fmsg, fcol;
  if (ok) { 
    cur.correct++; 
    fmsg = '✔ ' + t('v10_flash_nice'); 
    fcol = '#00ff66'; 
  } else { 
    fmsg = isTimeout ? ('⏱ ' + t('v10_timeout')) : ('✖ ' + t('v10_flash_miss')); 
    fcol = isTimeout ? '#ffaa00' : '#ff0055'; 
  }
  
  cur.times.push(performance.now() - (v10LastNoteAt || performance.now()));
  
  if (sdActive) { 
    sdPairAns++; 
    if (!ok) sdPairMiss[answerer - 1] = true; 
  }
  
  // CANVIAR TORN IMMEDIATAMENT
  battleCurrentPlayer = answerer === 1 ? 2 : 1;
  console.log('[TONAL BATTLE] Torn canviat a:', battleCurrentPlayer);
  
  updateBattleAccuracy(); 
  updateBattleScoreboard();
  
  v10PendingFlash = setTimeout(() => { 
    v10PendingFlash = null; 
    if (battleMode) v10Flash(fmsg, fcol); 
  }, 400);
  
  v10PendingTurn = setTimeout(() => { 
    v10PendingTurn = null; 
    if (battleMode) showBattleTurn(); 
  }, 900);
  
  if (sdActive && sdPairAns >= 2) {
    const m1 = sdPairMiss[0], m2 = sdPairMiss[1];
    if (m1 !== m2) { 
      sdWinner = m1 ? 2 : 1; 
      stopEarTraining(false); 
    } else {
      sdPairMiss = [false, false]; 
      sdPairAns = 0; 
      sdTotalPairs++;
      if (sdTotalPairs >= 30) { 
        showBattleResultModal(); 
        stopEarTraining(false); 
      }
    }
  }
}

function v10Flash(txt, color) {
  flash.textContent = txt; flash.style.color = color; setFlashVisible(true);
  if (flashTO) clearTimeout(flashTO); flashTO = setTimeout(() => setFlashVisible(false), 700);
}

function showThumb(ok) {
  const isP1 = battleCurrentPlayer === 1, box = isP1 ? p1Box : p2Box;
  thumb.textContent = ok ? '👍' : '👎';
  const scale = (typeof currentZoom === 'number' ? currentZoom : 100) / 100, r = box.getBoundingClientRect();
  const left = isP1 ? (r.right - 46) : (r.left + 10);
  thumb.style.left = (left / scale) + 'px'; thumb.style.top = ((r.top + 6) / scale) + 'px';
  setThumbVisible(true);
  if (thumbTO) clearTimeout(thumbTO); thumbTO = setTimeout(() => setThumbVisible(false), 700);
}

function ensureBattleResultImg() {
  if (battleResultImg) return battleResultImg;
  battleResultImg = document.createElement('img'); battleResultImg.id = 'battle-result-img';
  battleResultImg.style.cssText = 'width:100%;max-height:230px;object-fit:cover;border-radius:14px;margin-bottom:16px;border:2px solid #ffaa00;display:none;';
  battleResultModal.insertBefore(battleResultImg, battleResultModal.firstChild);
  return battleResultImg;
}

function battleResultImageFile() {
  if (bp1.correct === bp2.correct) return 'battle_draw.png';
  const p1wins = bp1.correct > bp2.correct, wc = p1wins ? bp1.correct : bp2.correct, wt = p1wins ? bp1.total : bp2.total;
  if (wt > 0 && wc === wt) return 'battle_perfect.png';
  if (Math.abs(bp1.correct - bp2.correct) >= 3) return 'battle_ko.png';
  return 'battle_win.png';
}

function showBattleResultModal() {
  sdActive = false; let txt;
  if (sdWinner) { txt = t('battle_winner').replace('{X}', sdWinner === 1 ? battlePlayer1Name : battlePlayer2Name); sdWinner = null; }
  else if (bp1.correct > bp2.correct) txt = t('battle_winner').replace('{X}', battlePlayer1Name);
  else if (bp2.correct > bp1.correct) txt = t('battle_winner').replace('{X}', battlePlayer2Name);
  else txt = t('battle_tie');
  $('battle-winner-name').textContent = txt;
  $('battle-stat-p1-name').textContent = battlePlayer1Name; $('battle-stat-p1-score').textContent = `${bp1.correct} / ${bp1.total}`;
  $('battle-stat-p2-name').textContent = battlePlayer2Name; $('battle-stat-p2-score').textContent = `${bp2.correct} / ${bp2.total}`;
  const img = ensureBattleResultImg(); img.src = CONFIG.IMAGE_PATH + battleResultImageFile(); img.style.display = 'block';
  battleResultModal.classList.add('visible');
}

function cleanupBattleUI() {
  if (battleResultTimeout) { clearTimeout(battleResultTimeout); battleResultTimeout = null; }
  battleResultModal.classList.remove('visible'); battleMode = false; document.body.classList.remove('battle-on');
  battleScoreboard.classList.remove('visible'); battleTurnIndicator.classList.remove('visible');
  if (turnIndicatorTimeout) { clearTimeout(turnIndicatorTimeout); turnIndicatorTimeout = null; }
  p1Box.classList.remove('visible', 'active-turn'); p1AnswerImage.classList.remove('visible');
  p2Box.classList.remove('visible', 'active-turn'); p2AnswerImage.classList.remove('visible');
  proposedAnswerBox.classList.remove('visible', 'active-turn'); accuracyPanel.classList.remove('visible', 'active-turn');
  sdActive = false; sdPairAns = 0; sdPairMiss = [false, false]; sdTotalPairs = 0;
}

/* ══════════════════════════════════════════════════════════════ */
/* 10. FILTRE I TECLAT MANUAL                                     */
/* ══════════════════════════════════════════════════════════════ */
function filterSet() { return earNoteMode === 'non-diatonic' ? earFilterNonDiat : (earNoteMode === 'all' ? earFilterAll : earFilterDiat); }
function filterOrder() { return earNoteMode === 'non-diatonic' ? [1,3,6,8,10] : (earNoteMode === 'all' ? [0,1,2,3,4,5,6,7,8,9,10,11] : [0,11,2,7,4,5,9]); }
function filterButtonShouldShow() { return earMode.classList.contains('active') && !earTrainingActive; }

function updateManualButtonsVisibility() {
  const buttons = document.querySelectorAll('.manual-btn'), cont = document.querySelector('.manual-buttons');
  let vc = 0;
  buttons.forEach(b => {
    const d = parseInt(b.dataset.degree); let shouldShow = false;
    if (midiMode.classList.contains('active')) shouldShow = true;
    else if (earMode.classList.contains('active')) {
      if (earNoteMode === 'diatonic') shouldShow = earFilterDiat.has(d);
      else if (earNoteMode === 'non-diatonic') shouldShow = earFilterNonDiat.has(d);
      else shouldShow = earFilterAll.has(d);
    }
    b.style.display = shouldShow ? 'flex' : 'none'; if (shouldShow) vc++;
  });
  if (vc === 0) vc = 1;
  if (cont) cont.style.gridTemplateColumns = (vc <= 7) ? `repeat(${vc},1fr)` : 'repeat(6,1fr)';
  renderFilterPanel();
}

function buildFilterUI() {
  if (filterBtn) return;
  const st = document.createElement('style');
  st.textContent = `
    #btn-ear-filter { position: absolute; top: 6px; left: calc(100% + 8px); z-index: 400; background: #222831; border: 1px solid #8c52ff; color: #eee; border-radius: 8px; padding: 4px 8px; cursor: pointer; font-size: 11px; }
    #ear-filter-panel { position: absolute; top: 50px; left: calc(100% + 8px); z-index: 400; background: #12161cee; border: 1px solid #8c52ff; border-radius: 12px; padding: 12px 14px; flex-direction: column; gap: 8px; min-width: 230px; }
    #ear-filter-panel .ear-filter-title { color: #8c52ff; font-weight: bold; font-size: 14px; }
    #ear-filter-panel .ear-filter-row { display: flex; gap: 6px; flex-wrap: nowrap; }
    #ear-filter-panel .ear-filter-cell { width: 38px; height: 38px; border-radius: 8px; border: 2px solid #444; background: #1c222b; color: #777; font-weight: bold; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    #ear-filter-panel .ear-filter-cell.on { border-color: #39d98a; color: #fff; background: #123324; }
    #ear-filter-panel .ear-filter-hint { color: #888; font-size: 11px; }
  `;
  document.head.appendChild(st);
  filterBtn = document.createElement('button'); filterBtn.id = 'btn-ear-filter'; filterBtn.style.display = 'none';
  let host = $('ear-key-select');
  while (host && host.parentElement && host.parentElement !== earMode) host = host.parentElement;
  if (!host || host === earMode) host = earMode;
  host.style.position = 'relative'; host.appendChild(filterBtn);
  filterPanel = document.createElement('div'); filterPanel.id = 'ear-filter-panel'; filterPanel.style.display = 'none';
  filterTitleEl = document.createElement('div'); filterTitleEl.className = 'ear-filter-title';
  filterRowEl = document.createElement('div'); filterRowEl.className = 'ear-filter-row';
  filterHintEl = document.createElement('div'); filterHintEl.className = 'ear-filter-hint';
  filterPanel.appendChild(filterTitleEl); filterPanel.appendChild(filterRowEl); filterPanel.appendChild(filterHintEl);
  host.appendChild(filterPanel);
  filterBtn.addEventListener('click', () => { earFilterPanelVisible = !earFilterPanelVisible; renderFilterPanel(); updateManualButtonsVisibility(); });
}

function renderFilterPanel() {
  if (!filterBtn) buildFilterUI();
  const show = filterButtonShouldShow();
  filterBtn.style.display = show ? 'block' : 'none';
  if (show) {
    filterBtn.textContent = (earModeType === 'test') ? t('filter_btn_test') : (earModeType === 'listen') ? t('filter_btn_listen') : (earModeType === 'battle') ? t('filter_btn_battle') : t('filter_btn_practice');
  }
  if (!show || !earFilterPanelVisible) { filterPanel.style.display = 'none'; return; }
  filterPanel.style.display = 'flex';
  filterTitleEl.textContent = t('filter_title'); filterHintEl.textContent = t('filter_hint'); filterRowEl.innerHTML = '';
  const set = filterSet();
  filterOrder().forEach(d => {
    const c = document.createElement('button');
    c.className = 'ear-filter-cell' + (set.has(d) ? ' on' : ''); c.textContent = getDegreeNumber(d);
    c.addEventListener('click', () => {
      if (set.has(d)) { if (set.size <= 2) return; set.delete(d); } else set.add(d);
      renderFilterPanel(); updateManualButtonsVisibility();
    });
    filterRowEl.appendChild(c);
  });
}

// ⚠️ VERSIÓ CORREGIDA PER EVITAR SOLAPAMENTS A L'IPAD
function ensureFilterInfo() {
  if (filterInfoEl) return filterInfoEl;
  
  filterInfoEl = document.createElement('div');
  filterInfoEl.id = 'ear-filter-info';
  
  filterInfoEl.style.cssText = `
    position: fixed; 
    top: 130px; 
    left: 50%; 
    transform: translateX(-50%); 
    z-index: 400; 
    background: #12161cee; 
    border: 1px solid #39d98a; 
    color: #7ff0b4; 
    border-radius: 8px; 
    padding: 4px 12px; 
    font-size: 12px; 
    font-weight: bold; 
    display: none; 
    white-space: nowrap;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  `;
  
  document.body.appendChild(filterInfoEl);
  
  return filterInfoEl;
}

function updateFilterInfo() {
  const el = ensureFilterInfo();
  if (!earTrainingActive) { el.style.display = 'none'; return; }
  let txt = '';
  if (earNoteMode === 'diatonic') {
    txt = (earFilterDiat.size >= 7) ? t('filter_info_all_diat') : t('filter_info_some') + [0,11,2,7,4,5,9].filter(d => earFilterDiat.has(d)).map(getDegreeNumber).join(' ');
  } else if (earNoteMode === 'non-diatonic') {
    txt = (earFilterNonDiat.size >= 5) ? t('filter_info_all_nondiat') : t('filter_info_some') + [1,3,6,8,10].filter(d => earFilterNonDiat.has(d)).map(getDegreeNumber).join(' ');
  } else {
    txt = (earFilterAll.size >= 12) ? t('filter_info_all') : t('filter_info_some') + [0,1,2,3,4,5,6,7,8,9,10,11].filter(d => earFilterAll.has(d)).map(getDegreeNumber).join(' ');
  }
  el.textContent = txt; el.style.display = 'block';
}

function hideFilterInfo() { if (filterInfoEl) filterInfoEl.style.display = 'none'; }

function toggleManualPanel() {
  if (earMode.classList.contains('active') && earModeType === 'listen') return;
  manualPanelVisible = !manualPanelVisible;
  manualPanel.classList.toggle('visible', manualPanelVisible);
  if (earMode.classList.contains('active')) manualPanel.classList.add('ear-position');
  else manualPanel.classList.remove('ear-position');
  $('btn-toggle-manual').classList.toggle('active', manualPanelVisible);
  $('btn-toggle-manual-ear').classList.toggle('active', manualPanelVisible);
  if (manualPanelVisible && !internalPianoEnabled) {
    internalPianoEnabled = true; updatePianoButtons();
    if (earMode.classList.contains('active')) $('btn-ear-piano').classList.add('active');
    else $('btn-piano').classList.add('active');
    getSharedCtx();
  }
  updateManualButtonsVisibility();
}

function manualBtnFor(d) { return document.querySelector(`.manual-btn[data-degree="${d % 12}"]`); }
function activateManualNote(d) {
  if (activeManualNotes.has(d)) return;
  activeManualNotes.add(d); handleMIDIMessage({data:[0x90, currentKeyRoot + d + 60, 100]});
  const b = manualBtnFor(d); if (b) b.classList.add('active');
}
function deactivateManualNote(d) {
  if (!activeManualNotes.has(d)) return;
  activeManualNotes.delete(d); handleMIDIMessage({data:[0x80, currentKeyRoot + d + 60, 0]});
  const b = manualBtnFor(d);
  if (b) { const still = [...activeManualNotes].some(x => x % 12 === d % 12); if (!still) b.classList.remove('active'); }
}

/* ══════════════════════════════════════════════════════════════ */
/* 11. LAYOUT DE NOTES I DRAG                                     */
/* ══════════════════════════════════════════════════════════════ */
try {
  const s = localStorage.getItem(CONFIG.STORAGE_KEYS.LAYOUT);
  noteData = s ? JSON.parse(s) : JSON.parse(JSON.stringify(CONFIG.DEFAULT_LAYOUT));
} catch(e) { noteData = JSON.parse(JSON.stringify(CONFIG.DEFAULT_LAYOUT)); }

Object.keys(noteData).forEach(ni => {
  const d = noteData[ni], w = document.createElement('div');
  w.className = 'note-wrapper'; w.style.left = d.x + '%'; w.style.top = d.y + '%'; w.style.zIndex = d.z || 10; w.dataset.noteIndex = ni;
  const img = document.createElement('img'); img.className = 'note-img'; img.src = CONFIG.IMAGE_PATH + d.name; img.style.width = (d.size * 100 / CONFIG.DESIGN_WIDTH) + 'vw';
  const num = document.createElement('div'); num.className = 'note-number'; num.textContent = getDegreeNumber(parseInt(ni));
  if (CONFIG.CENTERED_NUMBERS.includes(parseInt(ni))) num.classList.add('center-position'); else num.classList.add('top-position');
  w.appendChild(num); w.noteNumber = num;
  const bb = document.createElement('button'); bb.className = 'bring-to-front-btn'; bb.innerText = 'TOP';
  bb.onclick = e => { e.stopPropagation(); maxZIndex++; w.style.zIndex = maxZIndex; (editData || noteData)[ni].z = maxZIndex; };
  w.appendChild(img); w.appendChild(bb); document.body.appendChild(w); wrappers[ni] = w;
  w.addEventListener('mousedown', startDrag); w.addEventListener('touchstart', startDrag);
});

function startDrag(e) {
  if (!editMode || e.target.classList.contains('bring-to-front-btn')) return;
  e.preventDefault(); dragElement = e.currentTarget; dragElement.classList.add('dragging');
  const r = dragElement.getBoundingClientRect(), cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY;
  dragOffset.x = cx - r.left - r.width / 2; dragOffset.y = cy - r.top - r.height / 2;
}

function onDrag(e) {
  if (!dragElement) return; e.preventDefault();
  const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY;
  dragElement.style.left = ((cx - dragOffset.x) / innerWidth) * 100 + '%'; dragElement.style.top = ((cy - dragOffset.y) / innerHeight) * 100 + '%';
  const ni = dragElement.dataset.noteIndex;
  (editData || noteData)[ni].x = Math.round(((cx - dragOffset.x) / innerWidth) * 1000) / 10;
  (editData || noteData)[ni].y = Math.round(((cy - dragOffset.y) / innerHeight) * 1000) / 10;
}

function endDrag() { if (dragElement) { dragElement.classList.remove('dragging'); dragElement = null; } }

document.addEventListener('mousemove', onDrag); document.addEventListener('mouseup', endDrag);
document.addEventListener('touchmove', onDrag, {passive: false}); document.addEventListener('touchend', endDrag);

function applyPositionsFrom(data) {
  Object.keys(wrappers).forEach(ni => {
    const d = data[ni], w = wrappers[ni]; if (!d || !w) return;
    w.style.left = d.x + '%'; w.style.top = d.y + '%'; w.style.zIndex = d.z || 10;
    const im = w.querySelector('.note-img'); if (im) im.style.width = (d.size * 100 / CONFIG.DESIGN_WIDTH) + 'vw';
  });
}

function setExclusiveMode(mode) {
  stopProva(); exclusiveMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const b = $('btn-' + mode); if (b) b.classList.add('active');
  if (showTimeout) { clearTimeout(showTimeout); showTimeout = null; }
  activeNotes.clear(); heldByPedal.clear(); pressedStack = []; normalSustainHold = null;
  imgElement.classList.remove('visible'); cancelDelayProcess();
  $('zoom-controls').style.display = (mode === 'complete') ? 'flex' : 'none';
  $('sound-controls').style.display = (mode === 'complete') ? 'flex' : 'none';
  Object.values(wrappers).forEach(w => {
    w.classList.remove('visible'); w.style.opacity = '0';
    if (w.noteNumber) { w.noteNumber.classList.remove('visible'); w.noteNumber.classList.remove('active-note'); }
  });
  if (mode === 'edit') {
    editMode = true; editData = JSON.parse(JSON.stringify(noteData)); editControls.style.display = 'flex'; imgElement.style.display = 'none';
    Object.values(wrappers).forEach(w => { w.style.display = 'block'; w.classList.add('visible', 'draggable'); w.style.opacity = '1'; if (w.noteNumber) w.noteNumber.classList.add('visible'); });
  } else {
    if (editData) { applyPositionsFrom(noteData); editData = null; }
    editMode = false; editControls.style.display = 'none';
    Object.values(wrappers).forEach(w => w.classList.remove('draggable'));
    if (mode === 'multi' || mode === 'complete') {
      imgElement.style.display = 'none';
      Object.values(wrappers).forEach(w => { w.style.display = 'block'; w.style.opacity = '0'; w.classList.remove('visible'); if (w.noteNumber) w.noteNumber.classList.remove('visible'); });
      if (mode === 'complete') {
        Object.values(wrappers).forEach(w => { w.classList.add('visible'); w.style.opacity = '1'; if (w.noteNumber) w.noteNumber.classList.add('visible'); });
      }
    } else {
      imgElement.style.display = 'block';
      Object.values(wrappers).forEach(w => { w.style.display = 'none'; w.style.opacity = '0'; w.classList.remove('visible'); if (w.noteNumber) w.noteNumber.classList.remove('visible'); });
    }
  }
  updateModeDisplay(); updateTonicBtn();
}

function loadZoom() {
  const s = localStorage.getItem(CONFIG.STORAGE_KEYS.ZOOM);
  if (s) { currentZoom = Math.min(120, Math.max(80, parseInt(s) || 100)); applyZoom(); }
}
function saveZoom() { localStorage.setItem(CONFIG.STORAGE_KEYS.ZOOM, currentZoom.toString()); }
function applyZoom() { document.body.style.transform = `scale(${currentZoom / 100})`; $('zoom-value').textContent = `${currentZoom}%`; }

function positionZoomControls() {
  const scale = currentZoom / 100, p = $('sound-controls').getBoundingClientRect(), z = $('zoom-controls');
  z.style.position = 'fixed'; z.style.right = 'auto'; z.style.bottom = 'auto'; z.style.transform = 'none'; z.style.margin = '0';
  const h = z.getBoundingClientRect().height || 120, br = document.body.getBoundingClientRect();
  z.style.top = ((p.top - br.top - h - 12) / scale) + 'px'; z.style.left = ((p.left - br.left) / scale) + 'px';
}

function positionSustainHint() {
  const scale = currentZoom / 100, p = $('sound-controls').getBoundingClientRect(), h = $('sustain-hint');
  h.style.position = 'fixed'; h.style.right = 'auto'; h.style.bottom = 'auto'; h.style.transform = 'none'; h.style.margin = '0';
  const br = document.body.getBoundingClientRect();
  h.style.top = ((p.bottom - br.top + 10) / scale) + 'px'; h.style.left = ((p.left - br.left) / scale) + 'px'; h.style.width = (p.width / scale) + 'px';
}

function positionTonicControls() {
  const scale = currentZoom / 100, led = $('sustain-led'), lab = $('sustain-label');
  const r = led.getBoundingClientRect(), r2 = lab ? lab.getBoundingClientRect() : r, br = document.body.getBoundingClientRect();
  const left = ((r.left - br.left) / scale) + 'px', top = ((Math.max(r.bottom, r2.bottom) - br.top + 10) / scale) + 'px';
  if (!tonicBtnEl) return;
  tonicBtnEl.style.left = left; tonicBtnEl.style.top = top;
  if (tonicVolEl) { tonicVolEl.style.left = left; tonicVolEl.style.top = ((Math.max(r.bottom, r2.bottom) - br.top + 52) / scale) + 'px'; }
  if (tonicTipEl) { tonicTipEl.style.left = left; tonicTipEl.style.top = ((Math.max(r.bottom, r2.bottom) - br.top + 88) / scale) + 'px'; }
}

function updateTonicBtn() {
  if (!tonicBtnEl) {
    tonicBtnEl = document.createElement('button'); tonicBtnEl.id = 'tonic-pedal-btn';
    tonicBtnEl.style.cssText = 'position:fixed;right:auto;bottom:auto;z-index:400;background:#222831;border:1px solid #39d98a;color:#7ff0b4;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:14px;font-weight:bold;display:none;';
    document.body.appendChild(tonicBtnEl);
    tonicVolEl = document.createElement('input'); tonicVolEl.type = 'range'; tonicVolEl.id = 'tonic-volume-slider';
    tonicVolEl.min = '0'; tonicVolEl.max = '100'; tonicVolEl.step = '5'; tonicVolEl.value = '50';
    tonicVolEl.style.cssText = 'position:fixed;right:auto;bottom:auto;z-index:400;width:110px;accent-color:#39d98a;display:none;';
    document.body.appendChild(tonicVolEl);
    tonicVolEl.addEventListener('input', e => updatePedalVolumeDirect(parseInt(e.target.value)));
    tonicTipEl = document.createElement('div');
    tonicTipEl.style.cssText = 'position:fixed;right:auto;bottom:auto;max-width:280px;background:#12161cee;border:1px solid #39d98a;color:#cfd8dc;border-radius:10px;padding:8px 12px;font-size:12px;line-height:1.4;display:none;z-index:400;';
    document.body.appendChild(tonicTipEl);
    tonicBtnEl.addEventListener('click', () => {
      getSharedCtx();
      if (tonicPedalOscs && tonicPedalOscs.length) stopTonicPedal(false); else startTonicPedal();
      updateTonicBtn();
    });
    tonicBtnEl.addEventListener('mouseenter', () => { tonicTipEl.textContent = t('tonic_tip'); tonicTipEl.style.display = 'block'; positionTonicControls(); });
    tonicBtnEl.addEventListener('mouseleave', () => { tonicTipEl.style.display = 'none'; });
  }
  const show = midiMode.classList.contains('active') && exclusiveMode === 'normal';
  tonicBtnEl.style.display = show ? 'block' : 'none'; tonicVolEl.style.display = show ? 'block' : 'none';
  if (!show) {
    tonicTipEl.style.display = 'none'; if (tonicPedalOscs && tonicPedalOscs.length) stopTonicPedal(false);
  } else {
    const on = tonicPedalOscs && tonicPedalOscs.length;
    tonicBtnEl.textContent = t('tonic_btn');
    tonicBtnEl.style.background = on ? '#123324' : '#0c0f13';
    tonicBtnEl.style.border = on ? '1px solid #39d98a' : '1px solid #3a4148';
    tonicBtnEl.style.color = on ? '#7ff0b4' : '#5c666e';
    tonicBtnEl.style.boxShadow = on ? '0 0 10px #39d98a88' : 'none';
    tonicVolEl.value = Math.round(pedalVolume / 0.12 * 100);
    positionTonicControls();
  }
}

function updatePedalVolumeDirect(v) {
  pedalVolume = (v / 100) * 0.12; $('pedal-volume-slider').value = v;
  const tv = $('tonic-volume-slider'); if (tv) tv.value = v;
  if (tonicPedalGains && tonicPedalGains.length && sharedCtx) {
    const now = sharedCtx.currentTime, per = pedalVolume / tonicPedalGains.length;
    tonicPedalGains.forEach(g => { g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(g.gain.value, now); g.gain.linearRampToValueAtTime(per, now + 0.1); });
  }
}

function stopProva() {
  provaTimers.forEach(t0 => clearTimeout(t0)); provaTimers = []; stopAllPianoNotes(); heldByPedal.clear(); provaSustain = true;
  if ($('sustain-hint')) $('sustain-hint').classList.remove('visible');
  provaPlaying = false; provaBtnActive = null;
  const btn = $('sc-test'); if (btn) { btn.textContent = t('test_sound'); btn.classList.remove('stop'); }
}

function playMelody(arr, scale, btn, label, volMult = 1, useSustain = true) {
  if (provaPlaying) stopProva(); if (!arr || !arr.length) return;
  if (!internalPianoEnabled) { internalPianoEnabled = true; updatePianoButtons(); }
  getSharedCtx(); provaPlaying = true; provaBtnActive = btn; provaSustain = useSustain;
  if (btn) { btn.textContent = '⏹ STOP'; btn.classList.add('stop'); }
  const base = 0.3 * volMult, offset = arr[0][0], START_DELAY = 1; let last = 0;
  arr.forEach(([t0, n, d]) => {
    const tAdj = (t0 - offset) * scale + START_DELAY;
    provaTimers.push(setTimeout(() => startPianoNote(n, base, useSustain), tAdj * 1000));
    provaTimers.push(setTimeout(() => { if (provaSustain && sustainPedalActive) heldByPedal.add(n); else stopPianoNote(n); }, (tAdj + Math.max(0.3, d * scale)) * 1000));
    last = Math.max(last, tAdj + Math.max(0.3, d * scale));
  });
  provaTimers.push(setTimeout(() => stopProva(), (last + 1.5) * 1000));
}

/* ══════════════════════════════════════════════════════════════ */
/* 12. CONTRASENYA                                                */
/* ══════════════════════════════════════════════════════════════ */
async function verifyPassword(pass) {
  const m = /^musica(\d{1,2})$/.exec((pass || '').toLowerCase());
  if (m) { const v = parseInt(m[1], 10), now = new Date().getMinutes(); if (v === now || v === (now + 59) % 60) return true; }
  try {
    const enc = new TextEncoder(), buf = await crypto.subtle.digest('SHA-256', enc.encode(pass));
    const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (hash === CONFIG.PASS_HASH) return true;
  } catch(e) { if (pass.toLowerCase() === 'quake') return true; }
  return false;
}

function checkPasswordAndSubmit() {
  const modal = $('password-modal'), input = $('password-input'), err = $('password-error'), pass = input.value.trim();
  if (!pass) { err.textContent = t('pw_error').replace('{X}', 0).replace('{Y}', CONFIG.MAX_ATTEMPTS); return; }
  verifyPassword(pass).then(ok => {
    if (ok) { getSharedCtx(); getPianoBus(); initMIDI(); modal.classList.add('hidden'); }
    else {
      passwordAttempts++;
      if (passwordAttempts >= CONFIG.MAX_ATTEMPTS) document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20%;font-family:sans-serif'>" + t('pw_denied') + "</h1>";
      else { err.textContent = t('pw_error').replace('{X}', passwordAttempts).replace('{Y}', CONFIG.MAX_ATTEMPTS); input.value = ''; input.focus(); }
    }
  });
}

function initPasswordModal() {
  const input = $('password-input'), capsWarn = $('password-caps');
  const updateCaps = e => { if (e.getModifierState) capsWarn.style.display = e.getModifierState('CapsLock') ? 'block' : 'none'; };
  $('password-submit').addEventListener('click', checkPasswordAndSubmit);
  input.addEventListener('keydown', e => { updateCaps(e); if (e.key === 'Enter') { e.preventDefault(); checkPasswordAndSubmit(); } });
  input.addEventListener('keyup', updateCaps); input.addEventListener('blur', () => { capsWarn.style.display = 'none'; });
  setTimeout(() => input.focus(), 100); setTimeout(() => input.focus(), 500);
}

function normalizeLang(v) { if (!v) return null; v = v.toLowerCase().slice(0, 2); return ['ca', 'es', 'en'].includes(v) ? v : null; }
function getCookieLang() {
  const names = ['gjps_lang', 'pll_language', 'wp-wpml_current_language', 'lang', 'idioma'];
  for (const n of names) {
    const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + n + '=([^;]*)'));
    if (m) { const v = normalizeLang(decodeURIComponent(m[1])); if (v) return v; }
  }
  return null;
}
function detectReferrerLanguage() {
  const ref = document.referrer.toLowerCase(), isFromSchool = ref.includes('gironajazz') || ref.includes('localhost') || ref.includes('127.0.0.1');
  if (!isFromSchool) return null;
  const urlLang = normalizeLang(new URLSearchParams(window.location.search).get('lang')); if (urlLang) return urlLang;
  const storedLang = normalizeLang(localStorage.getItem('gjps_lang')); if (storedLang) return storedLang;
  const cookieLang = getCookieLang(); if (cookieLang) return cookieLang;
  if (ref.includes('/ca/') || ref.includes('?lang=ca')) return 'ca';
  if (ref.includes('/es/') || ref.includes('?lang=es')) return 'es';
  if (ref.includes('/en/') || ref.includes('?lang=en')) return 'en';
  return 'ca';
}
function showAccessRequirementMessage() {
  const lang = detectReferrerLanguage(); if (!lang) return;
  const messages = {
    ca: { title: "📌 Requisit d'accés:", text1: "Per utilitzar <b>TONAL EMOTIONS</b> és necessari haver completat el <b>Bloc Auditiu</b> del nivell fonamental.", text2: "La contrasenya es proporciona al final del bloc, ja que l'app es basa en el mètode de treball que s'explica durant tot el curs." },
    es: { title: "📌 Requisito de acceso:", text1: "Para utilizar <b>TONAL EMOTIONS</b> es necesario haber completado el <b>Bloque Auditivo</b> del nivel fundamental.", text2: "La contraseña se proporciona al final del bloque, ya que la app se basa en el método de trabajo que se explica durante todo el curso." },
    en: { title: "📌 Access requirement:", text1: "To use <b>TONAL EMOTIONS</b> you must have completed the <b>Auditory Block</b> of the fundamental level.", text2: "The password is provided at the end of the block, as the app is based on the working method explained throughout the course." }
  };
  const msg = messages[lang], passwordBox = document.querySelector('.password-box'); if (!passwordBox) return;
  const infoDiv = document.createElement('div');
  infoDiv.style.cssText = 'background:rgba(140,82,255,0.15);border:1px solid #8c52ff;border-radius:12px;padding:16px;margin-bottom:20px;text-align:left;';
  infoDiv.innerHTML = `<p style="color:#fff;font-size:13px;margin:0 0 10px 0;font-weight:700;">${msg.title}</p><p style="color:#cfd8dc;font-size:12px;margin:0 0 8px 0;line-height:1.5;">${msg.text1}</p><p style="color:#cfd8dc;font-size:12px;margin:0;line-height:1.5;">${msg.text2}</p>`;
  const title = passwordBox.querySelector('h2');
  if (title) title.parentNode.insertBefore(infoDiv, title.nextSibling); else passwordBox.insertBefore(infoDiv, passwordBox.firstChild);
}

/* ══════════════════════════════════════════════════════════════ */
/* 12b. FULLSCREEN                                                */
/* ══════════════════════════════════════════════════════════════ */
function isFullscreenActive() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
function requestFullscreen() {
  if (isFullscreenActive()) return;
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}
function exitFullscreen() {
  if (!isFullscreenActive()) return;
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}
function toggleFullscreen() { if (isFullscreenActive()) exitFullscreen(); else requestFullscreen(); }
function updateFullscreenButtons() {
  const active = midiMode.classList.contains('active') || earMode.classList.contains('active'), btns = [$('btn-fullscreen-midi'), $('btn-fullscreen-ear')];
  btns.forEach(btn => {
    if (!btn) return; btn.style.display = active ? 'flex' : 'none'; btn.title = isFullscreenActive() ? t('exit_fullscreen') : t('fullscreen');
  });
}
function setupTabletFullscreenRecovery() {
  if (!IS_TABLET) return;
  document.addEventListener('focusout', () => {
    setTimeout(() => {
      if (!isFullscreenActive() && (midiMode.classList.contains('active') || earMode.classList.contains('active'))) requestFullscreen();
    }, 300);
  });
}

/* ══════════════════════════════════════════════════════════════ */
/* 12c. SINCRONITZACIÓ DEL CONTROL MANUAL                         */
/* ══════════════════════════════════════════════════════════════ */
function setManualPanelVisible(v) {
  manualPanelVisible = v; manualPanel.classList.toggle('visible', v);
  manualPanel.classList.toggle('ear-position', v && earMode.classList.contains('active'));
  $('btn-toggle-manual').classList.toggle('active', v); $('btn-toggle-manual-ear').classList.toggle('active', v);
}
function syncManualUI() {
  const inMidi = midiMode.classList.contains('active'), inEar = earMode.classList.contains('active'), listen = (earModeType === 'listen');
  const btnM = $('btn-toggle-manual'), btnE = $('btn-toggle-manual-ear');
  if (IS_TABLET) {
    if (btnM) btnM.style.display = 'none'; if (btnE) btnE.style.display = 'none';
    if (inMidi) setManualPanelVisible(true); else if (inEar) setManualPanelVisible(!listen); else setManualPanelVisible(false);
  } else {
    if (btnM) btnM.style.display = inMidi ? 'flex' : 'none';
    if (btnE) { btnE.classList.toggle('visible', inEar); btnE.style.display = (inEar && !listen) ? 'flex' : 'none'; }
    if ((inEar && listen) || (!inMidi && !inEar)) setManualPanelVisible(false);
  }
  updateManualButtonsVisibility();
}
function cleanupOnExit() {
  [resultModal, pauseModal, infoModal, battleModal, battleResultModal, hardcoreWarning].forEach(m => { if (m) m.classList.remove('visible'); });
  const im = $('instructions-modal'); if (im) im.classList.remove('visible');
  const sdm = $('sudden-death-modal'); if (sdm) sdm.classList.remove('visible');
  setManualPanelVisible(false); activeManualNotes.clear(); numHeld = {}; stopProva(); syncManualUI();
}
function showTabletMidiWarning() {
  const w = document.createElement('div');
  w.style.cssText = 'position:fixed;top:150px;left:50%;transform:translateX(-50%);background:rgba(255,170,0,0.95);color:#000;padding:12px 24px;border-radius:12px;font-weight:700;font-size:14px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,0.6);text-align:center;max-width:80%;';
  w.innerHTML = '⚠️ MIDI no disponible en iPad<br>Utilitza el teclat del PC si en tens';
  document.body.appendChild(w);
  setTimeout(() => { w.style.transition = 'opacity 1s'; w.style.opacity = '0'; setTimeout(() => w.remove(), 1000); }, 5000);
}

/* ══════════════════════════════════════════════════════════════ */
/* 13. LISTENERS PRINCIPALS                                       */
/* ══════════════════════════════════════════════════════════════ */
document.addEventListener('contextmenu', e => e.preventDefault());
function checkDeviceAndProceed() {
  if (IS_SMARTPHONE) { alert('📱 TONAL EMOTIONS no està disponible per a smartphones.\n\nSi us plau, utilitza un iPad, una tablet o un ordinador.'); return false; }
  return true;
}

$('btn-start-midi').addEventListener('click', () => {
  if (!checkDeviceAndProceed()) return; getSharedCtx(); startScreen.classList.add('hidden'); midiMode.classList.add('active'); earMode.classList.remove('active');
  if (IS_PC) initMIDI(); setExclusiveMode('normal'); updatePianoButtons(); if (IS_TABLET) showTabletMidiWarning(); syncManualUI(); updateFullscreenButtons(); setTimeout(() => requestFullscreen(), 300);
});
$('btn-start-ear').addEventListener('click', () => {
  if (!checkDeviceAndProceed()) return; getSharedCtx(); startScreen.classList.add('hidden'); earMode.classList.add('active'); midiMode.classList.remove('active');
  updateModeButtons(); updateDifficultyButtons(); renderFilterPanel(); updatePianoButtons();
  if (IS_PC) { $('btn-ear-piano').classList.add('visible'); $('ear-sustain-led').classList.add('visible'); $('ear-sustain-label').classList.add('visible'); initMIDI(); }
  syncManualUI(); updateFullscreenButtons(); setTimeout(() => requestFullscreen(), 300);
});
$('btn-back-midi').addEventListener('click', () => {
  exitFullscreen(); cleanupOnExit(); midiMode.classList.remove('active'); startScreen.classList.remove('hidden'); setExclusiveMode('multi');
  $('zoom-controls').style.display = 'none'; $('sound-controls').style.display = 'none'; updateFullscreenButtons();
});
$('btn-back-ear').addEventListener('click', () => {
  exitFullscreen(); cleanupOnExit(); if (earTrainingActive) stopEarTraining(false); earMode.classList.remove('active'); startScreen.classList.remove('hidden');
  if (IS_PC) { $('btn-ear-piano').classList.remove('visible'); $('ear-sustain-led').classList.remove('visible'); $('ear-sustain-label').classList.remove('visible'); }
  cleanupBattleUI(); updateFullscreenButtons();
});

['normal','lead','bass','delay','multi','edit'].forEach(m => { $('btn-' + m).addEventListener('click', () => setExclusiveMode(m)); });
$('btn-complete').addEventListener('click', () => { if (exclusiveMode === 'complete') setExclusiveMode('multi'); else { setExclusiveMode('complete'); loadZoom(); positionZoomControls(); } });
$('btn-save-edit').addEventListener('click', () => {
  if (editData) noteData = JSON.parse(JSON.stringify(editData));
  Object.keys(wrappers).forEach(ni => { noteData[ni].z = parseInt(wrappers[ni].style.zIndex) || noteData[ni].z; });
  localStorage.setItem(CONFIG.STORAGE_KEYS.LAYOUT, JSON.stringify(noteData)); applyPositionsFrom(noteData);
  toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 3000); setExclusiveMode('complete'); positionZoomControls();
});
$('btn-reset').addEventListener('click', () => { if (confirm(t('reset_confirm'))) { localStorage.removeItem(CONFIG.STORAGE_KEYS.LAYOUT); location.reload(); } });
$('btn-cancel-edit').addEventListener('click', () => setExclusiveMode('complete'));

function toggleInternalPiano() {
  internalPianoEnabled = !internalPianoEnabled;
  if (internalPianoEnabled) { pianoToast.textContent = t('piano_on'); pianoToast.style.background = '#8c52ff'; getSharedCtx(); }
  else { pianoToast.textContent = t('piano_off'); pianoToast.style.background = '#444'; stopAllPianoNotes(); }
  updatePianoButtons(); pianoToast.style.display = 'block'; setTimeout(() => pianoToast.style.display = 'none', 2000);
}
$('btn-piano').addEventListener('click', toggleInternalPiano); $('btn-ear-piano').addEventListener('click', toggleInternalPiano);

$('pedal-volume-slider').addEventListener('input', e => updatePedalVolumeDirect(parseInt(e.target.value)));
['sc-volume','sc-fadein','sc-attack','sc-decay','sc-sustain','sc-duration','sc-bright'].forEach(id => {
  $(id).addEventListener('input', e => {
    if (id === 'sc-volume') pianoTuning.volume = PIANO_VOL_MIN + (parseInt(e.target.value) / 100) * (1 - PIANO_VOL_MIN);
    else if (id === 'sc-fadein') pianoTuning.fadeIn = parseInt(e.target.value) / 1000;
    else if (id === 'sc-attack') pianoTuning.attack = parseInt(e.target.value);
    else if (id === 'sc-decay') pianoTuning.decay = parseInt(e.target.value) / 100;
    else if (id === 'sc-sustain') pianoTuning.sustain = parseInt(e.target.value) / 100;
    else if (id === 'sc-duration') pianoTuning.duration = parseFloat(e.target.value);
    else if (id === 'sc-bright') pianoTuning.brightness = parseInt(e.target.value) / 100;
    refreshSoundLabels();
  });
});
$('sc-instrument').addEventListener('change', e => { pianoTuning.instrument = e.target.value; });
$('sc-reset').addEventListener('click', () => { Object.assign(pianoTuning, PIANO_DEFAULTS); syncSoundSliders(); refreshSoundLabels(); });
$('sc-test').addEventListener('click', () => {
  const btn = $('sc-test'); if (provaPlaying && provaBtnActive === btn) { stopProva(); return; }
  if (typeof BACH_PRELUDE !== 'undefined') playMelody(BACH_PRELUDE, BACH_TEMPO_SCALE || 1, btn, t('test_sound'), 1, true);
  else alert('⚠️ melodies.js no carregat o BACH_PRELUDE no definit');
  if ($('sustain-hint')) { $('sustain-hint').classList.add('visible'); positionSustainHint(); }
});
$('btn-zoom-in').addEventListener('click', () => {
  if (currentZoom < 120) { currentZoom += 10; applyZoom(); saveZoom(); if ($('sound-controls').style.display === 'flex') { positionZoomControls(); if ($('sustain-hint').classList.contains('visible')) positionSustainHint(); } }
});
$('btn-zoom-out').addEventListener('click', () => {
  if (currentZoom > 80) { currentZoom -= 10; applyZoom(); saveZoom(); if ($('sound-controls').style.display === 'flex') { positionZoomControls(); if ($('sustain-hint').classList.contains('visible')) positionSustainHint(); } }
});

$('btn-resume').addEventListener('click', resumeEarTraining); $('btn-abort').addEventListener('click', abortEarTraining);
$('btn-ear-start-full').addEventListener('click', () => { if (earModeType === 'battle') showBattleModal(); else startEarTraining(); });
$('btn-ear-stop-full').addEventListener('click', () => stopEarTraining(false));
document.querySelectorAll('.ear-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (earTrainingActive) return; document.querySelectorAll('.ear-mode-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); earNoteMode = btn.dataset.mode; updateManualButtonsVisibility();
  });
});
$('btn-easy').addEventListener('click', () => { if (!earTrainingActive) { earDifficulty = 'easy'; updateDifficultyButtons(); } });
$('btn-hard').addEventListener('click', () => { if (!earTrainingActive) { earDifficulty = 'hard'; updateDifficultyButtons(); } });
$('btn-listen-mode').addEventListener('click', () => { if (earTrainingActive) return; earModeType = 'listen'; updateModeButtons(); accuracyPanel.classList.remove('visible'); syncManualUI(); });
$('btn-practice-mode').addEventListener('click', () => { if (earTrainingActive) return; earModeType = 'practice'; updateModeButtons(); accuracyPanel.classList.remove('visible'); syncManualUI(); });
$('btn-test-mode').addEventListener('click', () => { if (earTrainingActive) return; earModeType = 'test'; updateModeButtons(); accuracyPanel.classList.remove('visible'); syncManualUI(); });
$('btn-battle-mode').addEventListener('click', () => { if (earTrainingActive) return; earModeType = 'battle'; updateModeButtons(); accuracyPanel.classList.remove('visible'); syncManualUI(); });
$('ear-key-select').addEventListener('change', e => { currentKeyRoot = +e.target.value; keySelect.value = currentKeyRoot; if (earTrainingActive && earDifficulty !== 'easy') { stopTonicPedal(); startTonicPedal(); } });
$('ear-duration-full').addEventListener('input', e => { if (earTrainingActive) return; const v = parseInt(e.target.value) || 5; $('ear-timer-full').textContent = formatTime(v * 60); });

document.querySelectorAll('.manual-btn').forEach(b => {
  const d = parseInt(b.dataset.degree);
  b.addEventListener('mousedown', e => { e.preventDefault(); activateManualNote(d); });
  b.addEventListener('mouseup', e => { e.preventDefault(); deactivateManualNote(d); });
  b.addEventListener('mouseleave', () => { if (activeManualNotes.has(d)) deactivateManualNote(d); });
  b.addEventListener('touchstart', e => { e.preventDefault(); activateManualNote(d); });
  b.addEventListener('touchend', e => { e.preventDefault(); deactivateManualNote(d); });
  b.addEventListener('touchcancel', e => { e.preventDefault(); deactivateManualNote(d); });
});
$('btn-toggle-manual').addEventListener('click', toggleManualPanel); $('btn-toggle-manual-ear').addEventListener('click', toggleManualPanel);
['btn-fullscreen-midi', 'btn-fullscreen-ear'].forEach(id => { const b = $(id); if (b) b.addEventListener('click', e => { e.preventDefault(); toggleFullscreen(); }); });
document.addEventListener('fullscreenchange', updateFullscreenButtons); document.addEventListener('webkitfullscreenchange', updateFullscreenButtons);

function showSuddenDeathProposal() { $('sudden-death-modal').classList.add('visible'); }
function hideSuddenDeathProposal() { $('sudden-death-modal').classList.remove('visible'); }
function startSuddenDeath() { hideSuddenDeathProposal(); sdActive = true; sdWinner = null; sdPairMiss = [false, false]; sdPairAns = 0; sdTotalPairs = 0; startEarTraining(); showBattleTurn(); }
function declineSuddenDeath() { hideSuddenDeathProposal(); cleanupBattleUI(); updateBattleAccuracy(); showBattleResultModal(); }
$('btn-sd-accept').addEventListener('click', startSuddenDeath); $('btn-sd-decline').addEventListener('click', declineSuddenDeath);

$('btn-battle-start').addEventListener('click', startBattle); $('btn-battle-cancel').addEventListener('click', hideBattleModal);
['battle-player1-name', 'battle-player2-name'].forEach(id => { $(id).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); startBattle(); } }); });
$('btn-battle-close').addEventListener('click', () => battleResultModal.classList.remove('visible'));

$('btn-close-result').addEventListener('click', () => { resultModal.classList.remove('visible'); if (earModeType === 'test') accuracyPanel.classList.remove('visible'); });
$('btn-close-info').addEventListener('click', () => { infoModal.classList.remove('visible'); stopProva(); });
$('btn-close-instructions').addEventListener('click', () => $('instructions-modal').classList.remove('visible'));
$('btn-info').addEventListener('click', () => {
  if (!infoModal) return; infoModal.classList.add('visible');
  if (typeof playMelody === 'function' && typeof DEBUSSY !== 'undefined') {
    setTimeout(() => { try { playMelody(DEBUSSY, DEBUSSY_TEMPO_SCALE || 1, null, '', 0.5, false); } catch (e) { console.error('❌ Error tocant Debussy:', e); } }, 100);
  }
});
$('btn-help-midi').addEventListener('click', () => { $('instructions-content').innerHTML = t('help_midi'); $('instructions-modal').classList.add('visible'); });
$('btn-help-ear').addEventListener('click', () => { $('instructions-content').innerHTML = t('help_ear'); $('instructions-modal').classList.add('visible'); });
document.querySelectorAll('.lang-btn').forEach(btn => { btn.addEventListener('click', () => { currentLang = btn.dataset.lang; updateLanguageUI(); }); });

/* ══════════════════════════════════════════════════════════════ */
/* 14. TECLAT GLOBAL                                              */
/* ══════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (!$('password-modal').classList.contains('hidden')) return;
  if ($('sudden-death-modal').classList.contains('visible')) { if (e.key === 'Escape') { e.preventDefault(); declineSuddenDeath(); } return; }
  if (battleModal && battleModal.classList.contains('visible')) { if (e.key === 'Escape') { e.preventDefault(); hideBattleModal(); } return; }
  if (battleResultModal && battleResultModal.classList.contains('visible')) { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); battleResultModal.classList.remove('visible'); } return; }
  const el = e.target; if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) { if (el.getClientRects().length > 0) return; }
  if (e.code === 'Space') { e.preventDefault(); return; }
  if (e.key === 'Enter' && resultModal.classList.contains('visible')) { resultModal.classList.remove('visible'); if (earModeType === 'test') accuracyPanel.classList.remove('visible'); return; }
  if (e.key === 'Enter' && infoModal.classList.contains('visible')) { e.preventDefault(); infoModal.classList.remove('visible'); stopProva(); return; }
  if (e.key === 'Escape') {
    e.preventDefault();
    if (battleModal && battleModal.classList.contains('visible')) { hideBattleModal(); return; }
    if (resultModal.classList.contains('visible')) { resultModal.classList.remove('visible'); if (earModeType === 'test') accuracyPanel.classList.remove('visible'); return; }
    if (infoModal.classList.contains('visible')) { infoModal.classList.remove('visible'); stopProva(); return; }
    if ($('instructions-modal').classList.contains('visible')) { $('instructions-modal').classList.remove('visible'); return; }
    if (earTrainingActive && warmupInterval) stopEarTraining(false);
    else if (earTrainingActive && !isPaused && earModeType === 'listen') stopEarTraining(false);
    else if (earTrainingActive && !isPaused && (earModeType === 'test' || earModeType === 'practice' || earModeType === 'battle')) pauseEarTraining();
    else if (!earTrainingActive) { stopProva(); if (exclusiveMode === 'complete' || exclusiveMode === 'edit') setExclusiveMode('normal'); }
    return;
  }
  const DIAT_DEG = [0,2,4,5,7,9,11,12];
  const isNumDigitCode = /^(Digit[1-8]|Numpad[1-8])$/.test(e.code);
  const numDegree = () => DIAT_DEG[parseInt(e.code.slice(-1), 10) - 1];
  const numModValue = () => { if (e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract') return -1; if (e.key === '+' || e.key === '=' || e.code === 'Equal' || e.code === 'NumpadAdd') return 1; return 0; };
  const autoOpenManual = earMode.classList.contains('active');
  const mod = numModValue();
  if (mod !== 0) {
    e.preventDefault(); if (autoOpenManual && !manualPanelVisible) toggleManualPanel();
    pendingAcc = mod; if (pendingAccTO) clearTimeout(pendingAccTO);
    pendingAccTO = setTimeout(() => { pendingAcc = 0; pendingAccTO = null; }, 2000); return;
  }
  if (isNumDigitCode && numHeld[e.code] === undefined) {
    e.preventDefault(); if (autoOpenManual && !manualPanelVisible) toggleManualPanel();
    let d = numDegree();
    if (pendingAcc) { const oct = d >= 12 ? 12 : 0; d = ((d % 12) + pendingAcc + 12) % 12 + oct; pendingAcc = 0; if (pendingAccTO) { clearTimeout(pendingAccTO); pendingAccTO = null; } }
    numHeld[e.code] = d; activateManualNote(d); return;
  }
});

document.addEventListener('keyup', e => {
  if (!$('password-modal').classList.contains('hidden')) return;
  const el = e.target; if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) { if (el.getClientRects().length > 0) return; }
  if (numHeld[e.code] !== undefined) { const d = numHeld[e.code]; delete numHeld[e.code]; deactivateManualNote(d); }
});

window.addEventListener('resize', () => {
  if ($('zoom-controls').style.display !== 'none') positionZoomControls();
  if ($('sustain-hint').classList.contains('visible')) positionSustainHint();
  if (tonicBtnEl && tonicBtnEl.style.display !== 'none') positionTonicControls();
  positionBattleBoxes();
});

/* ══════════════════════════════════════════════════════════════ */
/* 15. ARRENCADA                                                  */
/* ══════════════════════════════════════════════════════════════ */
window.addEventListener('beforeunload', () => { stopAllPianoNotes(); stopAllEarPianoNotes(); stopAllPedalSounds(); releaseActiveTab(); if (earTrainingActive) stopEarTraining(true); });
if (!window.isTonalEmotionsActive) { window.isTonalEmotionsActive = true; window.addEventListener('pagehide', () => { window.isTonalEmotionsActive = false; }); }
if (IS_SMARTPHONE) { document.documentElement.classList.add('smartphone-mode'); const bm = $('btn-start-midi'); if (bm) bm.style.display = 'none'; }
if (IS_TABLET) document.documentElement.classList.add('tablet-mode');

const initialLang = detectReferrerLanguage(); if (initialLang && translations[initialLang]) currentLang = initialLang;
updateLanguageUI(); updateModeButtons(); updateDifficultyButtons(); syncManualUI(); loadZoom(); syncSoundSliders(); refreshSoundLabels();
updatePedalVolumeDirect(50); initPasswordModal(); showAccessRequirementMessage(); setupTabletFullscreenRecovery(); updateFullscreenButtons();

const TAB_ID = Math.random().toString(36).slice(2);
function claimActiveTab() { localStorage.setItem(CONFIG.STORAGE_KEYS.MIDI_TAB, TAB_ID); }
function releaseActiveTab() { if (localStorage.getItem(CONFIG.STORAGE_KEYS.MIDI_TAB) === TAB_ID) localStorage.removeItem(CONFIG.STORAGE_KEYS.MIDI_TAB); }
function otherTabActive() { const v = localStorage.getItem(CONFIG.STORAGE_KEYS.MIDI_TAB); return !!v && v !== TAB_ID; }

console.log('🎹 TONAL EMOTIONS v18 (Neta) carregat correctament.');