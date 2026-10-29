/**
 * TONAL EMOTIONS - v16 (Versió Final Corregida i Estable)
 */

/* ══ 1. CONFIGURACIÓ ══ */
const CONFIG = {
  PASS_HASH: "e04dc6405154e1be4887eb34e8aa6237661a15a975e2c13a5e78e056d161099f",
  MAX_ATTEMPTS: 3,
  DESIGN_WIDTH: 1280,
  STORAGE_KEYS: { LAYOUT: 'sensacions_notes_layout_v5', ZOOM: 'tonal_emotions_zoom', MIDI_TAB: 'midi_active_tab' },
  IMAGE_PATH: './img/',
  MUSICAL_KEYS: ["C","Db","D","Eb","E","F","F# / Gb","G","Ab","A","Bb","B"],
  CENTERED_NUMBERS: [0,1,2,7,9,10],
  NOTE_IMAGES: {0:'1_casa.png',1:'b2_bestia.png',2:'2_encongir.png',3:'b3_tristesa.png',4:'3_alegria.png',5:'4_amen.png',6:'s4_alerta.png',7:'5_musculs.png',8:'b6_aliens.png',9:'6_canttenor.png',10:'b7_ferida.png',11:'7_imant.png'},
  DEFAULT_LAYOUT: {0:{name:'1_casa.png',x:51.1,y:54,size:260,z:106},1:{name:'b2_bestia.png',x:40.1,y:60.8,size:170,z:107},2:{name:'2_encongir.png',x:37.7,y:45.4,size:150,z:10},3:{name:'b3_tristesa.png',x:53.9,y:36.8,size:140,z:10},4:{name:'3_alegria.png',x:46.9,y:36,size:140,z:105},5:{name:'4_amen.png',x:39.9,y:28.1,size:160,z:10},6:{name:'s4_alerta.png',x:67.5,y:56.9,size:130,z:115},7:{name:'5_musculs.png',x:61.3,y:52.4,size:280,z:114},8:{name:'b6_aliens.png',x:66.6,y:40.2,size:120,z:113},9:{name:'6_canttenor.png',x:47.9,y:71,size:160,z:108},10:{name:'b7_ferida.png',x:62.5,y:30.8,size:130,z:10},11:{name:'7_imant.png',x:57.8,y:69.1,size:100,z:116}}
};
const PIANO_DEFAULTS = { volume:1.0, fadeIn:0, attack:80, decay:1.73, sustain:0.9, duration:4.0, brightness:1.1, instrument:'piano' };
const PIANO_VOL_MIN = 0.25;
const pianoTuning = Object.assign({}, PIANO_DEFAULTS);
const INSTRUMENTS = {
  piano:{wave:'triangle',harmonics:[1.0,0.5,0.25,0.125],filter:0},
  soft:{wave:'sine',harmonics:[1.0,0.3,0.1,0.05],filter:0},
  epiano:{wave:'sine',harmonics:[1.0,0.6,0.15,0.2],filter:0},
  organ:{wave:'triangle',harmonics:[1.0,0.5,0.33,0.25],filter:0},
  strings:{wave:'sawtooth',harmonics:[0.6,0.3,0.15,0.08],filter:2500},
  flute:{wave:'sine',harmonics:[1.0,0.15,0.02,0.0],filter:0}
};
const TEST_IMAGE_MS=1000, TEST_EXPLORE_MS=2000, BATTLE_HIDE_MS=500, BATTLE_ADVANCE_MS=1000, BATTLE_TURN_MS=1100;

/* ══ DETECCIÓ DE DISPOSITIU (Ha d'anar ABANS de translations) ══ */
const UA = navigator.userAgent;
const IS_IPAD = /iPad/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IS_ANDROID_TABLET = /Android/.test(UA) && !/Mobile/.test(UA);
const IS_TABLET = IS_IPAD || IS_ANDROID_TABLET;
const IS_SMARTPHONE = /iPhone|iPod/.test(UA) || (/Android/.test(UA) && /Mobile/.test(UA));
const IS_MAC = /Macintosh|MacIntel/.test(navigator.platform) && !IS_IPAD;
const IS_PC = !IS_TABLET && !IS_SMARTPHONE && !IS_MAC;
const IS_LIMITED_DEVICE = IS_TABLET || (IS_MAC && !('requestMIDIAccess' in navigator));
/* ══ 2. TRADUCCIONS ══ */
const translations = {
ca:{pw_title:"🔐 Accés Restringit",pw_placeholder:"Introdueix la contrasenya",pw_button:"Entrar",pw_error:"Contrasenya incorrecta. Intent {X}/{Y}",pw_denied:"Accés denegat: massa intents fallits",start_midi:"🎹 LABORATORI AUDITIU",start_ear:"🎧 ENTRENAMENT AUDITIU",waiting_midi:"Esperant connexió MIDI...",midi_connected:"MIDI connectat!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",delay_label:"Retard: ",delay:"Retard",normal:"Normal",lead:"Lead",bass:"Baix",multi:"Combinat",adjust_zoom:"Ajustar",edit:"Edita",back:"← Enrere",fullscreen:"Pantalla Completa",exit_fullscreen:"Surt de Pantalla",edit_mode:"Mode Edició",save:"Desa",reset:"Reinicia",cancel:"Cancel·la",saved_ok:"Desat correctament!",proposed_answer:"🎯 Resposta Proposada",accuracy:"🎯 Precisió",test_complete:"🎯 Prova Completada!",ok:"D'ACORD",key:"Tonalitat",duration:"Durada",pedal_vol:"Vol. Pedal",notes:"Notes",diatonic:"Diatòniques",non_diatonic:"No-Diat",all_notes:"Totes",test_mode:"TEST",practice_mode:"PRÀCTICA",listen_mode:"ESCOLTA",battle_mode:"BATALLA",start:"INICIA",stop:"ATURA",listen_tonic:"Escolta la tònica...",listen_cadence:"Escolta la cadència completa de la tonalitat",multi_tab_warning:"⚠️ MIDI ja actiu en una altra pestanya",reset_confirm:"Tornar a la disposició original?",piano_on:"🎹 Piano Intern: ACTIVAT",piano_off:"🔇 Piano Intern: DESACTIVAT",ear_info:"Rang: C2 - C7<br>Seqüència aleatòria",let_s_go:"Som-hi!",word_notes:"notes",mode_prefix:"Mode: ",word_major:"Major",min:"min",sec:"s",manual:"Manual",manual_control:"Control Manual",easy:"Fàcil",hard:"Difícil",instrument:"Instrument",inst_piano:"Piano",inst_soft:"Piano Suau",inst_epiano:"E-Piano",inst_organ:"Orgue",inst_strings:"Corda",inst_flute:"Flauta",test_sound:"▶ Prova",sc_title:"🎹 CONTROLS DE SO",sc_volume:"Volum",sc_fadein:"Fade In",sc_attack:"Atac",sc_decay:"Decaiment",sc_sustain:"Cos",sc_duration:"Durada",sc_bright:"Brillantor",info_title:"ℹ️ Què és TONAL EMOTIONS?",info_text:"TONAL EMOTIONS és l'eina del bloc auditiu del nivell fonamental de l'escola online Girona Jazz Piano School®. El seu objectiu és entrenar l'oïda associant cada grau de l'escala a una emoció o sensació.<br><br>🎹 LABORATORI AUDITIU: visualitza les imatges de les notes que toques (modes Normal, Principal, Baix, Combinat, Retard, Ajustar i Editar).<br>🎧 ENTRENAMENT AUDITIU: quatre modes: ESCOLTA, PRÀCTICA, TEST i BATALLA.<br><br>Tria tonalitat, tipus de notes i dificultat: FÀCIL (amb la cadència I-IV-V-I de referència) o DIFÍCIL (només amb la tònica de fons).",hardcore_title:"MODE HARDCORE",hardcore_text:"Sense la referència de la cadència, reconèixer notes diatòniques i no diatòniques barrejades ja comença a ser exigent: sense oïda absoluta, cal una oïda relativa molt ben entrenada. Només per a valents!",result_excel:"🎉 Felicitats! Tens una oïda molt ben entrenada! Segueix així!",result_diat:"Has encertat el {X}% de les notes. 💡 Recomanació: Intenta entrenar amb notes No-Diatòniques per millorar encara més!",result_non_diat:"Has encertat el {X}% de les notes. 💡 Recomanació: Intenta entrenar amb TOTES les notes per posar-te a prova!",result_good:"Has encertat el {X}% de les notes. Bona feina!",result_keep:"Has encertat el {X}% de les notes. No et rendeixis! Segueix practicant i milloraràs. 💪",result_crack:"🏆 Ets un CRACK! Has encertat TOTES les notes! O tens oïda absoluta o una oïda relativa molt ben entrenada! 🎵",result_short:"💡 Consell: Prova de fer sessions més curtes (2-3 min) i augmenta gradualment. La constància és clau!",result_filtered:"Has encertat el {X}% amb una selecció reduïda de notes. 💡 Quan et sentis a punt, activa més notes amb el botó 🎯 per seguir creixent!",pause_title:"⏸️ Pausa",pause_message:"Prova en pausa. Què vols fer?",resume:"▶ Continuar",abort:"⏹ Abortar",pause_cheat:"⚠️ Massa pauses! La prova es finalitza per possibles trampes.",help_title:"📖 Instruccions del Laboratori Auditiu",
help_midi:(IS_TABLET
  ? "<h3>🎹 Laboratori Auditiu (Tablet)</h3><ul><li><b>Mode Normal:</b> mostra la imatge de l'última nota tocada i la seva sensació emocional.</li><li><b>🎛️ Teclat manual:</b> sempre visible a la part inferior. Toca les notes amb el dit o usa el teclat del PC: números 1–7 = graus 1–7; «-» abans = bemoll, «+» o «=» abans = sostingut.</li><li><b>🎵 TÒNICA:</b> activa la nota pedal de la tònica; ajusta'n el volum amb el fader.</li><li><b>🖥️ Pantalla completa:</b> icona a la part inferior.</li><li><b>⚠️ MIDI:</b> no disponible en tablets. Utilitza el teclat manual o el teclat del PC.</li></ul>"
  : "<h3>🎹 Laboratori Auditiu — modes de visualització</h3><ul><li><b>Normal:</b> mostra la imatge de l'última nota tocada i una frase curta que descriu la seva sensació emocional dins del context tonal.</li><li><b>Lead:</b> imatge de la nota més aguda que sona.</li><li><b>Baix:</b> imatge de la nota més greu que sona.</li><li><b>Combinat:</b> imatge de cada nota tocada.</li><li><b>Retard:</b> mantén una sola tecla i la seva imatge apareix al cap d'uns segons.</li></ul><h3>🛠️ Eines</h3><ul><li><b>Ajustar:</b> zoom i control de so (volum, atac, decaïment, instrument...).</li><li><b>Edita:</b> arrossega les imatges, porta-les al davant amb TOP i desa la disposició.</li><li><b>🎹 Piano:</b> activa/desactiva el so del piano intern.</li><li><b>🎛️ Manual:</b> teclat a pantalla (ratolí o tacte) o teclat del PC: números 1–7 = graus 1–7; «-» abans = bemoll, «+» o «=» abans = sostingut.</li><li><b>Pedal sustain:</b> aguanta les notes com en un piano real.</li><li><b>🎵 TÒNICA:</b> al mode Normal, activa la nota pedal de la tònica; ajusta'n el volum amb el fader o les fletxes ↑/↓.</li><li><b>ESC:</b> atura la prova i surt d'Ajustar/Edita sense desar.</li></ul>"),
help_ear:(IS_TABLET
  ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Escolta / Pràctica / Test / Batalla:</b> selecciona el mode amb els botons de colors.</li><li><b>🎛️ Teclat manual:</b> sempre visible a la part inferior. Toca les notes amb el dit.</li><li><b>Configuració:</b> tria tonalitat, durada, retard, volum del pedal i tipus de notes (Diatòniques / No-Diatòniques / Totes).</li><li><b>Fàcil / Difícil:</b> Fàcil inclou la cadència I-IV-V-I de referència; Difícil només la tònica de fons.</li><li><b>⚠️ MIDI:</b> no disponible. Utilitza el teclat manual.</li><li><b>ESC:</b> pausa la prova; massa pauses la finalitzen.</li></ul>"
  : "<h3>🎧 Modes d'entrenament</h3><ul><li><b>Escolta:</b> escolta la nota i en veus la resposta; ideal per aprendre.</li><li><b>Pràctica:</b> prova-ho i reps feedback immediat (👍/👎).</li><li><b>Test:</b> avaluació amb percentatge de precisió al final.</li><li><b>Batalla:</b> 2 jugadors per torns amb el mateix teclat; guanya qui encerti més notes. Si no respons a temps, apareix ⏱ TEMPS i conta com a error. En cas d'empat al final: 💀 MORT SÚBITA, on cada jugador respon la seva pregunta del parell i perd qui falli havent encertat el rival.</li><li><b>💡 A l'iPad:</b> els botons de mode (Escolta, Pràctica, Test, Batalla) es mostren com a icones: 🎧, 🎯, 📝, ⚔️ per estalviar espai.</li></ul><h3>⚙️ Opcions</h3><ul><li><b>Fàcil:</b> amb la cadència I-IV-V-I de referència. <b>Difícil:</b> només amb la tònica de fons (afegeix 1 s extra de gràcia al retard per poder escoltar la nota).</li><li><b>Notes:</b> diatòniques, no diatòniques o totes.</li><li><b>Durada / Retard:</b> temps de prova i temps fins a la resposta.</li><li><b>Vol. Pedal:</b> ajusta'l amb el control lliscant o les fletxes ↑/↓.</li><li><b>Manual:</b> teclat a pantalla (ratolí o tacte) o teclat del PC: els números 1–7 corresponen als graus 1–7; prem «-» abans del número per fer-lo bemoll i «+» (o «=») abans per fer-lo sostingut. En prémer un número, el panell manual s'obre sol i el botó corresponent s'il·lumina.</li><li><b>🎮 Batalla sense piano:</b> tots dos jugadors poden respondre des de qualsevol zona numèrica del teclat (fila superior o teclat numèric). Les lletres ja no responen, per evitar pulsacions accidentals.</li><li><b>⚙️ CONFIGURAR:</b> obre'l i tria quines notes entren a la prova (mínim 2); les apagades no es preguntaran ni apareixeran al teclat manual.</li><li><b>ESC:</b> pausa la prova; massa pauses la finalitzen.</li></ul>"),
sustain_hint:"🎹 Prova el pedal sustain",caps_on:"⇪ Majúscules activades",filter_info_some:"Notes configurades: ",filter_info_all_diat:"Configurades totes les notes diatòniques",filter_info_all_nondiat:"Configurades totes les notes no diatòniques",filter_info_all:"Configurades totes les notes",filter_btn_test:"CONFIGURAR TEST",filter_btn_listen:"CONFIGURAR NOTES",filter_btn_practice:"CONFIGURAR PROVA",filter_btn_battle:"CONFIGURAR BATALLA",filter_title:"Notes actives a la prova",filter_hint:"Mínim 2 notes actives. Les apagades no entraran en la seqüència.",tonic_btn:"🎵 TÒNICA",tonic_tip:"Activa la nota pedal de la tònica per sentir la veritable emoció de cada imatge dins del seu context tonal.",emo_title:"Sensació tonal",emo_0:"Repòs absolut: cap tensió, ets a casa.",emo_1:"Amenaça: la bèstia ronda a un semitò.",emo_2:"Dubte: baixar a casa o pujar a la dolçor?",emo_3:"Melancolia: una foto antiga d'un moment feliç que ja ha passat.",emo_4:"Dolçor pura: la nota més dolça de totes.",emo_5:"Amén: tensió que demana resoldre cap a la dolçor.",emo_6:"Alerta: tensió que puja cap a la dominant (el 5).",emo_7:"Força i múscul: la dominant (el 5) que resol a tònica amb el típic xim pom.",emo_8:"Misteri: un enigma fosc que baixa cap a la dominant (el 5).",emo_9:"Cant al cel per arribar a la tònica.",emo_10:"Ferida emocional (Blues).",emo_11:"Imant: atracció irresistible cap a la tònica, tan a prop.",battle_title:"⚔️ MODE BATALLA",battle_description:"Introduïu els noms dels dos jugadors. Fareu torns per respondre les notes!",player:"Jugador",start_battle_btn:"⚔️ COMENÇAR BATALLA",battle_enter_hint:"⏎ Prem INTRO per començar",battle_complete:"⚔️ BATALLA FINALITZADA!",battle_winner:"🏆 {X} guanya!",battle_tie:"🤝 Empat!",battle_your_turn:"Torn de {X}",sudden_death_title:"MORT SÚBITA",sudden_death_text:"Empat! Qui falli quan l'altre encerti, perd la batalla.",v10_flash_nice:"MOLT BÉ!",v10_flash_miss:"FALLADA!",v10_timeout:"TEMPS!",v10_correct:"encerts",v10_avg:"s/resposta",exit_app:"❌ SORTIR"},
es:{pw_title:"🔐 Acceso Restringido",pw_placeholder:"Introduce la contraseña",pw_button:"Entrar",pw_error:"Contraseña incorrecta. Intento {X}/{Y}",pw_denied:"Acceso denegado: demasiados intentos fallidos",start_midi:"🎹 LABORATORIO AUDITIVO",start_ear:"🎧 ENTRENAMIENTO AUDITIVO",waiting_midi:"Esperando conexión MIDI...",midi_connected:"¡MIDI conectado!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",delay_label:"Retardo: ",delay:"Retardo",normal:"Normal",lead:"Lead",bass:"Bajo",multi:"Combinado",adjust_zoom:"Ajustar",edit:"Editar",back:"← Volver",fullscreen:"Pantalla Completa",exit_fullscreen:"Salir Pantalla",edit_mode:"Modo Edición",save:"Guardar",reset:"Reiniciar",cancel:"Cancelar",saved_ok:"¡Guardado correctamente!",proposed_answer:"🎯 Respuesta Propuesta",accuracy:"🎯 Precisión",test_complete:"🎯 ¡Prueba Completada!",ok:"OK",key:"Tonalidad",duration:"Duración",pedal_vol:"Vol. Pedal",notes:"Notas",diatonic:"Diatónicas",non_diatonic:"No-Diat",all_notes:"Todas",test_mode:"TEST",practice_mode:"PRÁCTICA",listen_mode:"ESCUCHAR",battle_mode:"BATALLA",start:"INICIAR",stop:"DETENER",listen_tonic:"Escucha la tónica...",listen_cadence:"Escucha la cadencia completa de la tonalidad",multi_tab_warning:"⚠️ MIDI ya activo en otra pestaña",reset_confirm:"¿Volver a la disposición original?",piano_on:"🎹 Piano Interno: ACTIVADO",piano_off:"🔇 Piano Interno: DESACTIVADO",ear_info:"Rango: C2 - C7<br>Secuencia aleatoria",let_s_go:"¡Vamos!",word_notes:"notas",mode_prefix:"Modo: ",word_major:"Mayor",min:"min",sec:"s",manual:"Manual",manual_control:"Control Manual",easy:"Fácil",hard:"Difícil",instrument:"Instrumento",inst_piano:"Piano",inst_soft:"Piano Suave",inst_epiano:"E-Piano",inst_organ:"Órgano",inst_strings:"Cuerda",inst_flute:"Flauta",test_sound:"▶ Prueba",sc_title:"🎹 CONTROLES DE SONIDO",sc_volume:"Volumen",sc_fadein:"Fade In",sc_attack:"Ataque",sc_decay:"Decadencia",sc_sustain:"Cuerpo",sc_duration:"Duración",sc_bright:"Brillo",info_title:"ℹ️ ¿Qué es TONAL EMOTIONS?",info_text:"TONAL EMOTIONS es la herramienta del bloque auditivo del nivel fundamental de la escuela online Girona Jazz Piano School®. Su objetivo es entrenar el oído asociando cada grado de la escala a una emoción o sensación.<br><br>🎹 LABORATORIO AUDITIVO: visualiza las imágenes de las notas que tocas (modos Normal, Principal, Bajo, Combinado, Retardo, Ajustar y Editar).<br>🎧 ENTRENAMIENTO AUDITIVO: cuatro modos: ESCUCHAR, PRÁCTICA, TEST y BATALLA.<br><br>Elige tonalidad, tipo de notas y dificultad: FÁCIL (con la cadencia I-IV-V-I de referencia) o DIFÍCIL (solo con la tónica de fondo).",hardcore_title:"MODO HARDCORE",hardcore_text:"Sin la referencia de la cadencia, reconocer notas diatónicas y no diatónicas mezcladas ya empieza a ser exigente: sin oído absoluto, se necesita un oído relativo muy bien entrenado. ¡Solo para valientes!",result_excel:"🎉 ¡Felicidades! ¡Tienes un oído muy bien entrenado! ¡Sigue así!",result_diat:"Has acertado el {X}% de las notas. 💡 Recomendación: ¡Intenta entrenar con notas No-Diatónicas para mejorar aún más!",result_non_diat:"Has acertado el {X}% de las notas. 💡 Recomendación: ¡Intenta entrenar con TODAS las notas para ponerte a prueba!",result_good:"Has acertado el {X}% de las notas. ¡Buen trabajo!",result_keep:"Has acertado el {X}% de las notas. ¡No te rindas! Sigue practicando y mejorarás. 💪",result_crack:"🏆 ¡Eres un CRACK! ¡Has acertado TODAS las notas! ¡O tienes oído absoluto o un oído relativo muy bien entrenado! 🎵",result_short:"💡 Consejo: Prueba a hacer sesiones más cortas (2-3 min) y aumenta gradualmente. ¡La constancia es clave!",result_filtered:"Has acertado el {X}% con una selección reducida de notas. 💡 Cuando te sientas listo, activa más notas con el botón 🎯 para seguir creciendo!",pause_title:"⏸️ Pausa",pause_message:"Prueba en pausa. ¿Qué quieres hacer?",resume:"▶ Continuar",abort:"⏹ Abortar",pause_cheat:"⚠️ ¡Demasiadas pausas! La prueba se finaliza por posibles trampas.",help_title:"📖 Instrucciones del Laboratorio Auditivo",
help_midi:(IS_TABLET
  ? "<h3>🎹 Laboratorio Auditivo (Tablet)</h3><ul><li><b>Modo Normal:</b> muestra la imagen de la última nota tocada y su sensación emocional.</li><li><b>🎛️ Teclado manual:</b> siempre visible en la parte inferior. Toca las notas con el dedo o usa el teclado del PC.</li><li><b>🎵 TÓNICA:</b> activa la nota pedal de la tónica; ajusta su volumen con el fader.</li><li><b>🖥️ Pantalla completa:</b> icono en la parte inferior.</li><li><b>⚠️ MIDI:</b> no disponible en tablets. Usa el teclado manual o el del PC.</li></ul>"
  : "<h3>🎹 Laboratorio Auditivo — modos de visualización</h3><ul><li><b>Normal:</b> muestra la imagen de la última nota tocada y una frase corta que describe su sensación emocional dentro del contexto tonal.</li><li><b>Lead:</b> imagen de la nota más aguda que suena.</li><li><b>Bajo:</b> imagen de la nota más grave que suena.</li><li><b>Combinado:</b> imagen de cada nota tocada.</li><li><b>Retardo:</b> mantén una sola tecla y su imagen aparece al cabo de unos segundos.</li></ul><h3>🛠️ Herramientas</h3><ul><li><b>Ajustar:</b> zoom y control de sonido (volumen, ataque, decadencia, instrumento...).</li><li><b>Editar:</b> arrastra las imágenes, tráelas al frente con TOP y guarda la disposición.</li><li><b>🎹 Piano:</b> activa/desactiva el sonido del piano interno.</li><li><b>🎛️ Manual:</b> teclado en pantalla (ratón o tacto) o teclado del PC: números 1–7 = grados 1–7; «-» antes = bemol, «+» o «=» antes = sostenido.</li><li><b>Pedal sustain:</b> mantiene las notas como en un piano real.</li><li><b>🎵 TÓNICA:</b> en modo Normal, activa la nota pedal de la tónica; ajusta su volumen con el fader o las flechas ↑/↓.</li><li><b>ESC:</b> detiene la prueba y sale de Ajustar/Editar sin guardar.</li></ul>"),
help_ear:(IS_TABLET
  ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Escucha / Práctica / Test / Batalla:</b> selecciona el modo con los botones de colores.</li><li><b>🎛️ Teclado manual:</b> siempre visible en la parte inferior. Toca las notas con el dedo.</li><li><b>Configuración:</b> elige tonalidad, duración, retardo, volumen del pedal y tipo de notas (Diatónicas / No-Diatónicas / Todas).</li><li><b>Fácil / Difícil:</b> Fácil incluye la cadencia I-IV-V-I de referencia; Difícil solo la tónica de fondo.</li><li><b>⚠️ MIDI:</b> no disponible. Usa el teclado manual.</li><li><b>ESC:</b> pausa la prueba; demasiadas pausas la finalizan.</li></ul>"
  : "<h3>🎧 Modos de entrenamiento</h3><ul><li><b>Escuchar:</b> escuchas la nota y ves la respuesta; ideal para aprender.</li><li><b>Práctica:</b> pruébalo y recibes feedback inmediato (👍/👎).</li><li><b>Test:</b> evaluación con porcentaje de precisión al final.</li><li><b>Batalla:</b> 2 jugadores por turnos con el mismo teclado; gana quien acierte más notas. Si no respondes a tiempo, aparece ⏱ TIEMPO y cuenta como fallo. En caso de empate al final: 💀 MUERTE SÚBITA, donde cada jugador responde su pregunta del par y pierde quien falle habiendo acertado el rival.</li><li><b>💡 En el iPad:</b> los botones de modo (Escucha, Práctica, Test, Batalla) se muestran como iconos: 🎧, 🎯, 📝, ⚔️ para ahorrar espacio.</li></ul><h3>⚙️ Opciones</h3><ul><li><b>Fácil:</b> con la cadencia I-IV-V-I de referencia. <b>Difícil:</b> solo con la tónica de fondo (añade 1 s extra de gracia al retardo para poder escuchar la nota).</li><li><b>Notas:</b> diatónicas, no diatónicas o todas.</li><li><b>Duración / Retardo:</b> tiempo de prueba y tiempo hasta la respuesta.</li><li><b>Vol. Pedal:</b> ajústalo con el control deslizante o las flechas ↑/↓.</li><li><b>Manual:</b> teclado en pantalla (ratón o tacto) o teclado del PC: los números 1–7 corresponden a los grados 1–7; pulsa «-» antes del número para hacerlo bemol y «+» (o «=») antes para hacerlo sostenido. Al pulsar un número, el panel manual se abre solo y el botón correspondiente se ilumina.</li><li><b>🎮 Batalla sin piano:</b> ambos jugadores pueden responder desde cualquier zona numérica del teclado (fila superior o teclado numérico). Las letras ya no responden, para evitar pulsaciones accidentales.</li><li><b>⚙️ CONFIGURAR:</b> ábrelo y elige qué notas entran en la prueba (mínimo 2); las apagadas no se preguntarán ni aparecerán en el teclado manual.</li><li><b>ESC:</b> pausa la prueba; demasiadas pausas la finalizan.</li></ul>"),
sustain_hint:"🎹 Prueba el pedal sustain",caps_on:"⇪ Mayúsculas activadas",filter_info_some:"Notas configuradas: ",filter_info_all_diat:"Configuradas todas las notas diatónicas",filter_info_all_nondiat:"Configuradas todas las notas no diatónicas",filter_info_all:"Configuradas todas las notas",filter_btn_test:"CONFIGURAR TEST",filter_btn_listen:"CONFIGURAR NOTAS",filter_btn_practice:"CONFIGURAR PRUEBA",filter_btn_battle:"CONFIGURAR BATALLA",filter_title:"Notas activas en la prueba",filter_hint:"Mínimo 2 notas activas. Las apagadas no entrarán en la secuencia.",tonic_btn:"🎵 TÓNICA",tonic_tip:"Activa la nota pedal de la tónica para sentir la verdadera emoción de cada imagen dentro de su contexto tonal.",emo_title:"Sensación tonal",emo_0:"Reposo absoluto: sin tensión, estás en casa.",emo_1:"Amenaza: la bestia ronda a un semitono.",emo_2:"Duda: ¿bajar a casa o subir a la dulzura?",emo_3:"Melancolía: una foto antigua de un momento feliz que ya pasó.",emo_4:"Dulzura pura: la nota más dulce de todas.",emo_5:"Amén: tensión que pide resolver hacia la dulzura.",emo_6:"Alerta: tensión que sube hacia la dominante (el 5).",emo_7:"Fuerza y músculo: la dominante (el 5) que resuelve a tónica con el típico chim-pum.",emo_8:"Misterio: un enigma oscuro que baja hacia la dominante (el 5).",emo_9:"Canto al cielo para llegar a la tónica.",emo_10:"Herida emocional (Blues).",emo_11:"Imán: atracción irresistible hacia la tónica, tan cerca.",battle_title:"⚔️ MODO BATALLA",battle_description:"Introducid los nombres de los dos jugadores. ¡Haréis turnos para responder las notas!",player:"Jugador",start_battle_btn:"⚔️ COMENZAR BATALLA",battle_enter_hint:"⏎ Pulsa INTRO para comenzar",battle_complete:"⚔️ ¡BATALLA FINALIZADA!",battle_winner:"🏆 ¡{X} gana!",battle_tie:"🤝 ¡Empate!",battle_your_turn:"Turno de {X}",sudden_death_title:"MUERTE SÚBITA",sudden_death_text:"¡Empate! Quien falle cuando el otro acierte, pierde la batalla.",v10_flash_nice:"¡BIEN!",v10_flash_miss:"¡FALLO!",v10_timeout:"¡TIEMPO!",v10_correct:"aciertos",v10_avg:"s/respuesta",exit_app:"❌ SALIR"},
en:{pw_title:"🔐 Restricted Access",pw_placeholder:"Enter the password",pw_button:"Enter",pw_error:"Wrong password. Attempt {X}/{Y}",pw_denied:"Access denied: too many failed attempts",start_midi:"🎹 AUDITORY LAB",start_ear:"🎧 EAR TRAINING",waiting_midi:"Waiting for MIDI connection...",midi_connected:"MIDI connected!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",delay_label:"Delay: ",delay:"Delay",normal:"Normal",lead:"Lead",bass:"Bass",multi:"Multi",adjust_zoom:"Adjust",edit:"Edit",back:"← Back",fullscreen:"Fullscreen",exit_fullscreen:"Exit Fullscreen",edit_mode:"Edit Mode",save:"Save",reset:"Reset",cancel:"Cancel",saved_ok:"Saved correctly!",proposed_answer:"🎯 Proposed Answer",accuracy:"🎯 Accuracy",test_complete:"🎯 Test Complete!",ok:"OK",key:"Key",duration:"Duration",pedal_vol:"Pedal Vol",notes:"Notes",diatonic:"Diatonic",non_diatonic:"Non-Diat",all_notes:"All",test_mode:"TEST",practice_mode:"PRACTICE",listen_mode:"LISTEN",battle_mode:"BATTLE",start:"START",stop:"STOP",listen_tonic:"Listen to the tonic...",listen_cadence:"Listen to the full cadence of the key",multi_tab_warning:"⚠️ MIDI already active in another tab",reset_confirm:"Return to original layout?",piano_on:"🎹 Internal Piano: ON",piano_off:"🔇 Internal Piano: OFF",ear_info:"Range: C2 - C7<br>Random sequence",let_s_go:"Let's go!",word_notes:"notes",mode_prefix:"Mode: ",word_major:"Major",min:"min",sec:"s",manual:"Manual",manual_control:"Manual Control",easy:"Easy",hard:"Hard",instrument:"Instrument",inst_piano:"Piano",inst_soft:"Soft Piano",inst_epiano:"E-Piano",inst_organ:"Organ",inst_strings:"Strings",inst_flute:"Flute",test_sound:"▶ Test",sc_title:"🎹 SOUND CONTROLS",sc_volume:"Volume",sc_fadein:"Fade In",sc_attack:"Attack",sc_decay:"Decay",sc_sustain:"Body",sc_duration:"Duration",sc_bright:"Brightness",info_title:"ℹ️ What is TONAL EMOTIONS?",info_text:"TONAL EMOTIONS is the ear-training tool of the fundamental level of the online school Girona Jazz Piano School®. Its goal is to train the ear by associating each scale degree with an emotion or sensation.<br><br>🎹 AUDITORY LAB: visualizes the images of the notes you play (Normal, Lead, Bass, Multi, Delay, Adjust and Edit modes).<br>🎧 EAR TRAINING: four modes: LISTEN, PRACTICE, TEST and BATTLE.<br><br>Choose key, note type and difficulty: EASY (with the I-IV-V-I cadence as reference) or HARD (only the tonic in the background).",hardcore_title:"HARDCORE MODE",hardcore_text:"Without the cadence reference, recognizing mixed diatonic and non-diatonic notes is already demanding: without absolute pitch, you need a very well-trained relative pitch. Only for the brave!",result_excel:"🎉 Congratulations! You have a very well-trained ear! Keep it up!",result_diat:"You answered correctly to {X}% of the notes. 💡 Recommendation: Try training with Non-Diatonic notes to improve your ear even more!",result_non_diat:"You answered correctly to {X}% of the notes. 💡 Recommendation: Try training with ALL notes to challenge yourself further!",result_good:"You answered correctly to {X}% of the notes. Great job!",result_keep:"You answered correctly to {X}% of the notes. Don't give up! Keep practicing and you'll improve. 💪",result_crack:"🏆 You're a CRACK! You got ALL notes right! You either have absolute pitch or a very well-trained relative pitch! 🎵",result_short:"💡 Tip: Try shorter sessions (2-3 min) and increase gradually. Consistency is key!",result_filtered:"You scored {X}% with a reduced note selection. 💡 When you feel ready, turn on more notes with the 🎯 button to keep growing!",pause_title:"⏸️ Paused",pause_message:"Test paused. What do you want to do?",resume:"▶ Resume",abort:"⏹ Abort",pause_cheat:"⚠️ Too many pauses! Test ended due to possible cheating.",help_title:"📖 Auditory Lab Instructions",
help_midi:(IS_TABLET
  ? "<h3>🎹 Auditory Lab (Tablet)</h3><ul><li><b>Normal Mode:</b> shows the image of the last note played and its emotional feeling.</li><li><b>🎛️ Manual keyboard:</b> always visible at the bottom. Touch the notes with your finger or use the PC keyboard.</li><li><b>🎵 TONIC:</b> turns on the tonic pedal note; adjust its volume with the fader.</li><li><b>🖥️ Fullscreen:</b> icon at the bottom.</li><li><b>⚠️ MIDI:</b> not available on tablets. Use the manual keyboard or the PC keyboard.</li></ul>"
  : "<h3>🎹 Auditory Lab — display modes</h3><ul><li><b>Normal:</b> shows the image of the last note played and a short phrase describing its emotional feeling within the tonal context.</li><li><b>Lead:</b> image of the highest note sounding.</li><li><b>Bass:</b> image of the lowest note sounding.</li><li><b>Multi:</b> image of every note played.</li><li><b>Delay:</b> hold a single key and its image appears after a few seconds.</li></ul><h3>🛠️ Tools</h3><ul><li><b>Adjust:</b> zoom and sound control (volume, attack, decay, instrument...).</li><li><b>Edit:</b> drag images, bring them to the front with TOP and save the layout.</li><li><b>🎹 Piano:</b> turns the internal piano sound on/off.</li><li><b>🎛️ Manual:</b> on-screen keyboard (mouse or touch) or PC keyboard: numbers 1–7 = degrees 1–7; «-» before = flat, «+» or «=» before = sharp.</li><li><b>Sustain pedal:</b> holds the notes like a real piano.</li><li><b>🎵 TONIC:</b> in Normal mode, turns on the tonic pedal note; adjust its volume with the fader or the ↑/↓ arrows.</li><li><b>ESC:</b> stops the test and exits Adjust/Edit without saving.</li></ul>"),
help_ear:(IS_TABLET
  ? "<h3>🎧 Ear Training (Tablet)</h3><ul><li><b>Listen / Practice / Test / Battle:</b> select the mode with the colored buttons.</li><li><b>🎛️ Manual keyboard:</b> always visible at the bottom. Touch the notes with your finger.</li><li><b>Configuration:</b> choose key, duration, delay, pedal volume and note type (Diatonic / Non-Diatonic / All).</li><li><b>Easy / Hard:</b> Easy includes the I-IV-V-I reference cadence; Hard only the background tonic.</li><li><b>⚠️ MIDI:</b> not available. Use the manual keyboard.</li><li><b>ESC:</b> pauses the test; too many pauses end it.</li></ul>"
  : "<h3>🎧 Training modes</h3><ul><li><b>Listen:</b> hear the note and see the answer; ideal for learning.</li><li><b>Practice:</b> try it and get instant feedback (👍/👎).</li><li><b>Test:</b> graded with an accuracy percentage at the end.</li><li><b>Battle:</b> 2 players in turns on the same keyboard; whoever answers more notes wins. If you don't answer in time, ⏱ TIME appears and counts as a miss. Tie at the end? 💀 SUDDEN DEATH: each player answers their question of the pair, and whoever misses while the rival hits, loses.</li><li><b>💡 On iPad:</b> mode buttons (Listen, Practice, Test, Battle) are displayed as icons: 🎧, 🎯, 📝, ⚔️ to save space.</li></ul><h3>⚙️ Options</h3><ul><li><b>Easy:</b> with the I-IV-V-I cadence as reference. <b>Hard:</b> only the tonic in the background (adds 1 extra grace second to the delay so you can hear the note).</li><li><b>Notes:</b> diatonic, non-diatonic or all.</li><li><b>Duration / Delay:</b> test time and time until the answer.</li><li><b>Pedal Vol:</b> adjust with the slider or the ↑/↓ arrows.</li><li><b>Manual:</b> on-screen keyboard (mouse or touch) or PC keyboard: numbers 1–7 correspond to degrees 1–7; press «-» before the number to flatten it and «+» (or «=») before to sharpen it. Pressing a number opens the manual panel automatically and lights up the matching button.</li><li><b>🎮 Battle without piano:</b> both players can answer from any numeric zone of the keyboard (top row or numeric keypad). Letters no longer answer, to avoid accidental presses.</li><li><b>⚙️ CONFIGURE:</b> open it and choose which notes enter the test (min 2); turned-off notes won't be asked nor shown on the manual keyboard.</li><li><b>ESC:</b> pauses the test; too many pauses end it.</li></ul>"),
sustain_hint:"🎹 Try the sustain pedal",caps_on:"⇪ Caps Lock is on",filter_info_some:"Configured notes: ",filter_info_all_diat:"All diatonic notes configured",filter_info_all_nondiat:"All non-diatonic notes configured",filter_info_all:"All notes configured",filter_btn_test:"CONFIGURE TEST",filter_btn_listen:"CONFIGURE NOTES",filter_btn_practice:"CONFIGURE PRACTICE",filter_btn_battle:"CONFIGURE BATTLE",filter_title:"Active notes in the test",filter_hint:"At least 2 active notes. Turned-off notes won't enter the sequence.",tonic_btn:"🎵 TONIC",tonic_tip:"Turn on the tonic pedal note to feel the true emotion of each image within its tonal context.",emo_title:"Tonal feeling",emo_0:"Absolute rest: no tension, you are home.",emo_1:"Threat: the beast prowls a semitone away.",emo_2:"Doubt: fall home or rise to sweetness?",emo_3:"Melancholy: an old photo of a happy moment already gone.",emo_4:"Pure sweetness: the sweetest note of all.",emo_5:"Amen: tension that asks to resolve into sweetness.",emo_6:"Alert: tension rising toward the dominant (5).",emo_7:"Strength and muscle: the dominant (5) resolving to tonic with the classic ta-da.",emo_8:"Mystery: a dark enigma falling toward the dominant (5).",emo_9:"A song to the sky to reach the tonic.",emo_10:"Emotional wound (Blues).",emo_11:"Magnet: irresistible pull to the tonic, so close.",battle_title:"⚔️ BATTLE MODE",battle_description:"Enter the names of both players. You'll take turns answering notes!",player:"Player",start_battle_btn:"⚔️ START BATTLE",battle_enter_hint:"⏎ Press ENTER to start",battle_complete:"⚔️ BATTLE COMPLETE!",battle_winner:"🏆 {X} wins!",battle_tie:"🤝 Tie!",battle_your_turn:"{X}'s turn",sudden_death_title:"SUDDEN DEATH",sudden_death_text:"Tie! Whoever misses while the other hits, loses the battle.",v10_flash_nice:"NICE!",v10_flash_miss:"MISS!",v10_timeout:"TIME!",v10_correct:"correct",v10_avg:"s/answer",exit_app:"❌ EXIT"}
};

/* ══ 3. ESTAT GLOBAL I DOM ══ */
let currentLang='ca', passwordAttempts=0, sharedCtx=null, pianoBus=null, noteData={};
let isMidiActive=false, showTimeout=null, activeNotes=new Set(), heldByPedal=new Set(), editMode=false;
let dragElement=null, dragOffset={x:0,y:0}, maxZIndex=100;
let exclusiveMode='multi', sustainPedalActive=false, currentKeyRoot=0, internalPianoEnabled=true;
let activeOscillators={}, pedalVolume=0.0375;
let earTrainingActive=false, earTimer=null, earTimeRemaining=0, earSequence=[], earCurrentIndex=0;
let earModeType='listen', earNoteMode='diatonic', warmupInterval=null, earCurrentTargetPitchClass=null;
let earUserAlreadyAnswered=false, earCorrectNotes=0, earTotalNotes=0, earUserHasPlayed=false, hasAdvanced=false;
let listenDisplayTimeout=null, feedbackHideTimeout=null, advanceTimeout=null, earImageTimeout=null;
let showCorrectTimeout=null, delayCountdownInterval=null, manualPanelVisible=false, currentZoom=100;
let isPaused=false, pauseCount=0, consecutivePauses=0, totalPauses=0, delayStartTime=null;
let delayCheckInterval=null, delayPendingNote=null, pausedByUser=false, earDifficulty='easy';
let cadenceTimeouts=[], inAnswerPhase=false, hardcoreTimeout=null;
let lastNoteOnTime={}, physicalHeld=new Set(), wrappers={};
let editData=null, pressedStack=[], normalSustainHold=null, testSustainTimeout=null, testExploringNoImage=false;
let battleMode=false, battlePlayer1Name='', battlePlayer2Name='', battleCurrentPlayer=1;
let bp1={correct:0,total:0,times:[]}, bp2={correct:0,total:0,times:[]};
let turnIndicatorTimeout=null, battleLastQ=0, battleResultTimeout=null;
let sdActive=false, sdCount=0, sdWinner=null, sdPairMiss=[false,false], sdPairAns=0, sdTotalPairs=0;
let lastStopWasFade=false, naturalEnd=false;
let v10LastNoteAt=0, wasInAnswer=false, v10LastHumanNote=0, soloTimes=[];
let v10PendingFlash=null, v10PendingTurn=null, thumbTO=null;
let battleResultImg=null, flashTO=null;
let activePedalNotes=new Map(), midiAccessPromise=null;
let earFilterDiat=new Set([0,11,2,7,4,5,9]), earFilterNonDiat=new Set([1,3,6,8,10]), earFilterAll=new Set([0,1,2,3,4,5,6,7,8,9,10,11]);
let earFilterPanelVisible=false, filterBtn=null, filterPanel=null, filterTitleEl=null, filterRowEl=null, filterHintEl=null, filterInfoEl=null;
let activeManualNotes=new Set(), numHeld={}, pendingAcc=0, pendingAccTO=null;
let emotionTextEl=null, tonicBtnEl=null, tonicTipEl=null, tonicVolEl=null;
let tonicPedalOscs=[], tonicPedalGains=[], tonicPedalMasterGain=null, tonicPedalFilter=null;
let provaTimers=[], provaSustain=true, provaPlaying=false, provaBtnActive=null;

const $ = id => document.getElementById(id);
const startScreen=$('start-screen'), midiMode=$('midi-mode'), earMode=$('ear-mode'), multiTabWarning=$('multi-tab-warning');
const delayCountdownEl=$('delay-countdown'), imgElement=$('current-image'), proposedAnswerImage=$('proposed-answer-image');
const proposedAnswerBox=$('proposed-answer-box'), feedbackCorrect=$('feedback-correct'), feedbackWrong=$('feedback-wrong');
const statusElement=$('status'), modeDisplay=$('mode-display'), keySelect=$('key-select'), editControls=$('edit-controls');
const toast=$('toast'), pianoToast=$('piano-toast'), sustainLed=$('sustain-led'), earSustainLed=$('ear-sustain-led');
const delayConfig=$('delay-config'), accuracyPanel=$('accuracy-panel'), accuracyValue=$('accuracy-value'), accuracyDetails=$('accuracy-details');
const resultModal=$('result-modal'), resultPercentage=$('result-percentage'), resultDetails=$('result-details'), resultMessage=$('result-message');
const manualPanel=$('manual-panel'), pauseModal=$('pause-modal'), thinkingEmoji=$('thinking-emoji'), warmupText=$('warmup-text');
const infoModal=$('info-modal'), hardcoreWarning=$('hardcore-warning'), earPanel=$('ear-panel-full');
const battleModal=$('battle-modal'), battleScoreboard=$('battle-scoreboard'), battleTurnIndicator=$('battle-turn-indicator'), battleResultModal=$('battle-result-modal');
const p1Box=$('p1-box'), p1AnswerImage=$('p1-answer-image'), p1AccuracyValue=$('p1-accuracy-value'), p1AccuracyDetails=$('p1-accuracy-details');
const p2Box=$('p2-box'), p2AnswerImage=$('p2-answer-image'), p2AccuracyValue=$('p2-accuracy-value'), p2AccuracyDetails=$('p2-accuracy-details');

const flash=document.createElement('div');
flash.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);font-size:64px;font-weight:900;z-index:9500;opacity:0;pointer-events:none;transition:opacity .3s;text-shadow:0 0 20px currentColor;';
document.body.appendChild(flash);
const thumb=document.createElement('div');
thumb.style.cssText='position:fixed;font-size:72px;z-index:9500;opacity:0;pointer-events:none;transition:opacity .3s;';
document.body.appendChild(thumb);
function setFlashVisible(v){ flash.style.opacity = v?'1':'0'; }
function setThumbVisible(v){ thumb.style.opacity = v?'1':'0'; }

/* ══ 4. UTILITATS ══ */
function t(k){ return translations[currentLang][k] || k; }
function getTransposedIndex(pc){ return (pc-currentKeyRoot+12)%12; }
function midiToFreq(m){ return 440*Math.pow(2,(m-69)/12); }
function getDegreeNumber(pc){ return ['1','b2','2','b3','3','4','#4','5','b6','6','b7','7'][pc]; }
function formatTime(s){ return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`; }
function shuffleArray(a){ const r=[...a]; for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; } return r; }
function logEv(msg){ console.log('[TONAL]', msg); }
function logSoloTime(){ if(v10LastNoteAt) soloTimes.push(performance.now()-v10LastNoteAt); v10LastNoteAt=performance.now(); v10LastHumanNote=performance.now(); }

function updateLanguageUI(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(translations[currentLang][k]){
      if(el.tagName==='INPUT') el.placeholder=translations[currentLang][k];
      else if(['SPAN','DIV','H2','H3','H4','BUTTON','P','OPTION'].includes(el.tagName)) el.innerHTML=translations[currentLang][k];
    }
  });
  const scMap={'sc-title':'sc_title','sc-lbl-vol':'sc_volume','sc-lbl-fade':'sc_fadein','sc-lbl-atk':'sc_attack','sc-lbl-dec':'sc_decay','sc-lbl-sus':'sc_sustain','sc-lbl-dur':'sc_duration','sc-lbl-bri':'sc_bright'};
  Object.keys(scMap).forEach(id=>{ const el=$(id); if(el) el.textContent=t(scMap[id]); });
  const scTest=$('sc-test'); if(scTest && !scTest.classList.contains('stop')) scTest.textContent=t('test_sound');
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===currentLang));
  const mk=$('key-select'), ek=$('ear-key-select');
  const mv=mk.value||currentKeyRoot, ev=ek.value||currentKeyRoot;
  let html=''; CONFIG.MUSICAL_KEYS.forEach((n,i)=>{ html+=`<option value="${i}">${n} ${t('word_major')}</option>`; });
  mk.innerHTML=html; ek.innerHTML=html; mk.value=mv; ek.value=ev;
  if(battleModal){
    battleModal.querySelector('h2').textContent=t('battle_title');
    battleModal.querySelector('.battle-box > p').textContent=t('battle_description');
    $('btn-battle-start').textContent=t('start_battle_btn');
    const hint=battleModal.querySelector('.battle-hint'); if(hint) hint.textContent=t('battle_enter_hint');
  }
  updateModeDisplay(); updateAccuracyDisplay(); updateDifficultyButtons();
}
function updateModeDisplay(){ modeDisplay.textContent=t('mode_prefix')+exclusiveMode.toUpperCase(); delayConfig.classList.toggle('visible', exclusiveMode==='delay'); }
function updateAccuracyDisplay(){
  if(battleMode){ updateBattleAccuracy(); return; }
  const p=earTotalNotes>0?Math.round(earCorrectNotes/earTotalNotes*100):0;
  accuracyValue.textContent=`${p}%`;
  accuracyDetails.textContent=`${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;
  if(earModeType==='test' && earTrainingActive) accuracyPanel.classList.add('visible');
  else if(!resultModal.classList.contains('visible')) accuracyPanel.classList.remove('visible');
}
function updateDifficultyButtons(){
  $('btn-easy').className='difficulty-btn'+(earDifficulty==='easy'?' active-easy':'');
  $('btn-hard').className='difficulty-btn'+(earDifficulty==='hard'?' active-hard':'');
  renderFilterPanel();
}
function updateModeButtons(){
  $('btn-listen-mode').className='mode-toggle-btn'+(earModeType==='listen'?' active-listen':'');
  $('btn-practice-mode').className='mode-toggle-btn'+(earModeType==='practice'?' active-practice':'');
  $('btn-test-mode').className='mode-toggle-btn'+(earModeType==='test'?' active-test':'');
  $('btn-battle-mode').className='mode-toggle-btn'+(earModeType==='battle'?' active-battle':'');
  renderFilterPanel();
}
function hideAllFeedback(){ if(feedbackHideTimeout){clearTimeout(feedbackHideTimeout);feedbackHideTimeout=null;} feedbackCorrect.className=''; feedbackWrong.className=''; }
function showFeedbackCorrect(){
  if(feedbackHideTimeout) clearTimeout(feedbackHideTimeout);
  if(battleMode){ showThumb(true); return; }
  feedbackCorrect.className='visible'; feedbackWrong.className='';
  feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},1200);
}
function showFeedbackWrong(){
  if(feedbackHideTimeout) clearTimeout(feedbackHideTimeout);
  if(battleMode){ showThumb(false); return; }
  feedbackWrong.className='visible'; feedbackCorrect.className='';
  feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},1200);
}

/* ══ 5. MOTOR D'ÀUDIO ══ */
function getSharedCtx(){ if(!sharedCtx) sharedCtx=new (window.AudioContext||window.webkitAudioContext)(); if(sharedCtx.state==='suspended') sharedCtx.resume(); return sharedCtx; }
function getPianoBus(){ const ctx=getSharedCtx(); if(!pianoBus){ pianoBus=ctx.createDynamicsCompressor(); pianoBus.threshold.value=-20; pianoBus.knee.value=12; pianoBus.ratio.value=4; pianoBus.attack.value=0.003; pianoBus.release.value=0.25; pianoBus.connect(ctx.destination); } return pianoBus; }
function refreshSoundLabels(){
  $('sc-volume-val').textContent=Math.round(pianoTuning.volume*100)+'%';
  $('sc-fadein-val').textContent=Math.round(pianoTuning.fadeIn*1000)+'ms';
  $('sc-attack-val').textContent=Math.round(pianoTuning.attack)+'%';
  $('sc-decay-val').textContent=pianoTuning.decay.toFixed(2)+'s';
  $('sc-sustain-val').textContent=Math.round(pianoTuning.sustain*100)+'%';
  $('sc-duration-val').textContent=pianoTuning.duration.toFixed(1)+'s';
  $('sc-bright-val').textContent=Math.round(pianoTuning.brightness*100)+'%';
}
function syncSoundSliders(){
  $('sc-volume').value=Math.round((pianoTuning.volume-PIANO_VOL_MIN)/(1-PIANO_VOL_MIN)*100);
  $('sc-fadein').value=Math.round(pianoTuning.fadeIn*1000);
  $('sc-attack').value=Math.round(pianoTuning.attack);
  $('sc-decay').value=Math.round(pianoTuning.decay*100);
  $('sc-sustain').value=Math.round(pianoTuning.sustain*100);
  $('sc-duration').value=pianoTuning.duration;
  $('sc-bright').value=Math.round(pianoTuning.brightness*100);
  $('sc-instrument').value=pianoTuning.instrument;
}
function buildPianoVoice(midiNote, baseVolume, useSustain=true){
  const ctx=getSharedCtx();
  if(activeOscillators[midiNote]){
    const {oscillators,masterGain}=activeOscillators[midiNote]; const now=ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now); masterGain.gain.setValueAtTime(masterGain.gain.value,now);
    masterGain.gain.linearRampToValueAtTime(0.001,now+0.05);
    oscillators.forEach(({osc})=>{try{osc.stop(now+0.1);}catch(e){}});
    delete activeOscillators[midiNote];
  }
  const freq=midiToFreq(midiNote); const now=ctx.currentTime;
  const volume=Math.min(0.6, baseVolume*pianoTuning.volume);
  const duration=(sustainPedalActive&&useSustain)?pianoTuning.duration+3:pianoTuning.duration;
  const fadeIn=Math.max(0.0005,pianoTuning.fadeIn);
  const peak=Math.min(0.9, volume*(1+(pianoTuning.attack/100)*0.6));
  const inst=INSTRUMENTS[pianoTuning.instrument]||INSTRUMENTS.piano;
  const masterGain=ctx.createGain();
  if(inst.filter){ const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=inst.filter; f.Q.value=0.7; masterGain.connect(f); f.connect(getPianoBus()); }
  else masterGain.connect(getPianoBus());
  const oscillators=[]; const drift=(Math.random()*8)-4;
  masterGain.gain.setValueAtTime(0,now);
  masterGain.gain.linearRampToValueAtTime(peak,now+fadeIn);
  masterGain.gain.linearRampToValueAtTime(volume*pianoTuning.sustain,now+fadeIn+pianoTuning.decay);
  masterGain.gain.exponentialRampToValueAtTime(0.001,now+duration);
  const b=pianoTuning.brightness;
  const harmonics=inst.harmonics.map((g,i)=>({freq:freq*(i+1),gain:g*b,type:inst.wave}));
  harmonics.forEach(h=>{
    const osc=ctx.createOscillator(); const gain=ctx.createGain();
    osc.type=h.type; osc.frequency.setValueAtTime(h.freq,now); osc.detune.setValueAtTime(drift,now);
    gain.gain.setValueAtTime(h.gain*volume,now); gain.gain.exponentialRampToValueAtTime(0.001,now+duration);
    osc.connect(gain); gain.connect(masterGain); osc.start(now); osc.stop(now+duration);
    oscillators.push({osc,gain});
  });
  activeOscillators[midiNote]={oscillators,masterGain};
}
function createPianoVoice(midiNote, baseVolume, useSustain=true){
  const ctx0=getSharedCtx();
  if(ctx0.state==='suspended'){ ctx0.resume().then(()=>buildPianoVoice(midiNote,baseVolume,useSustain)); return; }
  buildPianoVoice(midiNote,baseVolume,useSustain);
}
function startPianoNote(midiNote, volume=0.3, useSustain=true){ if(!internalPianoEnabled) return; createPianoVoice(midiNote,volume,useSustain); }
function startEarPianoNote(midiNote, volume=0.3){ createPianoVoice(midiNote,volume); }
function stopPianoNote(midiNote){
  if(!activeOscillators[midiNote]) return;
  const ctx=getSharedCtx(); const {oscillators,masterGain}=activeOscillators[midiNote]; const now=ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now); masterGain.gain.setValueAtTime(masterGain.gain.value,now);
  masterGain.gain.exponentialRampToValueAtTime(0.001,now+0.8);
  oscillators.forEach(({osc})=>{try{osc.stop(now+0.8);}catch(e){}});
  delete activeOscillators[midiNote];
}
function stopEarPianoNote(midiNote){ stopPianoNote(midiNote); }
function stopAllPianoNotes(){ Object.keys(activeOscillators).forEach(n=>stopPianoNote(parseInt(n))); activeOscillators={}; }
function stopAllEarPianoNotes(){ stopAllPianoNotes(); }
function updatePianoButtons(){
  const a=$('btn-piano'), b=$('btn-ear-piano');
  if(internalPianoEnabled){ if(a)a.classList.add('active'); if(b)b.classList.add('active'); }
  else { if(a)a.classList.remove('active'); if(b)b.classList.remove('active'); }
}
function startTonicPedal(){
  const ctx=getSharedCtx(); const oct=currentKeyRoot<=5?36:24; const freq=midiToFreq(currentKeyRoot+oct); const now=ctx.currentTime;
  tonicPedalMasterGain=ctx.createGain(); tonicPedalMasterGain.gain.setValueAtTime(0,now); tonicPedalMasterGain.gain.linearRampToValueAtTime(1,now+2); tonicPedalMasterGain.connect(ctx.destination);
  tonicPedalFilter=ctx.createBiquadFilter(); tonicPedalFilter.type='lowpass'; tonicPedalFilter.frequency.value=4000; tonicPedalFilter.Q.value=0.5;
  const bb=ctx.createBiquadFilter(); bb.type='lowshelf'; bb.frequency.value=200; bb.gain.value=6; bb.connect(tonicPedalFilter); tonicPedalFilter.connect(tonicPedalMasterGain);
  tonicPedalOscs=[]; tonicPedalGains=[];
  [{t:'sawtooth',d:0,g:0.4},{t:'triangle',d:0,g:0.35},{t:'sine',d:0,g:0.25}].forEach(cfg=>{
    const o=ctx.createOscillator(); const g=ctx.createGain();
    o.type=cfg.t; o.frequency.value=freq; o.detune.value=cfg.d;
    g.gain.setValueAtTime(0,now); g.gain.linearRampToValueAtTime(pedalVolume*cfg.g,now+2);
    o.connect(g); g.connect(bb); o.start(now);
    tonicPedalOscs.push(o); tonicPedalGains.push(g);
  });
}
function stopTonicPedal(fadeOut=false){
  if(tonicPedalOscs.length){
    const ctx=getSharedCtx(); const now=ctx.currentTime; const tt=fadeOut?3:1.5;
    if(tonicPedalMasterGain){ tonicPedalMasterGain.gain.cancelScheduledValues(now); tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now); tonicPedalMasterGain.gain.linearRampToValueAtTime(0.001,now+tt); }
    tonicPedalOscs.forEach(o=>{try{o.stop(now+tt);}catch(e){}});
    tonicPedalOscs=[]; tonicPedalGains=[]; tonicPedalMasterGain=null; tonicPedalFilter=null;
  }
}
function playNoteWithPedalSound(midiNote){
  const ctx=getSharedCtx(); if(activePedalNotes.has(midiNote)) stopNoteWithPedalSound(midiNote);
  const freq=midiToFreq(midiNote); const now=ctx.currentTime;
  const masterGain=ctx.createGain(); masterGain.gain.setValueAtTime(0,now); masterGain.gain.linearRampToValueAtTime(0.5,now+0.1); masterGain.connect(ctx.destination);
  const bb=ctx.createBiquadFilter(); bb.type='lowshelf'; bb.frequency.value=200; bb.gain.value=6; bb.connect(masterGain);
  const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=4000; f.Q.value=0.5; f.connect(bb);
  const oscs=[];
  [{t:'sawtooth',d:0,g:0.4},{t:'triangle',d:0,g:0.35},{t:'sine',d:0,g:0.25}].forEach(cfg=>{
    const o=ctx.createOscillator(); const g=ctx.createGain();
    o.type=cfg.t; o.frequency.value=freq; o.detune.value=cfg.d;
    g.gain.setValueAtTime(0,now); g.gain.linearRampToValueAtTime(pedalVolume*cfg.g*3,now+0.1);
    o.connect(g); g.connect(f); o.start(now); oscs.push(o);
  });
  activePedalNotes.set(midiNote,{oscs,masterGain});
}
function stopNoteWithPedalSound(midiNote){
  const h=activePedalNotes.get(midiNote); if(!h) return;
  const now=getSharedCtx().currentTime;
  h.masterGain.gain.cancelScheduledValues(now); h.masterGain.gain.setValueAtTime(h.masterGain.gain.value,now); h.masterGain.gain.linearRampToValueAtTime(0.001,now+0.3);
  h.oscs.forEach(o=>{try{o.stop(now+0.3);}catch(e){}});
  activePedalNotes.delete(midiNote);
}
function stopAllPedalSounds(){ Array.from(activePedalNotes.keys()).forEach(n=>stopNoteWithPedalSound(n)); }

/* ══ 6. DELAYS I COMPTADORS ══ */
function stopDelayCountdown(){ if(delayCountdownInterval){clearInterval(delayCountdownInterval);delayCountdownInterval=null;} if(delayCountdownEl) delayCountdownEl.classList.remove('visible'); }
function startDelayCountdown(sec){
  stopDelayCountdown(); if(!delayCountdownEl) return;
  delayCountdownEl.classList.add('visible');
  let remaining=sec; delayCountdownEl.textContent=remaining;
  delayCountdownInterval=setInterval(()=>{ remaining--; if(remaining>0) delayCountdownEl.textContent=remaining; else stopDelayCountdown(); },1000);
}
function cancelDelayProcess(){
  if(delayCheckInterval){clearInterval(delayCheckInterval);delayCheckInterval=null;}
  delayPendingNote=null; delayStartTime=null; stopDelayCountdown();
}
function startDelayProcess(note){
  cancelDelayProcess(); delayPendingNote=note; delayStartTime=performance.now();
  const delaySec=parseInt($('delay-input').value)||4;
  startDelayCountdown(delaySec);
  delayCheckInterval=setInterval(()=>{
    const elapsed=(performance.now()-delayStartTime)/1000;
    if(elapsed>=delaySec){
      cancelDelayProcess();
      if(delayPendingNote!==null && exclusiveMode==='delay'){
        const idx=getTransposedIndex(delayPendingNote%12); const n=CONFIG.NOTE_IMAGES[idx];
        if(n && imgElement){ imgElement.src=CONFIG.IMAGE_PATH+n; imgElement.classList.add('visible'); }
      }
    }
  },50);
}

/* ══ 7. MIDI ══ */
function getMIDIAccess(){ if(!midiAccessPromise){ midiAccessPromise=navigator.requestMIDIAccess().catch(err=>{midiAccessPromise=null;throw err;}); } return midiAccessPromise; }

async function initMIDI(){
  if(IS_TABLET){
    statusElement.textContent=' Mode Tablet (MIDI no disponible)';
    statusElement.style.color='#ffaa00';
    return;
  }
  
  if(IS_MAC && !('requestMIDIAccess' in navigator)){
    statusElement.textContent='🎹 Mac: Utilitza el teclat manual';
    statusElement.style.color='#ffaa00';
    setTimeout(()=>{
      alert('🎹 Estàs utilitzant TONAL EMOTIONS des d\'un Mac.\n\nCom que el MIDI no està disponible, hauràs d\'utilitzar el control manual (teclat a pantalla) per tocar les notes.\n\nPer a totes les funcionalitats, et recomanem utilitzar un PC amb connexió MIDI.');
    },500);
    return;
  }
  
  try{
    const ma=await getMIDIAccess();
    statusElement.textContent=t('midi_connected');
    for(let input of ma.inputs.values()){ 
      input.onmidimessage=handleMIDIMessage; 
      statusElement.textContent=`${t('midi_port')} ${input.name}`; 
    }
    ma.onstatechange=e=>{ 
      if(e.port.type==='input'&&e.port.state==='connected'){ 
        e.port.onmidimessage=handleMIDIMessage; 
        statusElement.textContent=`${t('midi_port')} ${e.port.name}`; 
      } 
    };
  }catch(err){ 
    statusElement.textContent='🎹 Piano intern activat';
    statusElement.style.color='#00ff66';
  }
}

function getNoteToShow(){
  if(exclusiveMode==='normal'){ if(pressedStack.length) return pressedStack[pressedStack.length-1]; if(sustainPedalActive&&normalSustainHold!==null) return normalSustainHold; return null; }
  if(activeNotes.size===0) return null;
  if(exclusiveMode==='lead'||exclusiveMode==='delay') return Math.max(...activeNotes);
  if(exclusiveMode==='bass') return Math.min(...activeNotes);
  return null;
}
function showProposedAnswer(pc){
  const n=CONFIG.NOTE_IMAGES[getTransposedIndex(pc)]; if(!n) return;
  if(battleMode){
    const useP1=battleCurrentPlayer===1; const img=useP1?p1AnswerImage:p2AnswerImage; const box=useP1?p1Box:p2Box;
    img.src=CONFIG.IMAGE_PATH+n; img.classList.add('visible'); box.classList.add('visible');
  } else {
    proposedAnswerImage.src=CONFIG.IMAGE_PATH+n; proposedAnswerImage.classList.add('visible'); proposedAnswerBox.classList.add('visible');
  }
}
function hideProposedAnswer(){
  p1AnswerImage.classList.remove('visible'); p2AnswerImage.classList.remove('visible'); proposedAnswerImage.classList.remove('visible');
  if(!battleMode) proposedAnswerBox.classList.remove('visible');
}
function handleMIDIMessage(event){
  const [status,note,velocity]=event.data; const command=status&0xf0;
  if(command===0x90&&velocity>0){ const now=performance.now(); if(lastNoteOnTime[note]!==undefined&&now-lastNoteOnTime[note]<50) return; lastNoteOnTime[note]=now; }
  const inMidiMode=midiMode&&midiMode.classList.contains('active');
  const inEarMode=earMode&&earMode.classList.contains('active');
  if(!inMidiMode&&!inEarMode){
    if(command===0xB0&&note===64){ const p=velocity>=64; sustainPedalActive=p; if(!p&&internalPianoEnabled) stopAllPianoNotes(); }
    else if(internalPianoEnabled){
      if(command===0x90&&velocity>0) startPianoNote(note,0.3);
      else if(command===0x80||(command===0x90&&velocity===0)){ if(sustainPedalActive) heldByPedal.add(note); else stopPianoNote(note); }
    }
    return;
  }
  if(isPaused) return;
  if(earTrainingActive){
    const pc=note%12; const isTestLike=(earModeType==='test'||earModeType==='battle');
    if(command===0xB0&&note===64){
      const p=velocity>=64; sustainPedalActive=p; sustainLed.classList.toggle('active',p); earSustainLed.classList.toggle('active',p);
      if(!p){ if(internalPianoEnabled) stopAllEarPianoNotes(); const r=Array.from(heldByPedal); heldByPedal.clear(); r.forEach(n=>activeNotes.delete(n)); }
      return;
    }
    if(earModeType==='listen'){
      if(command===0x90&&velocity>0){ if(internalPianoEnabled) startEarPianoNote(note,0.3); }
      else if(command===0x80||(command===0x90&&velocity===0)){ if(internalPianoEnabled){ if(sustainPedalActive) heldByPedal.add(note); else stopEarPianoNote(note); } }
      return;
    }
    if(command===0x90&&velocity>0&&!earUserAlreadyAnswered){ testExploringNoImage=false; if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;} }
    if(earDifficulty==='easy'){
      if(command===0x90&&velocity>0){
        if(!testExploringNoImage&&!testSustainTimeout) showProposedAnswer(pc);
        if(isTestLike&&inAnswerPhase&&!earUserAlreadyAnswered){
          earUserAlreadyAnswered=true; earUserHasPlayed=true; logSoloTime();
          const ok=pc===earCurrentTargetPitchClass;
          if(ok){earCorrectNotes++;showFeedbackCorrect();} else showFeedbackWrong();
          earTotalNotes++; updateAccuracyDisplay();
          if(battleMode) battlePlayerAnswered(ok);
          if(advanceTimeout) clearTimeout(advanceTimeout);
          if(testSustainTimeout) clearTimeout(testSustainTimeout);
          const hideMs=battleMode?BATTLE_HIDE_MS:TEST_IMAGE_MS;
          const advMs=battleMode?BATTLE_ADVANCE_MS:(TEST_IMAGE_MS+TEST_EXPLORE_MS);
          testSustainTimeout=setTimeout(()=>{ testSustainTimeout=null; hideProposedAnswer(); stopEarPianoNote(note); testExploringNoImage=true; },hideMs);
          advanceTimeout=setTimeout(()=>{ if(earTrainingActive) advanceToNextNote(); },advMs);
        } else if(earModeType==='practice'&&inAnswerPhase){
          const ok=pc===earCurrentTargetPitchClass;
          if(ok){ showFeedbackCorrect(); if(advanceTimeout) clearTimeout(advanceTimeout); advanceTimeout=setTimeout(()=>{ if(earTrainingActive) advanceToNextNote(); },1200); }
          else showFeedbackWrong();
        }
      } else if(command===0x80||(command===0x90&&velocity===0)){
        if(internalPianoEnabled&&!testSustainTimeout) stopEarPianoNote(note);
        if(!testSustainTimeout) hideProposedAnswer();
      }
      if(command===0x90&&velocity>0&&internalPianoEnabled) startEarPianoNote(note,0.3);
      return;
    }
    if(command===0x90&&velocity>0){
      if(!testExploringNoImage&&!testSustainTimeout) showProposedAnswer(pc);
      if(!earUserAlreadyAnswered){
        earUserAlreadyAnswered=true; earUserHasPlayed=true; logSoloTime();
        const ok=pc===earCurrentTargetPitchClass;
        if(ok){earCorrectNotes++;showFeedbackCorrect();} else showFeedbackWrong();
        earTotalNotes++; updateAccuracyDisplay();
        if(battleMode) battlePlayerAnswered(ok);
        if(advanceTimeout) clearTimeout(advanceTimeout);
        if(isTestLike){
          const hideMs=battleMode?BATTLE_HIDE_MS:TEST_IMAGE_MS;
          const advMs=battleMode?BATTLE_ADVANCE_MS:(TEST_IMAGE_MS+TEST_EXPLORE_MS);
          if(testSustainTimeout) clearTimeout(testSustainTimeout);
          testSustainTimeout=setTimeout(()=>{ testSustainTimeout=null; hideProposedAnswer(); stopEarPianoNote(note); testExploringNoImage=true; },hideMs);
          advanceTimeout=setTimeout(()=>{ if(earTrainingActive) advanceToNextNote(); },advMs);
        } else advanceTimeout=setTimeout(()=>{ if(earTrainingActive) advanceToNextNote(); },1200);
      }
      if(internalPianoEnabled) startEarPianoNote(note,0.3);
    } else if(command===0x80||(command===0x90&&velocity===0)){
      if(internalPianoEnabled&&!testSustainTimeout){ if(sustainPedalActive) heldByPedal.add(note); else stopEarPianoNote(note); }
      if(!sustainPedalActive&&!testSustainTimeout) hideProposedAnswer();
    }
    return;
  }
  if(internalPianoEnabled){
    if(command===0x90&&velocity>0) startPianoNote(note,0.3);
    else if(command===0x80||(command===0x90&&velocity===0)){ if(sustainPedalActive) heldByPedal.add(note); else stopPianoNote(note); }
  }
  const pc=note%12; const idx=getTransposedIndex(pc);
  if(command===0x90&&velocity>0){
    activeNotes.add(note); if(!pressedStack.includes(note)) pressedStack.push(note); normalSustainHold=null; physicalHeld.add(note); heldByPedal.delete(note);
    if(inEarMode&&!earTrainingActive&&wrappers[idx]){ wrappers[idx].style.display='block'; wrappers[idx].classList.add('visible'); wrappers[idx].style.opacity='1'; }
    if(exclusiveMode==='multi'&&wrappers[idx]){ wrappers[idx].style.display='block'; wrappers[idx].classList.add('visible'); wrappers[idx].style.opacity='1'; }
    if(exclusiveMode==='complete'&&wrappers[idx]&&wrappers[idx].noteNumber) wrappers[idx].noteNumber.classList.add('active-note');
    if(exclusiveMode==='delay'){ const pr=[...physicalHeld]; if(pr.length===1) startDelayProcess(pr[0]); else cancelDelayProcess(); }
    if(exclusiveMode==='normal'||exclusiveMode==='lead'||exclusiveMode==='bass'){
      const nt=getNoteToShow();
      if(nt!==null){ const n=CONFIG.NOTE_IMAGES[getTransposedIndex(nt%12)]; if(n){ imgElement.src=CONFIG.IMAGE_PATH+n; imgElement.classList.add('visible'); } }
    }
  } else if(command===0x80||(command===0x90&&velocity===0)){
    pressedStack=pressedStack.filter(n=>n!==note); physicalHeld.delete(note);
    if(pressedStack.length===0&&sustainPedalActive) normalSustainHold=note; else if(pressedStack.length) normalSustainHold=null;
    if(sustainPedalActive) heldByPedal.add(note);
    else{
      activeNotes.delete(note);
      if(inEarMode&&!earTrainingActive&&wrappers[idx]){ wrappers[idx].classList.remove('visible'); wrappers[idx].style.opacity='0'; wrappers[idx].style.display='none'; }
      if(exclusiveMode==='multi'&&wrappers[idx]){ wrappers[idx].classList.remove('visible'); wrappers[idx].style.opacity='0'; }
      if(exclusiveMode==='complete'&&wrappers[idx]&&wrappers[idx].noteNumber) wrappers[idx].noteNumber.classList.remove('active-note');
      if(exclusiveMode==='delay') cancelDelayProcess();
      if(exclusiveMode==='normal'||exclusiveMode==='lead'||exclusiveMode==='bass'){
        const nt=getNoteToShow();
        if(nt===null) imgElement.classList.remove('visible');
        else{ const n=CONFIG.NOTE_IMAGES[getTransposedIndex(nt%12)]; if(n){ imgElement.src=CONFIG.IMAGE_PATH+n; imgElement.classList.add('visible'); } }
      }
    }
  }
}

/* ══ 8. EAR TRAINING ══ */
function generateEarSequence(){
  const d=[0,2,4,5,7,9,11], nd=[1,3,6,8,10]; let allowed;
  if(earNoteMode==='diatonic') allowed=d.filter(x=>earFilterDiat.has(x));
  else if(earNoteMode==='non-diatonic') allowed=nd.filter(x=>earFilterNonDiat.has(x));
  else allowed=[0,1,2,3,4,5,6,7,8,9,10,11].filter(x=>earFilterAll.has(x));
  if(allowed.length<2) allowed=(earNoteMode==='diatonic')?d:(earNoteMode==='non-diatonic')?nd:[0,1,2,3,4,5,6,7,8,9,10,11];
  let pool=[];
  for(let o=2;o<=7;o++) for(let g of allowed){ const m=currentKeyRoot+g+o*12; if(m>=36&&m<=96) pool.push(m); }
  let s=shuffleArray(pool);
  for(let i=2;i<s.length;i++){
    const a=(s[i]-currentKeyRoot)%12,b=(s[i-1]-currentKeyRoot)%12,c=(s[i-2]-currentKeyRoot)%12;
    if(a===b&&b===c){ for(let j=i+1;j<s.length;j++){ if((s[j]-currentKeyRoot)%12!==a){ [s[i],s[j]]=[s[j],s[i]]; break; } } }
  }
  return s;
}
function startEarTraining(){
  getSharedCtx(); earTrainingActive=true; earPanel.classList.add('running');
  earTimeRemaining=parseInt($('ear-duration-full').value)*60;
  earSequence=generateEarSequence(); earCurrentIndex=0; earCurrentTargetPitchClass=null;
  earUserAlreadyAnswered=false; earCorrectNotes=0; earTotalNotes=0; earUserHasPlayed=false; soloTimes=[];
  hasAdvanced=false; pauseCount=0; pausedByUser=false; inAnswerPhase=false; consecutivePauses=0; totalPauses=0; testExploringNoImage=false; battleLastQ=0;
  if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}
  if(earModeType==='test'||earModeType==='battle') accuracyPanel.classList.remove('visible');
  proposedAnswerBox.classList.remove('visible'); resultModal.classList.remove('visible'); hideAllFeedback();
  thinkingEmoji.classList.remove('visible'); imgElement.style.display=''; imgElement.classList.remove('visible');
  Object.values(wrappers).forEach(w=>{ w.style.display='none'; w.style.opacity='0'; w.classList.remove('visible','active-note'); if(w.noteNumber) w.noteNumber.classList.remove('visible','active-note'); });
  $('btn-ear-start-full').style.display='none'; $('btn-ear-stop-full').style.display='block'; $('btn-help-ear').style.display='none';
  ['ear-duration-full','ear-delay-input-full','ear-key-select'].forEach(id=>$(id).disabled=true);
  document.querySelectorAll('.ear-mode-btn').forEach(b=>b.disabled=true);
  $('btn-easy').disabled=true; $('btn-hard').disabled=true;
  $('btn-test-mode').disabled=true; $('btn-practice-mode').disabled=true; $('btn-listen-mode').disabled=true; $('btn-battle-mode').disabled=true;
  if(sdActive) $('ear-timer-full').style.display='none';
  else { $('ear-timer-full').style.display=''; $('ear-timer-full').textContent=formatTime(earTimeRemaining); }
  if(earNoteMode==='all'&&earDifficulty==='hard'&&earModeType==='test'&&earFilterAll.size>=12){
    hardcoreWarning.classList.add('visible');
    hardcoreTimeout=setTimeout(()=>{ hardcoreWarning.classList.remove('visible'); hardcoreTimeout=null; startWarmup(); },12000);
  } else startWarmup();
  earFilterPanelVisible=false; hideFilterInfo(); renderFilterPanel();
  if(battleMode){ positionBattleBoxes(); showBattleTurn(); }
}
function startWarmup(){
  if(earDifficulty!=='easy') startTonicPedal();
  const ov=$('warmup-overlay'), cd=$('warmup-countdown');
  ov.classList.add('visible');
  warmupText.textContent=(earDifficulty==='easy')?t('listen_cadence'):t('listen_tonic');
  let c=5; cd.textContent=c;
  if(warmupInterval) clearInterval(warmupInterval);
  warmupInterval=setInterval(()=>{
    c--;
    if(c>0) cd.textContent=c;
    else if(c===0) cd.textContent=t('let_s_go');
    else{ clearInterval(warmupInterval); warmupInterval=null; ov.classList.remove('visible'); startMainTimer(); }
  },1000);
}
function startMainTimer(){
  if(!sdActive){
    earTimer=setInterval(()=>{
      if(!isPaused){
        earTimeRemaining--;
        if(earTimeRemaining<=0){
          earTimeRemaining=0;
          if(!sdActive) $('ear-timer-full').textContent=formatTime(0);
          if(battleMode&&bp1.total!==bp2.total){ battleLastQ=((inAnswerPhase&&!earUserAlreadyAnswered)||cadenceTimeouts.length>0)?2:1; clearInterval(earTimer); earTimer=null; }
          else stopEarTraining(true);
        } else if(!sdActive) $('ear-timer-full').textContent=formatTime(earTimeRemaining);
      }
    },1000);
  }
  playEarNote(); updateFilterInfo();
}
function playEarNote(){
  if(!earTrainingActive||hasAdvanced||isPaused) return;
  testExploringNoImage=false;
  if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}
  if(earCurrentIndex>=earSequence.length){ earSequence=generateEarSequence(); earCurrentIndex=0; }
  const ci=earCurrentIndex; const midiNote=earSequence[ci]; const pc=midiNote%12;
  const delaySec=parseInt($('ear-delay-input-full').value)||4;
  earCurrentTargetPitchClass=pc; earUserAlreadyAnswered=false; hasAdvanced=false; inAnswerPhase=false;
  hideAllFeedback(); hideProposedAnswer(); imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible');
  if(earModeType==='practice') proposedAnswerBox.classList.add('mid-position'); else proposedAnswerBox.classList.remove('mid-position');
  Object.values(wrappers).forEach(w=>{ w.style.display='none'; w.style.opacity='0'; w.classList.remove('visible','active-note'); if(w.noteNumber) w.noteNumber.classList.remove('visible','active-note'); });
  const onTimeout=()=>{
    stopDelayCountdown(); thinkingEmoji.classList.remove('visible');
    if(!earTrainingActive||hasAdvanced||earCurrentIndex!==ci) return;
    if(earModeType==='listen'){
      const n=CONFIG.NOTE_IMAGES[getTransposedIndex(pc)];
      if(n){ imgElement.src=CONFIG.IMAGE_PATH+n; imgElement.classList.add('visible'); }
      if(listenDisplayTimeout) clearTimeout(listenDisplayTimeout);
      listenDisplayTimeout=setTimeout(()=>{
        if(earTrainingActive&&!hasAdvanced&&earCurrentIndex===ci){
          hasAdvanced=true; imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible'); earCurrentIndex++;
          setTimeout(()=>{ if(earTrainingActive){ hasAdvanced=false; playEarNote(); } },300);
        }
      },3000);
      return;
    }
    if(!earUserAlreadyAnswered){
      earUserAlreadyAnswered=true; logSoloTime(); earTotalNotes++; updateAccuracyDisplay(); showFeedbackWrong();
      if(battleMode){ logEv('⏱ J'+battleCurrentPlayer+' TIMEOUT'); battlePlayerAnswered(false); }
      if(showCorrectTimeout) clearTimeout(showCorrectTimeout);
      const advMs=battleMode?BATTLE_ADVANCE_MS:1200;
      showCorrectTimeout=setTimeout(()=>{ if(earTrainingActive&&!hasAdvanced&&earCurrentIndex===ci) advanceToNextNote(); },advMs);
    }
  };
  if(earDifficulty==='easy'){
    playCadenceWithPedalSound(()=>{
      inAnswerPhase=true;
      if(earModeType==='listen') thinkingEmoji.classList.add('visible');
      startEarPianoNote(midiNote,0.3); startDelayCountdown(delaySec);
      if(earImageTimeout) clearTimeout(earImageTimeout);
      earImageTimeout=setTimeout(onTimeout,delaySec*1000);
    });
  } else {
    inAnswerPhase=true; startEarPianoNote(midiNote,0.3); startDelayCountdown(delaySec);
    if(earModeType==='listen') thinkingEmoji.classList.add('visible');
    if(earImageTimeout) clearTimeout(earImageTimeout);
    earImageTimeout=setTimeout(onTimeout,delaySec*1000);
  }
}
function advanceToNextNote(){
  if(hasAdvanced||!earTrainingActive) return;
  if(battleMode&&battleLastQ===2){ stopEarTraining(false); return; }
  if(battleMode&&battleLastQ===1) battleLastQ=2;
  hasAdvanced=true; testExploringNoImage=false;
  if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}
  [earImageTimeout,showCorrectTimeout,advanceTimeout].forEach(t0=>{ if(t0) clearTimeout(t0); });
  earImageTimeout=showCorrectTimeout=advanceTimeout=null;
  hideAllFeedback(); hideProposedAnswer(); imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible');
  earCurrentIndex++;
  setTimeout(()=>{ if(earTrainingActive){ hasAdvanced=false; playEarNote(); } },200);
}
function stopEarTraining(fadeOut=false){
  const wasBattle=battleMode;
  earTrainingActive=false; hasAdvanced=false; battleLastQ=0; earPanel.classList.remove('running');
  stopDelayCountdown(); stopCadence();
  if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}
  testExploringNoImage=false;
  if(hardcoreTimeout){clearTimeout(hardcoreTimeout);hardcoreTimeout=null;}
  hardcoreWarning.classList.remove('visible');
  if(warmupInterval){clearInterval(warmupInterval);warmupInterval=null;}
  if(earTimer) clearInterval(earTimer);
  [earImageTimeout,showCorrectTimeout,advanceTimeout,feedbackHideTimeout,listenDisplayTimeout].forEach(t0=>{ if(t0) clearTimeout(t0); });
  stopTonicPedal(fadeOut); stopAllEarPianoNotes(); hideAllFeedback();
  imgElement.classList.remove('visible'); thinkingEmoji.classList.remove('visible'); hideProposedAnswer();
  $('warmup-overlay').classList.remove('visible');
  $('btn-ear-start-full').style.display='block'; $('btn-ear-stop-full').style.display='none'; $('btn-help-ear').style.display='';
  ['ear-duration-full','ear-delay-input-full','ear-key-select'].forEach(id=>$(id).disabled=false);
  $('btn-easy').disabled=false; $('btn-hard').disabled=false;
  document.querySelectorAll('.ear-mode-btn').forEach(b=>b.disabled=false);
  $('btn-test-mode').disabled=false; $('btn-practice-mode').disabled=false; $('btn-listen-mode').disabled=false; $('btn-battle-mode').disabled=false;
  const durVal=parseInt($('ear-duration-full').value)||5;
  $('ear-timer-full').style.display=''; $('ear-timer-full').textContent=formatTime(durVal*60);
  if(wasBattle){
    cleanupBattleUI();
    if(earUserHasPlayed){ updateBattleAccuracy(); battleResultTimeout=setTimeout(()=>{ battleResultTimeout=null; showBattleResultModal(); },500); }
  } else if(earModeType==='test'&&earUserHasPlayed){
    updateAccuracyDisplay(); accuracyPanel.classList.add('visible'); setTimeout(showResultMessage,500);
  } else accuracyPanel.classList.remove('visible');
  hideFilterInfo(); renderFilterPanel();
}
function playCadenceWithPedalSound(cb){
  const root=currentKeyRoot+36, fourth=(currentKeyRoot+5)%12+24, fifth=(currentKeyRoot+7)%12+24;
  stopAllPedalSounds(); cadenceTimeouts.forEach(t0=>clearTimeout(t0)); cadenceTimeouts=[];
  playNoteWithPedalSound(root);
  cadenceTimeouts.push(setTimeout(()=>{ stopNoteWithPedalSound(root); playNoteWithPedalSound(fourth); },1000));
  cadenceTimeouts.push(setTimeout(()=>{ stopNoteWithPedalSound(fourth); playNoteWithPedalSound(fifth); },2000));
  cadenceTimeouts.push(setTimeout(()=>{
    stopNoteWithPedalSound(fifth); playNoteWithPedalSound(root);
    cadenceTimeouts.push(setTimeout(()=>{ stopNoteWithPedalSound(root); if(cb) cb(); },2000));
  },3000));
}
function stopCadence(){ cadenceTimeouts.forEach(t0=>clearTimeout(t0)); cadenceTimeouts=[]; stopAllPedalSounds(); }
function pauseEarTraining(){
  if(!earTrainingActive||isPaused) return;
  pauseCount++; consecutivePauses++; totalPauses++;
  if(consecutivePauses>10){ resultMessage.textContent=t('pause_cheat'); resultPercentage.textContent='-'; resultDetails.textContent=`${totalPauses} pauses`; resultModal.classList.add('visible'); stopEarTraining(false); return; }
  isPaused=true; pausedByUser=true; pauseModal.classList.add('visible');
  if(tonicPedalMasterGain&&sharedCtx){ const now=sharedCtx.currentTime; tonicPedalMasterGain.gain.cancelScheduledValues(now); tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now); tonicPedalMasterGain.gain.linearRampToValueAtTime(0,now+1.5); }
}
function resumeEarTraining(){
  if(!isPaused) return;
  isPaused=false; pauseModal.classList.remove('visible'); consecutivePauses=0;
  if(tonicPedalMasterGain&&sharedCtx){ const now=sharedCtx.currentTime; tonicPedalMasterGain.gain.cancelScheduledValues(now); tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now); tonicPedalMasterGain.gain.linearRampToValueAtTime(1,now+1); }
}
function abortEarTraining(){ if(!isPaused) return; isPaused=false; pauseModal.classList.remove('visible'); stopEarTraining(false); }
function showResultMessage(){
  if(earModeType!=='test'||!earUserHasPlayed) return;
  const p=earTotalNotes>0?Math.round(earCorrectNotes/earTotalNotes*100):0;
  resultPercentage.textContent=`${p}%`;
  resultDetails.textContent=`${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;
  const filtered=(earFilterDiat.size<7)||(earFilterNonDiat.size<5)||(earFilterAll.size<12);
  let m='';
  if(p===100) m=t('result_crack');
  else if(p>=90) m=(earNoteMode==='diatonic')?t('result_diat').replace('{X}',p):(earNoteMode==='non-diatonic')?t('result_non_diat').replace('{X}',p):t('result_excel');
  else if(p>=70) m=t('result_good').replace('{X}',p);
  else if(p<30&&earTotalNotes>10) m=t('result_short');
  else m=t('result_keep').replace('{X}',p);
  if(filtered) m+=' '+t('result_filtered').replace('{X}',p);
  resultMessage.textContent=m;
  resultModal.classList.add('visible');
}

/* ══ 9. BATALLA ══ */
function showBattleModal(){ battleModal.classList.add('visible'); $('battle-player1-name').value=battlePlayer1Name; $('battle-player2-name').value=battlePlayer2Name; setTimeout(()=>$('battle-player1-name').focus(),50); }
function hideBattleModal(){ battleModal.classList.remove('visible'); }
function startBattle(){
  battlePlayer1Name=$('battle-player1-name').value.trim()||(t('player')+' 1');
  battlePlayer2Name=$('battle-player2-name').value.trim()||(t('player')+' 2');
  bp1={correct:0,total:0,times:[]}; bp2={correct:0,total:0,times:[]};
  battleCurrentPlayer=1; battleMode=true;
  sdActive=false; sdCount=0; sdWinner=null; sdPairMiss=[false,false]; sdPairAns=0; sdTotalPairs=0; naturalEnd=false;
  hideBattleModal(); document.body.classList.add('battle-on');
  battleScoreboard.classList.add('visible'); p1Box.classList.add('visible'); p2Box.classList.add('visible');
  proposedAnswerBox.classList.remove('visible'); accuracyPanel.classList.remove('visible'); resultModal.classList.remove('visible'); hideAllFeedback();
  $('p1-name-label').textContent=battlePlayer1Name; $('p2-name-label').textContent=battlePlayer2Name;
  updateBattleScoreboard(); updateBattleAccuracy(); positionBattleBoxes();
  startEarTraining(); showBattleTurn();
}
function positionBattleBoxes(){
  if(!p1Box.classList.contains('visible')) return;
  const r=earPanel.getBoundingClientRect(); let top=r.bottom+12;
  const h=Math.max(p1Box.offsetHeight||220,p2Box.offsetHeight||220);
  const maxTop=innerHeight-h-90; if(top>maxTop) top=Math.max(90,maxTop);
  p1Box.style.top=top+'px'; p2Box.style.top=top+'px';
}
function showBattleTurn(){
  if(!battleMode) return;
  const name=battleCurrentPlayer===1?battlePlayer1Name:battlePlayer2Name;
  battleTurnIndicator.textContent='🎯 '+t('battle_your_turn').replace('{X}',name);
  battleTurnIndicator.classList.add('visible');
  if(turnIndicatorTimeout) clearTimeout(turnIndicatorTimeout);
  turnIndicatorTimeout=setTimeout(()=>{ battleTurnIndicator.classList.remove('visible'); turnIndicatorTimeout=null; },BATTLE_TURN_MS);
  updateBattleScoreboard();
}
function updateBattleScoreboard(){
  if(!battleMode) return;
  $('battle-p1-name').textContent=battlePlayer1Name; $('battle-p2-name').textContent=battlePlayer2Name;
  $('battle-p1-score').textContent=bp1.correct; $('battle-p2-score').textContent=bp2.correct;
  $('battle-p1-display').classList.toggle('active',battleCurrentPlayer===1);
  $('battle-p2-display').classList.toggle('active',battleCurrentPlayer===2);
  p1Box.classList.toggle('active-turn',battleCurrentPlayer===1);
  p2Box.classList.toggle('active-turn',battleCurrentPlayer===2);
}
function updateBattleAccuracy(){
  const p1p=bp1.total?Math.round(bp1.correct/bp1.total*100):0;
  const p2p=bp2.total?Math.round(bp2.correct/bp2.total*100):0;
  p1AccuracyValue.textContent=p1p+'%'; p1AccuracyDetails.textContent=`${bp1.correct} / ${bp1.total} ${t('word_notes')}`;
  p2AccuracyValue.textContent=p2p+'%'; p2AccuracyDetails.textContent=`${bp2.correct} / ${bp2.total} ${t('word_notes')}`;
}
function battlePlayerAnswered(ok){
  if(!battleMode) return;
  if(v10PendingFlash){clearTimeout(v10PendingFlash);v10PendingFlash=null;}
  if(v10PendingTurn){clearTimeout(v10PendingTurn);v10PendingTurn=null;}
  setFlashVisible(false); battleTurnIndicator.classList.remove('visible');
  const answerer=battleCurrentPlayer; const cur=answerer===1?bp1:bp2;
  if(!cur.times) cur.times=[];
  const isTimeout=!sdActive&&!ok&&(performance.now()-v10LastHumanNote)>2000;
  cur.total++;
  let fmsg,fcol;
  if(ok){cur.correct++; fmsg='✔ '+t('v10_flash_nice'); fcol='#00ff66';}
  else{ fmsg=isTimeout?('⏱ '+t('v10_timeout')):('✖ '+t('v10_flash_miss')); fcol=isTimeout?'#ffaa00':'#ff0055'; }
  cur.times.push(performance.now()-(v10LastNoteAt||performance.now()));
  if(sdActive){ sdPairAns++; if(!ok) sdPairMiss[answerer-1]=true; }
  battleCurrentPlayer=answerer===1?2:1;
  updateBattleAccuracy(); updateBattleScoreboard();
  v10PendingFlash=setTimeout(()=>{ v10PendingFlash=null; if(battleMode) v10Flash(fmsg,fcol); },800);
  v10PendingTurn=setTimeout(()=>{ v10PendingTurn=null; if(battleMode) showBattleTurn(); },1600);
  if(sdActive&&sdPairAns>=2){
    const m1=sdPairMiss[0], m2=sdPairMiss[1];
    if(m1!==m2){ sdWinner=m1?2:1; stopEarTraining(false); }
    else{ sdPairMiss=[false,false]; sdPairAns=0; sdTotalPairs++; if(sdTotalPairs>=30){ showBattleResultModal(); stopEarTraining(false); } }
  }
}
function v10Flash(txt,color){ flash.textContent=txt; flash.style.color=color; setFlashVisible(true); if(flashTO) clearTimeout(flashTO); flashTO=setTimeout(()=>setFlashVisible(false),700); }
function showThumb(ok){
  const isP1=battleCurrentPlayer===1; const box=isP1?p1Box:p2Box;
  thumb.textContent=ok?'👍':'';
  const scale=(typeof currentZoom==='number'?currentZoom:100)/100;
  const r=box.getBoundingClientRect();
  thumb.style.left=((isP1?(r.right-24):(r.left+24))/scale)+'px';
  thumb.style.top=((r.top+20)/scale)+'px';
  setThumbVisible(true);
  if(thumbTO) clearTimeout(thumbTO);
  thumbTO=setTimeout(()=>setThumbVisible(false),700);
}
function ensureBattleResultImg(){
  if(battleResultImg) return battleResultImg;
  battleResultImg=document.createElement('img'); battleResultImg.id='battle-result-img';
  battleResultImg.style.cssText='width:100%;max-height:230px;object-fit:cover;border-radius:14px;margin-bottom:16px;border:2px solid #ffaa00;display:none;';
  battleResultModal.insertBefore(battleResultImg,battleResultModal.firstChild);
  return battleResultImg;
}
function battleResultImageFile(){
  if(bp1.correct===bp2.correct) return 'battle_draw.png';
  const p1wins=bp1.correct>bp2.correct; const wc=p1wins?bp1.correct:bp2.correct; const wt=p1wins?bp1.total:bp2.total;
  if(wt>0&&wc===wt) return 'battle_perfect.png';
  if(Math.abs(bp1.correct-bp2.correct)>=3) return 'battle_ko.png';
  return 'battle_win.png';
}
function showBattleResultModal(){
  sdActive=false; let txt;
  if(sdWinner){ txt=t('battle_winner').replace('{X}', sdWinner===1?battlePlayer1Name:battlePlayer2Name); sdWinner=null; }
  else if(bp1.correct>bp2.correct) txt=t('battle_winner').replace('{X}',battlePlayer1Name);
  else if(bp2.correct>bp1.correct) txt=t('battle_winner').replace('{X}',battlePlayer2Name);
  else txt=t('battle_tie');
  $('battle-winner-name').textContent=txt;
  $('battle-stat-p1-name').textContent=battlePlayer1Name; $('battle-stat-p1-score').textContent=`${bp1.correct} / ${bp1.total}`;
  $('battle-stat-p2-name').textContent=battlePlayer2Name; $('battle-stat-p2-score').textContent=`${bp2.correct} / ${bp2.total}`;
  const img=ensureBattleResultImg(); img.src=CONFIG.IMAGE_PATH+battleResultImageFile(); img.style.display='block';
  battleResultModal.classList.add('visible');
}
function cleanupBattleUI(){
  if(battleResultTimeout){clearTimeout(battleResultTimeout);battleResultTimeout=null;}
  battleResultModal.classList.remove('visible'); battleMode=false;
  document.body.classList.remove('battle-on'); battleScoreboard.classList.remove('visible'); battleTurnIndicator.classList.remove('visible');
  if(turnIndicatorTimeout){clearTimeout(turnIndicatorTimeout);turnIndicatorTimeout=null;}
  p1Box.classList.remove('visible','active-turn'); p1AnswerImage.classList.remove('visible');
  p2Box.classList.remove('visible','active-turn'); p2AnswerImage.classList.remove('visible');
  proposedAnswerBox.classList.remove('visible','active-turn'); accuracyPanel.classList.remove('visible','active-turn');
  sdActive=false; sdPairAns=0; sdPairMiss=[false,false]; sdTotalPairs=0;
}

/* ══ 10. FILTRE I TECLAT MANUAL ══ */
function filterSet(){ return earNoteMode==='non-diatonic'?earFilterNonDiat:(earNoteMode==='all'?earFilterAll:earFilterDiat); }
function filterOrder(){ return earNoteMode==='non-diatonic'?[1,3,6,8,10]:(earNoteMode==='all'?[0,1,2,3,4,5,6,7,8,9,10,11]:[0,11,2,7,4,5,9]); }
function filterButtonShouldShow(){ return earMode.classList.contains('active')&&!earTrainingActive; }
function updateManualButtonsVisibility(){
  const buttons=document.querySelectorAll('.manual-btn'); const cont=document.querySelector('.manual-buttons'); let vc=0;
  buttons.forEach(b=>{
    const d=parseInt(b.dataset.degree); let shouldShow=false;
    if(midiMode.classList.contains('active')) shouldShow=true;
    else if(earMode.classList.contains('active')){
      if(earNoteMode==='diatonic') shouldShow=earFilterDiat.has(d);
      else if(earNoteMode==='non-diatonic') shouldShow=earFilterNonDiat.has(d);
      else shouldShow=earFilterAll.has(d);
    }
    b.style.display=shouldShow?'flex':'none'; if(shouldShow) vc++;
  });
  if(vc===0) vc=1;
  if(cont) cont.style.gridTemplateColumns=(vc<=7)?`repeat(${vc},1fr)`:'repeat(6,1fr)';
  renderFilterPanel();
}
function buildFilterUI(){
  if(filterBtn) return;
  const st=document.createElement('style');
  st.textContent='#btn-ear-filter{position:absolute;top:6px;left:calc(100% + 8px);z-index:400;background:#222831;border:1px solid #8c52ff;color:#eee;border-radius:8px;padding:4px 8px;cursor:pointer;font-size:11px;}#ear-filter-panel{position:absolute;top:50px;left:calc(100% + 8px);z-index:400;background:#12161cee;border:1px solid #8c52ff;border-radius:12px;padding:12px 14px;flex-direction:column;gap:8px;min-width:230px;}#ear-filter-panel .ear-filter-title{color:#8c52ff;font-weight:bold;font-size:14px;}#ear-filter-panel .ear-filter-row{display:flex;gap:6px;flex-wrap:nowrap;}#ear-filter-panel .ear-filter-cell{width:38px;height:38px;border-radius:8px;border:2px solid #444;background:#1c222b;color:#777;font-weight:bold;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;}#ear-filter-panel .ear-filter-cell.on{border-color:#39d98a;color:#fff;background:#123324;}#ear-filter-panel .ear-filter-hint{color:#888;font-size:11px;}';
  document.head.appendChild(st);
  filterBtn=document.createElement('button'); filterBtn.id='btn-ear-filter'; filterBtn.style.display='none';
  let host=$('ear-key-select');
  while(host&&host.parentElement&&host.parentElement!==earMode) host=host.parentElement;
  if(!host||host===earMode) host=earMode;
  host.style.position='relative'; host.appendChild(filterBtn);
  filterPanel=document.createElement('div'); filterPanel.id='ear-filter-panel'; filterPanel.style.display='none';
  filterTitleEl=document.createElement('div'); filterTitleEl.className='ear-filter-title';
  filterRowEl=document.createElement('div'); filterRowEl.className='ear-filter-row';
  filterHintEl=document.createElement('div'); filterHintEl.className='ear-filter-hint';
  filterPanel.appendChild(filterTitleEl); filterPanel.appendChild(filterRowEl); filterPanel.appendChild(filterHintEl);
  host.appendChild(filterPanel);
  filterBtn.addEventListener('click',()=>{ earFilterPanelVisible=!earFilterPanelVisible; renderFilterPanel(); updateManualButtonsVisibility(); });
}
function renderFilterPanel(){
  if(!filterBtn) buildFilterUI();
  const show=filterButtonShouldShow();
  filterBtn.style.display=show?'block':'none';
  if(show) filterBtn.textContent=(earModeType==='test')?t('filter_btn_test'):(earModeType==='listen')?t('filter_btn_listen'):(earModeType==='battle')?t('filter_btn_battle'):t('filter_btn_practice');
  if(!show||!earFilterPanelVisible){ filterPanel.style.display='none'; return; }
  filterPanel.style.display='flex';
  filterTitleEl.textContent=t('filter_title'); filterHintEl.textContent=t('filter_hint'); filterRowEl.innerHTML='';
  const set=filterSet();
  filterOrder().forEach(d=>{
    const c=document.createElement('button');
    c.className='ear-filter-cell'+(set.has(d)?' on':'');
    c.textContent=getDegreeNumber(d);
    c.addEventListener('click',()=>{
      if(set.has(d)){ if(set.size<=2) return; set.delete(d); } else set.add(d);
      renderFilterPanel(); updateManualButtonsVisibility();
    });
    filterRowEl.appendChild(c);
  });
}
function ensureFilterInfo(){
  if(filterInfoEl) return filterInfoEl;
  filterInfoEl=document.createElement('div'); filterInfoEl.id='ear-filter-info';
  filterInfoEl.style.cssText='position:absolute;top:6px;left:calc(100% + 8px);z-index:400;background:#12161cee;border:1px solid #39d98a;color:#7ff0b4;border-radius:8px;padding:4px 10px;font-size:12px;font-weight:bold;display:none;white-space:nowrap;';
  (filterBtn?filterBtn.parentElement:document.body).appendChild(filterInfoEl);
  return filterInfoEl;
}
function updateFilterInfo(){
  const el=ensureFilterInfo();
  if(!earTrainingActive){ el.style.display='none'; return; }
  let txt='';
  if(earNoteMode==='diatonic') txt=(earFilterDiat.size>=7)?t('filter_info_all_diat'):t('filter_info_some')+[0,11,2,7,4,5,9].filter(d=>earFilterDiat.has(d)).map(getDegreeNumber).join(' ');
  else if(earNoteMode==='non-diatonic') txt=(earFilterNonDiat.size>=5)?t('filter_info_all_nondiat'):t('filter_info_some')+[1,3,6,8,10].filter(d=>earFilterNonDiat.has(d)).map(getDegreeNumber).join(' ');
  else txt=(earFilterAll.size>=12)?t('filter_info_all'):t('filter_info_some')+[0,1,2,3,4,5,6,7,8,9,10,11].filter(d=>earFilterAll.has(d)).map(getDegreeNumber).join(' ');
  el.textContent=txt; el.style.display='block';
}
function hideFilterInfo(){ if(filterInfoEl) filterInfoEl.style.display='none'; }
function toggleManualPanel(){
  // En mode Listen, no permetre obrir el control manual
  if(earMode.classList.contains('active') && earModeType==='listen'){
    return;
  }
  
  manualPanelVisible=!manualPanelVisible;
  manualPanel.classList.toggle('visible',manualPanelVisible);
  if(earMode.classList.contains('active')) manualPanel.classList.add('ear-position'); else manualPanel.classList.remove('ear-position');
  $('btn-toggle-manual').classList.toggle('active',manualPanelVisible);
  $('btn-toggle-manual-ear').classList.toggle('active',manualPanelVisible);
  if(manualPanelVisible&&!internalPianoEnabled){
    internalPianoEnabled=true; updatePianoButtons();
    if(earMode.classList.contains('active')) $('btn-ear-piano').classList.add('active'); else $('btn-piano').classList.add('active');
    getSharedCtx();
  }
  updateManualButtonsVisibility();
}

function activateManualNote(d){
  if(activeManualNotes.has(d)) return;
  activeManualNotes.add(d);
  handleMIDIMessage({data:[0x90,currentKeyRoot+d+60,100]});
  const b=document.querySelector(`.manual-btn[data-degree="${d}"]`); if(b) b.classList.add('active');
}
function deactivateManualNote(d){
  if(!activeManualNotes.has(d)) return;
  activeManualNotes.delete(d);
  handleMIDIMessage({data:[0x80,currentKeyRoot+d+60,0]});
  const b=document.querySelector(`.manual-btn[data-degree="${d}"]`); if(b) b.classList.remove('active');
}

/* ══ 11. LAYOUT DE NOTES I DRAG ══ */
try{ const s=localStorage.getItem(CONFIG.STORAGE_KEYS.LAYOUT); noteData=s?JSON.parse(s):JSON.parse(JSON.stringify(CONFIG.DEFAULT_LAYOUT)); }
catch(e){ noteData=JSON.parse(JSON.stringify(CONFIG.DEFAULT_LAYOUT)); }
Object.keys(noteData).forEach(ni=>{
  const d=noteData[ni];
  const w=document.createElement('div'); w.className='note-wrapper';
  w.style.left=d.x+'%'; w.style.top=d.y+'%'; w.style.zIndex=d.z||10; w.dataset.noteIndex=ni;
  const img=document.createElement('img'); img.className='note-img'; img.src=CONFIG.IMAGE_PATH+d.name; img.style.width=(d.size*100/CONFIG.DESIGN_WIDTH)+'vw';
  const num=document.createElement('div'); num.className='note-number'; num.textContent=getDegreeNumber(parseInt(ni));
  if(CONFIG.CENTERED_NUMBERS.includes(parseInt(ni))) num.classList.add('center-position'); else num.classList.add('top-position');
  w.appendChild(num); w.noteNumber=num;
  const bb=document.createElement('button'); bb.className='bring-to-front-btn'; bb.innerText='TOP';
  bb.onclick=e=>{ e.stopPropagation(); maxZIndex++; w.style.zIndex=maxZIndex; (editData||noteData)[ni].z=maxZIndex; };
  w.appendChild(img); w.appendChild(bb); document.body.appendChild(w); wrappers[ni]=w;
  w.addEventListener('mousedown',startDrag); w.addEventListener('touchstart',startDrag);
});
function startDrag(e){
  if(!editMode||e.target.classList.contains('bring-to-front-btn')) return;
  e.preventDefault(); dragElement=e.currentTarget; dragElement.classList.add('dragging');
  const r=dragElement.getBoundingClientRect();
  const cx=e.touches?e.touches[0].clientX:e.clientX; const cy=e.touches?e.touches[0].clientY:e.clientY;
  dragOffset.x=cx-r.left-r.width/2; dragOffset.y=cy-r.top-r.height/2;
}
function onDrag(e){
  if(!dragElement) return; e.preventDefault();
  const cx=e.touches?e.touches[0].clientX:e.clientX; const cy=e.touches?e.touches[0].clientY:e.clientY;
  dragElement.style.left=((cx-dragOffset.x)/innerWidth)*100+'%'; dragElement.style.top=((cy-dragOffset.y)/innerHeight)*100+'%';
  const ni=dragElement.dataset.noteIndex;
  (editData||noteData)[ni].x=Math.round(((cx-dragOffset.x)/innerWidth)*1000)/10;
  (editData||noteData)[ni].y=Math.round(((cy-dragOffset.y)/innerHeight)*1000)/10;
}
function endDrag(){ if(dragElement){ dragElement.classList.remove('dragging'); dragElement=null; } }
document.addEventListener('mousemove',onDrag); document.addEventListener('mouseup',endDrag);
document.addEventListener('touchmove',onDrag,{passive:false}); document.addEventListener('touchend',endDrag);
function applyPositionsFrom(data){
  Object.keys(wrappers).forEach(ni=>{
    const d=data[ni]; const w=wrappers[ni]; if(!d||!w) return;
    w.style.left=d.x+'%'; w.style.top=d.y+'%'; w.style.zIndex=d.z||10;
    const im=w.querySelector('.note-img'); if(im) im.style.width=(d.size*100/CONFIG.DESIGN_WIDTH)+'vw';
  });
}
function setExclusiveMode(mode){
  stopProva(); exclusiveMode=mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
  const b=$('btn-'+mode); if(b) b.classList.add('active');
  if(showTimeout){clearTimeout(showTimeout);showTimeout=null;}
  activeNotes.clear(); heldByPedal.clear(); pressedStack=[]; normalSustainHold=null;
  imgElement.classList.remove('visible'); cancelDelayProcess();
  $('zoom-controls').style.display=(mode==='complete')?'flex':'none';
  $('sound-controls').style.display=(mode==='complete')?'flex':'none';
  Object.values(wrappers).forEach(w=>{ w.classList.remove('visible'); w.style.opacity='0'; if(w.noteNumber){ w.noteNumber.classList.remove('visible'); w.noteNumber.classList.remove('active-note'); } });
  if(mode==='edit'){
    editMode=true; editData=JSON.parse(JSON.stringify(noteData)); editControls.style.display='flex'; imgElement.style.display='none';
    Object.values(wrappers).forEach(w=>{ w.style.display='block'; w.classList.add('visible','draggable'); w.style.opacity='1'; if(w.noteNumber) w.noteNumber.classList.add('visible'); });
  } else {
    if(editData){ applyPositionsFrom(noteData); editData=null; }
    editMode=false; editControls.style.display='none';
    Object.values(wrappers).forEach(w=>w.classList.remove('draggable'));
    if(mode==='multi'||mode==='complete'){
      imgElement.style.display='none';
      Object.values(wrappers).forEach(w=>{ w.style.display='block'; w.style.opacity='0'; w.classList.remove('visible'); if(w.noteNumber) w.noteNumber.classList.remove('visible'); });
      if(mode==='complete') Object.values(wrappers).forEach(w=>{ w.classList.add('visible'); w.style.opacity='1'; if(w.noteNumber) w.noteNumber.classList.add('visible'); });
    } else {
      imgElement.style.display='block';
      Object.values(wrappers).forEach(w=>{ w.style.display='none'; w.style.opacity='0'; w.classList.remove('visible'); if(w.noteNumber) w.noteNumber.classList.remove('visible'); });
    }
  }
  updateModeDisplay(); updateTonicBtn();
}
function loadZoom(){ const s=localStorage.getItem(CONFIG.STORAGE_KEYS.ZOOM); if(s){ currentZoom=Math.min(120,Math.max(80,parseInt(s)||100)); applyZoom(); } }
function saveZoom(){ localStorage.setItem(CONFIG.STORAGE_KEYS.ZOOM,currentZoom.toString()); }
function applyZoom(){ document.body.style.transform=`scale(${currentZoom/100})`; $('zoom-value').textContent=`${currentZoom}%`; }
function positionZoomControls(){
  const scale=currentZoom/100; const p=$('sound-controls').getBoundingClientRect(); const z=$('zoom-controls');
  z.style.position='fixed'; z.style.right='auto'; z.style.bottom='auto'; z.style.transform='none'; z.style.margin='0';
  const h=z.getBoundingClientRect().height||120; const br=document.body.getBoundingClientRect();
  z.style.top=((p.top-br.top-h-12)/scale)+'px'; z.style.left=((p.left-br.left)/scale)+'px';
}
function positionSustainHint(){
  const scale=currentZoom/100; const p=$('sound-controls').getBoundingClientRect(); const h=$('sustain-hint');
  h.style.position='fixed'; h.style.right='auto'; h.style.bottom='auto'; h.style.transform='none'; h.style.margin='0';
  const br=document.body.getBoundingClientRect();
  h.style.top=((p.bottom-br.top+10)/scale)+'px'; h.style.left=((p.left-br.left)/scale)+'px'; h.style.width=(p.width/scale)+'px';
}
function positionTonicControls(){
  const scale=currentZoom/100; const led=$('sustain-led'); const lab=$('sustain-label');
  const r=led.getBoundingClientRect(); const r2=lab?lab.getBoundingClientRect():r; const br=document.body.getBoundingClientRect();
  const left=((r.left-br.left)/scale)+'px'; const top=((Math.max(r.bottom,r2.bottom)-br.top+10)/scale)+'px';
  if(!tonicBtnEl) return;
  tonicBtnEl.style.left=left; tonicBtnEl.style.top=top;
  if(tonicVolEl){ tonicVolEl.style.left=left; tonicVolEl.style.top=((Math.max(r.bottom,r2.bottom)-br.top+52)/scale)+'px'; }
  if(tonicTipEl){ tonicTipEl.style.left=left; tonicTipEl.style.top=((Math.max(r.bottom,r2.bottom)-br.top+88)/scale)+'px'; }
}
function updateTonicBtn(){
  if(!tonicBtnEl){
    tonicBtnEl=document.createElement('button'); tonicBtnEl.id='tonic-pedal-btn';
    tonicBtnEl.style.cssText='position:fixed;right:auto;bottom:auto;z-index:400;background:#222831;border:1px solid #39d98a;color:#7ff0b4;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:14px;font-weight:bold;display:none;';
    document.body.appendChild(tonicBtnEl);
    tonicVolEl=document.createElement('input'); tonicVolEl.type='range'; tonicVolEl.id='tonic-volume-slider';
    tonicVolEl.min='0'; tonicVolEl.max='100'; tonicVolEl.step='5'; tonicVolEl.value='50';
    tonicVolEl.style.cssText='position:fixed;right:auto;bottom:auto;z-index:400;width:110px;accent-color:#39d98a;display:none;';
    document.body.appendChild(tonicVolEl);
    tonicVolEl.addEventListener('input',e=>updatePedalVolumeDirect(parseInt(e.target.value)));
    tonicTipEl=document.createElement('div');
    tonicTipEl.style.cssText='position:fixed;right:auto;bottom:auto;max-width:280px;background:#12161cee;border:1px solid #39d98a;color:#cfd8dc;border-radius:10px;padding:8px 12px;font-size:12px;line-height:1.4;display:none;z-index:400;';
    document.body.appendChild(tonicTipEl);
    tonicBtnEl.addEventListener('click',()=>{ getSharedCtx(); if(tonicPedalOscs&&tonicPedalOscs.length) stopTonicPedal(false); else startTonicPedal(); updateTonicBtn(); });
    tonicBtnEl.addEventListener('mouseenter',()=>{ tonicTipEl.textContent=t('tonic_tip'); tonicTipEl.style.display='block'; positionTonicControls(); });
    tonicBtnEl.addEventListener('mouseleave',()=>{ tonicTipEl.style.display='none'; });
  }
  const show=midiMode.classList.contains('active')&&exclusiveMode==='normal';
  tonicBtnEl.style.display=show?'block':'none'; tonicVolEl.style.display=show?'block':'none';
  if(!show){ tonicTipEl.style.display='none'; if(tonicPedalOscs&&tonicPedalOscs.length) stopTonicPedal(false); }
  else{
    const on=tonicPedalOscs&&tonicPedalOscs.length;
    tonicBtnEl.textContent=t('tonic_btn');
    tonicBtnEl.style.background=on?'#123324':'#0c0f13';
    tonicBtnEl.style.border=on?'1px solid #39d98a':'1px solid #3a4148';
    tonicBtnEl.style.color=on?'#7ff0b4':'#5c666e';
    tonicBtnEl.style.boxShadow=on?'0 0 10px #39d98a88':'none';
    tonicVolEl.value=Math.round(pedalVolume/0.12*100);
    positionTonicControls();
  }
}
function updatePedalVolumeDirect(v){
  pedalVolume=(v/100)*0.12;
  $('pedal-volume-slider').value=v;
  const tv=$('tonic-volume-slider'); if(tv) tv.value=v;
  if(tonicPedalGains&&tonicPedalGains.length&&sharedCtx){
    const now=sharedCtx.currentTime; const per=pedalVolume/tonicPedalGains.length;
    tonicPedalGains.forEach(g=>{ g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(g.gain.value,now); g.gain.linearRampToValueAtTime(per,now+0.1); });
  }
}

/* ══ 12. CONTRASENYA ══ */
async function verifyPassword(pass){
  const m=/^musica(\d{1,2})$/.exec((pass||'').toLowerCase());
  if(m){ const v=parseInt(m[1],10); const now=new Date().getMinutes(); if(v===now||v===(now+59)%60) return true; }
  try{
    const enc=new TextEncoder(); const buf=await crypto.subtle.digest('SHA-256',enc.encode(pass));
    const hash=Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    if(hash===CONFIG.PASS_HASH) return true;
  }catch(e){ if(pass.toLowerCase()==='quake') return true; }
  return false;
}
function checkPasswordAndSubmit(){
  const modal=$('password-modal'); const input=$('password-input'); const err=$('password-error');
  const pass=input.value.trim();
  if(!pass){ err.textContent=t('pw_error').replace('{X}',0).replace('{Y}',CONFIG.MAX_ATTEMPTS); return; }
  verifyPassword(pass).then(ok=>{
    if(ok){ getSharedCtx(); getPianoBus(); initMIDI(); modal.classList.add('hidden'); }
    else{
      passwordAttempts++;
      if(passwordAttempts>=CONFIG.MAX_ATTEMPTS) document.body.innerHTML="<h1 style='color:red;text-align:center;margin-top:20%;font-family:sans-serif'>"+t('pw_denied')+"</h1>";
      else{ err.textContent=t('pw_error').replace('{X}',passwordAttempts).replace('{Y}',CONFIG.MAX_ATTEMPTS); input.value=''; input.focus(); }
    }
  });
}
function initPasswordModal(){
  const input=$('password-input'); const capsWarn=$('password-caps');
  const updateCaps=e=>{ if(e.getModifierState) capsWarn.style.display=e.getModifierState('CapsLock')?'block':'none'; };
  $('password-submit').addEventListener('click',checkPasswordAndSubmit);
  input.addEventListener('keydown',e=>{ updateCaps(e); if(e.key==='Enter'){e.preventDefault();checkPasswordAndSubmit();} });
  input.addEventListener('keyup',updateCaps);
  input.addEventListener('blur',()=>{capsWarn.style.display='none';});
  setTimeout(()=>input.focus(),100); setTimeout(()=>input.focus(),500);
}

/* ══ 12b. LAYOUT PER TABLET ══ */
function applyTabletLayout(mode){
  if(!IS_TABLET) return;
  
  // Forçar que el control manual estigui visible
  if(manualPanel){
    manualPanel.style.display='block';
    manualPanel.classList.add('visible');
    manualPanelVisible=true;
    manualPanel.classList.remove('ear-position');
  }
  
  // Ajustar grid del control manual per tablet
  const cont=document.querySelector('.manual-buttons');
  if(cont) cont.style.gridTemplateColumns='repeat(6,1fr)';
  
  // Mostrar avís MIDI (més avall per no tapar-se)
  if(mode==='midi'){
    const w=document.createElement('div');
    w.style.cssText='position:fixed;top:150px;left:50%;transform:translateX(-50%);background:rgba(255,170,0,0.95);color:#000;padding:12px 24px;border-radius:12px;font-weight:700;font-size:14px;z-index:99999;box-shadow:0 6px 20px rgba(0,0,0,0.6);text-align:center;max-width:80%;';
    w.innerHTML='⚠️ MIDI no disponible en iPad<br>Utilitza el teclat manual de sota';
    document.body.appendChild(w);
    setTimeout(()=>{
      w.style.transition='opacity 1s';
      w.style.opacity='0';
      setTimeout(()=>w.remove(),1000);
    },5000);
  }
}

function removeTabletLayout(){
  if(manualPanel){
    manualPanel.classList.remove('visible');
    manualPanel.style.display='none';
  }
  manualPanelVisible=false;
}

function cleanupOnExit(){
  // Tanca tots els modals
  if(resultModal) resultModal.classList.remove('visible');
  if(pauseModal) pauseModal.classList.remove('visible');
  if(infoModal) infoModal.classList.remove('visible');
  if($('instructions-modal')) $('instructions-modal').classList.remove('visible');
  if(battleModal) battleModal.classList.remove('visible');
  if(battleResultModal) battleResultModal.classList.remove('visible');
  if(hardcoreWarning) hardcoreWarning.classList.remove('visible');
  
  // Amaga el control manual SEMPRE en sortir
  if(manualPanel){
    manualPanel.classList.remove('visible');
    manualPanel.style.display='none';
  }
  manualPanelVisible=false;
  activeManualNotes.clear();
  numHeld={};
  
  // Atura qualsevol melodia
  stopProva();
  
  // Neteja estats de tablet
  if(IS_TABLET) removeTabletLayout();
}

function requestFullscreen(){
  if(!document.fullscreenElement){
    const elem=document.documentElement;
    if(elem.requestFullscreen) elem.requestFullscreen().catch(()=>{});
    else if(elem.webkitRequestFullscreen) elem.webkitRequestFullscreen().catch(()=>{});
  }
}

/* ══ 13. LISTENERS PRINCIPALS ══ */
document.addEventListener('contextmenu',e=>e.preventDefault());
function checkDeviceAndProceed(mode){
  if(IS_SMARTPHONE){
    alert('📱 TONAL EMOTIONS no està disponible per a smartphones.\n\nSi us plau, utilitza un iPad, una tablet o un ordinador per accedir a aquesta aplicació.');
    return false;
  }
  return true;
}

$('btn-start-midi').addEventListener('click',()=>{
  if(!checkDeviceAndProceed('midi')) return;
  getSharedCtx(); startScreen.classList.add('hidden');
  midiMode.classList.add('active'); earMode.classList.remove('active');
  if(IS_PC) initMIDI();
  setExclusiveMode('normal'); updatePianoButtons();
  if(IS_PC){ $('sustain-hint').classList.add('visible'); positionSustainHint(); setTimeout(()=>{ $('sustain-hint').classList.remove('visible'); },8000); }
  if(IS_TABLET) applyTabletLayout('midi');
  setTimeout(()=>requestFullscreen(),300);
});

$('btn-start-ear').addEventListener('click',()=>{
  if(!checkDeviceAndProceed('ear')) return;
  getSharedCtx(); startScreen.classList.add('hidden');
  earMode.classList.add('active'); midiMode.classList.remove('active');
  updateModeButtons(); updateDifficultyButtons(); updateManualButtonsVisibility(); renderFilterPanel(); updatePianoButtons();
  if(IS_PC){ $('btn-ear-piano').classList.add('visible'); $('btn-toggle-manual-ear').classList.add('visible'); $('ear-sustain-led').classList.add('visible'); $('ear-sustain-label').classList.add('visible'); }
  if(IS_PC) initMIDI();
  if(IS_TABLET) applyTabletLayout('ear');
  setTimeout(()=>requestFullscreen(),300);
});

function showMidiUnavailableWarning(){
  const w=document.createElement('div');
  w.style.cssText='position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#ffaa00;color:#000;padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.5);';
  w.textContent='⚠️ MIDI no disponible en aquest dispositiu. Utilitza el teclat manual.';
  document.body.appendChild(w);
  setTimeout(()=>w.remove(),4000);
}

function cleanupOnExit(){
  // Tanca tots els modals
  if(resultModal) resultModal.classList.remove('visible');
  if(pauseModal) pauseModal.classList.remove('visible');
  if(infoModal) infoModal.classList.remove('visible');
  if($('instructions-modal')) $('instructions-modal').classList.remove('visible');
  if(battleModal) battleModal.classList.remove('visible');
  if(battleResultModal) battleResultModal.classList.remove('visible');
  if(hardcoreWarning) hardcoreWarning.classList.remove('visible');
  
  // Amaga el control manual i reseteja l'estat
  if(manualPanel){
    manualPanel.classList.remove('visible');
    if(IS_TABLET) manualPanel.style.display='none';
  }
  manualPanelVisible=false;
  activeManualNotes.clear();
  numHeld={};
  
  // Atura qualsevol melodia
  stopProva();
  
  // Neteja estats de tablet
  if(IS_TABLET) removeTabletLayout();
}

$('btn-back-midi').addEventListener('click',()=>{
  cleanupOnExit();
  stopProva(); midiMode.classList.remove('active'); startScreen.classList.remove('hidden');
  setExclusiveMode('multi'); $('zoom-controls').style.display='none'; $('sound-controls').style.display='none';
});
$('btn-back-ear').addEventListener('click',()=>{
  cleanupOnExit();
  if(earTrainingActive) stopEarTraining(false);
  earMode.classList.remove('active'); startScreen.classList.remove('hidden');
  if(IS_PC){ $('btn-ear-piano').classList.remove('visible'); $('btn-toggle-manual-ear').classList.remove('visible'); $('ear-sustain-led').classList.remove('visible'); $('ear-sustain-label').classList.remove('visible'); }
  cleanupBattleUI();
});

['normal','lead','bass','delay','multi','edit'].forEach(m=>{ $('btn-'+m).addEventListener('click',()=>setExclusiveMode(m)); });
$('btn-complete').addEventListener('click',()=>{
  if(exclusiveMode==='complete') setExclusiveMode('multi');
  else{ setExclusiveMode('complete'); loadZoom(); positionZoomControls(); }
});
$('btn-save-edit').addEventListener('click',()=>{
  if(editData) noteData=JSON.parse(JSON.stringify(editData));
  Object.keys(wrappers).forEach(ni=>{ noteData[ni].z=parseInt(wrappers[ni].style.zIndex)||noteData[ni].z; });
  localStorage.setItem(CONFIG.STORAGE_KEYS.LAYOUT,JSON.stringify(noteData));
  applyPositionsFrom(noteData);
  toast.style.display='block'; setTimeout(()=>toast.style.display='none',3000);
  setExclusiveMode('complete'); positionZoomControls();
});
$('btn-reset').addEventListener('click',()=>{ if(confirm(t('reset_confirm'))){ localStorage.removeItem(CONFIG.STORAGE_KEYS.LAYOUT); location.reload(); } });
$('btn-cancel-edit').addEventListener('click',()=>setExclusiveMode('complete'));
$('btn-piano').addEventListener('click',()=>{
  internalPianoEnabled=!internalPianoEnabled;
  if(internalPianoEnabled){ pianoToast.textContent=t('piano_on'); pianoToast.style.background='#8c52ff'; getSharedCtx(); }
  else{ pianoToast.textContent=t('piano_off'); pianoToast.style.background='#444'; stopAllPianoNotes(); }
  updatePianoButtons(); pianoToast.style.display='block'; setTimeout(()=>pianoToast.style.display='none',2000);
});
$('btn-ear-piano').addEventListener('click',()=>{
  internalPianoEnabled=!internalPianoEnabled;
  if(internalPianoEnabled){ pianoToast.textContent=t('piano_on'); pianoToast.style.background='#8c52ff'; getSharedCtx(); }
  else{ pianoToast.textContent=t('piano_off'); pianoToast.style.background='#444'; stopAllPianoNotes(); }
  updatePianoButtons(); pianoToast.style.display='block'; setTimeout(()=>pianoToast.style.display='none',2000);
});

function stopProva(){
  provaTimers.forEach(t0 => clearTimeout(t0));
  provaTimers = [];
  stopAllPianoNotes();
  heldByPedal.clear();
  provaSustain = true;
  if ($('sustain-hint')) $('sustain-hint').classList.remove('visible');
  provaPlaying = false;
  provaBtnActive = null;
  const btn = $('sc-test');
  if (btn) {
    btn.textContent = t('test_sound');
    btn.classList.remove('stop');
  }
}

function playMelody(arr, scale, btn, label, volMult = 1, useSustain = true) {
  if (provaPlaying) stopProva();
  if (!arr || !arr.length) return;
  if (!internalPianoEnabled) { 
    internalPianoEnabled = true; 
    updatePianoButtons(); 
  }
  getSharedCtx();
  provaPlaying = true; 
  provaBtnActive = btn; 
  provaSustain = useSustain;
  if (btn) {
    btn.textContent = '⏹ STOP';
    btn.classList.add('stop');
  }
  const base = 0.3 * volMult;
  const offset = arr[0][0];
  const START_DELAY = 1;
  let last = 0;
  arr.forEach(([t0, n, d]) => {
    const tAdj = (t0 - offset) * scale + START_DELAY;
    provaTimers.push(setTimeout(() => startPianoNote(n, base, useSustain), tAdj * 1000));
    provaTimers.push(setTimeout(() => {
      if (provaSustain && sustainPedalActive) heldByPedal.add(n);
      else stopPianoNote(n);
    }, (tAdj + Math.max(0.3, d * scale)) * 1000));
    last = Math.max(last, tAdj + Math.max(0.3, d * scale));
  });
  provaTimers.push(setTimeout(() => stopProva(), (last + 1.5) * 1000));
}

$('pedal-volume-slider').addEventListener('input',e=>updatePedalVolumeDirect(parseInt(e.target.value)));
['sc-volume','sc-fadein','sc-attack','sc-decay','sc-sustain','sc-duration','sc-bright'].forEach(id=>{
  $(id).addEventListener('input',e=>{
    if(id==='sc-volume') pianoTuning.volume=PIANO_VOL_MIN+(parseInt(e.target.value)/100)*(1-PIANO_VOL_MIN);
    else if(id==='sc-fadein') pianoTuning.fadeIn=parseInt(e.target.value)/1000;
    else if(id==='sc-attack') pianoTuning.attack=parseInt(e.target.value);
    else if(id==='sc-decay') pianoTuning.decay=parseInt(e.target.value)/100;
    else if(id==='sc-sustain') pianoTuning.sustain=parseInt(e.target.value)/100;
    else if(id==='sc-duration') pianoTuning.duration=parseFloat(e.target.value);
    else if(id==='sc-bright') pianoTuning.brightness=parseInt(e.target.value)/100;
    refreshSoundLabels();
  });
});
$('sc-instrument').addEventListener('change',e=>{ pianoTuning.instrument=e.target.value; });
$('sc-reset').addEventListener('click',()=>{ Object.assign(pianoTuning,PIANO_DEFAULTS); syncSoundSliders(); refreshSoundLabels(); });
$('sc-test').addEventListener('click',()=>{
  const btn=$('sc-test');
  if(provaPlaying&&provaBtnActive===btn){ stopProva(); return; }
  if(typeof BACH_PRELUDE!=='undefined'){
    playMelody(BACH_PRELUDE, BACH_TEMPO_SCALE||1, btn, t('test_sound'), 1, true);
  } else {
    alert('⚠️ melodies.js no carregat o BACH_PRELUDE no definit');
  }
  if($('sustain-hint')){ $('sustain-hint').classList.add('visible'); positionSustainHint(); }
});
$('btn-zoom-in').addEventListener('click',()=>{ if(currentZoom<120){ currentZoom+=10; applyZoom(); saveZoom(); if($('sound-controls').style.display==='flex'){ positionZoomControls(); if($('sustain-hint').classList.contains('visible')) positionSustainHint(); } } });
$('btn-zoom-out').addEventListener('click',()=>{ if(currentZoom>80){ currentZoom-=10; applyZoom(); saveZoom(); if($('sound-controls').style.display==='flex'){ positionZoomControls(); if($('sustain-hint').classList.contains('visible')) positionSustainHint(); } } });
$('btn-resume').addEventListener('click',resumeEarTraining);
$('btn-abort').addEventListener('click',abortEarTraining);
$('btn-ear-start-full').addEventListener('click',()=>{ if(earModeType==='battle') showBattleModal(); else startEarTraining(); });
$('btn-ear-stop-full').addEventListener('click',()=>stopEarTraining(false));
document.querySelectorAll('.ear-mode-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(earTrainingActive) return;
    document.querySelectorAll('.ear-mode-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); earNoteMode=btn.dataset.mode; updateManualButtonsVisibility();
    if(btn.dataset.mode==='listen'&&manualPanelVisible){ manualPanelVisible=false; manualPanel.classList.remove('visible','ear-position'); $('btn-toggle-manual').classList.remove('active'); $('btn-toggle-manual-ear').classList.remove('active'); }
  });
});
$('btn-easy').addEventListener('click',()=>{ if(!earTrainingActive){ earDifficulty='easy'; updateDifficultyButtons(); } });
$('btn-hard').addEventListener('click',()=>{ if(!earTrainingActive){ earDifficulty='hard'; updateDifficultyButtons(); } });
$('btn-test-mode').addEventListener('click',()=>{ if(!earTrainingActive){ earModeType='test'; updateModeButtons(); accuracyPanel.classList.remove('visible'); } });
$('btn-practice-mode').addEventListener('click',()=>{ if(!earTrainingActive){ earModeType='practice'; updateModeButtons(); accuracyPanel.classList.remove('visible'); } });
$('btn-listen-mode').addEventListener('click',()=>{
  if(!earTrainingActive){
    earModeType='listen'; updateModeButtons(); accuracyPanel.classList.remove('visible');
    if(manualPanelVisible){ manualPanelVisible=false; manualPanel.classList.remove('visible','ear-position'); $('btn-toggle-manual').classList.remove('active'); $('btn-toggle-manual-ear').classList.remove('active'); }
  }
});
$('btn-battle-mode').addEventListener('click',()=>{ if(!earTrainingActive){ earModeType='battle'; updateModeButtons(); accuracyPanel.classList.remove('visible'); } });
$('ear-key-select').addEventListener('change',e=>{ currentKeyRoot=+e.target.value; keySelect.value=currentKeyRoot; if(earTrainingActive&&earDifficulty!=='easy'){ stopTonicPedal(); startTonicPedal(); } });
$('ear-duration-full').addEventListener('input',e=>{ if(earTrainingActive) return; const v=parseInt(e.target.value)||5; $('ear-timer-full').textContent=formatTime(v*60); });
const btnToggleManual=$('btn-toggle-manual'), btnToggleManualEar=$('btn-toggle-manual-ear');
document.querySelectorAll('.manual-btn').forEach(b=>{
  const d=parseInt(b.dataset.degree);
  b.addEventListener('mousedown',e=>{e.preventDefault();activateManualNote(d);});
  b.addEventListener('mouseup',e=>{e.preventDefault();deactivateManualNote(d);});
  b.addEventListener('mouseleave',e=>{ if(activeManualNotes.has(d)) deactivateManualNote(d); });
  b.addEventListener('touchstart',e=>{e.preventDefault();activateManualNote(d);});
  b.addEventListener('touchend',e=>{e.preventDefault();deactivateManualNote(d);});
  b.addEventListener('touchcancel',e=>{e.preventDefault();deactivateManualNote(d);});
});
btnToggleManual.addEventListener('click',toggleManualPanel);
btnToggleManualEar.addEventListener('click',toggleManualPanel);
$('btn-battle-start').addEventListener('click',startBattle);
$('btn-battle-cancel').addEventListener('click',hideBattleModal);
['battle-player1-name','battle-player2-name'].forEach(id=>{
  $(id).addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); startBattle(); } });
});
$('btn-battle-close').addEventListener('click',()=>battleResultModal.classList.remove('visible'));
$('btn-close-result').addEventListener('click',()=>{ resultModal.classList.remove('visible'); if(earModeType==='test') accuracyPanel.classList.remove('visible'); });
$('btn-close-info').addEventListener('click', () => {
  infoModal.classList.remove('visible');
  stopProva();
});
$('btn-close-instructions').addEventListener('click',()=>$('instructions-modal').classList.remove('visible'));
$('btn-info').addEventListener('click', () => {
  if (!infoModal) return;
  infoModal.classList.add('visible');
  if (typeof playMelody === 'function' && typeof DEBUSSY !== 'undefined') {
    setTimeout(() => {
      try { playMelody(DEBUSSY, DEBUSSY_TEMPO_SCALE || 1, null, '', 0.5, false); } catch (e) { console.error('❌ Error tocant Debussy:', e); }
    }, 100);
  }
});
$('btn-help-midi').addEventListener('click',()=>{ $('instructions-content').innerHTML=t('help_midi'); $('instructions-modal').classList.add('visible'); });
$('btn-help-ear').addEventListener('click',()=>{ $('instructions-content').innerHTML=t('help_ear'); $('instructions-modal').classList.add('visible'); });
document.querySelectorAll('.lang-btn').forEach(btn=>{ btn.addEventListener('click',()=>{ currentLang=btn.dataset.lang; updateLanguageUI(); }); });
$('btn-fullscreen-midi').addEventListener('click',()=>{ if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); else if(document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen(); });
$('btn-fullscreen-ear').addEventListener('click',()=>{ if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); else if(document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen(); });

/* ══ 14. TECLAT GLOBAL ══ */
document.addEventListener('keydown',e=>{
  if(!$('password-modal').classList.contains('hidden')) return;
  if(battleModal&&battleModal.classList.contains('visible')){ if(e.key==='Escape'){e.preventDefault();hideBattleModal();} return; }
  if(battleResultModal&&battleResultModal.classList.contains('visible')){ if(e.key==='Enter'||e.key==='Escape'){e.preventDefault();battleResultModal.classList.remove('visible');} return; }
  const el=e.target;
  if(el&&(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA')){ if(el.getClientRects().length>0) return; }
  if(e.code==='Space'){e.preventDefault();return;}
  if(e.key==='Enter'&&resultModal.classList.contains('visible')){ resultModal.classList.remove('visible'); if(earModeType==='test') accuracyPanel.classList.remove('visible'); return; }
  if(e.key==='Enter'&&infoModal.classList.contains('visible')){ e.preventDefault(); infoModal.classList.remove('visible'); stopProva(); return; }
  if(e.key==='Escape'){
    e.preventDefault();
    if(battleModal&&battleModal.classList.contains('visible')){ hideBattleModal(); return; }
    if(resultModal.classList.contains('visible')){ resultModal.classList.remove('visible'); if(earModeType==='test') accuracyPanel.classList.remove('visible'); return; }
    if(infoModal.classList.contains('visible')){ infoModal.classList.remove('visible'); stopProva(); return; }
    if($('instructions-modal').classList.contains('visible')){ $('instructions-modal').classList.remove('visible'); return; }
    if(earTrainingActive&&warmupInterval) stopEarTraining(false);
    else if(earTrainingActive&&!isPaused&&earModeType==='listen') stopEarTraining(false);
    else if(earTrainingActive&&!isPaused&&(earModeType==='test'||earModeType==='practice'||earModeType==='battle')) pauseEarTraining();
    else if(!earTrainingActive){ stopProva(); if(exclusiveMode==='complete'||exclusiveMode==='edit') setExclusiveMode('normal'); }
    return;
  }
  const DIAT_DEG=[0,2,4,5,7,9,11];
  const isNumDigitCode=/^(Digit[1-7]|Numpad[1-7])$/.test(e.code);
  const numDegree=()=>DIAT_DEG[parseInt(e.code.slice(-1),10)-1];
  const numModValue=()=>{ if(e.key==='-'||e.code==='Minus'||e.code==='NumpadSubtract') return -1; if(e.key==='+'||e.key==='='||e.code==='Equal'||e.code==='NumpadAdd') return 1; return 0; };
  const mod=numModValue();
  if(mod!==0){ e.preventDefault(); if(!manualPanelVisible) toggleManualPanel(); pendingAcc=mod; if(pendingAccTO) clearTimeout(pendingAccTO); pendingAccTO=setTimeout(()=>{pendingAcc=0;pendingAccTO=null;},2000); return; }
  if(isNumDigitCode&&numHeld[e.code]===undefined){
    e.preventDefault(); if(!manualPanelVisible) toggleManualPanel();
    let d=numDegree();
    if(pendingAcc){ d=(d+pendingAcc+12)%12; pendingAcc=0; if(pendingAccTO){clearTimeout(pendingAccTO);pendingAccTO=null;} }
    numHeld[e.code]=d; activateManualNote(d); return;
  }
});
document.addEventListener('keyup',e=>{
  if(!$('password-modal').classList.contains('hidden')) return;
  const el=e.target;
  if(el&&(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA')){ if(el.getClientRects().length>0) return; }
  if(numHeld[e.code]!==undefined){ const d=numHeld[e.code]; delete numHeld[e.code]; deactivateManualNote(d); }
});
window.addEventListener('resize',()=>{
  if($('zoom-controls').style.display!=='none') positionZoomControls();
  if($('sustain-hint').classList.contains('visible')) positionSustainHint();
  if(tonicBtnEl&&tonicBtnEl.style.display!=='none') positionTonicControls();
  positionBattleBoxes();
});

/* ══ 15. ARRENCADA ══ */
// Gestionar navegació entre pestanyes
window.addEventListener('beforeunload',()=>{
  // Aturar tot el so abans de tancar/canviar
  stopAllPianoNotes();
  stopAllEarPianoNotes();
  stopAllPedalSounds();
  if(earTrainingActive) stopEarTraining(true);
});

// Assegurar que només hi hagi una instància activa
if(!window.isTonalEmotionsActive){
  window.isTonalEmotionsActive=true;
  window.addEventListener('pagehide',()=>{
    window.isTonalEmotionsActive=false;
  });
}
if(IS_SMARTPHONE){ document.documentElement.classList.add('smartphone-mode'); const bm=$('btn-start-midi'); if(bm) bm.style.display='none'; }
if(IS_TABLET) document.documentElement.classList.add('tablet-mode');
updateLanguageUI(); updateModeButtons(); updateDifficultyButtons(); updateManualButtonsVisibility();
loadZoom(); syncSoundSliders(); refreshSoundLabels(); updatePedalVolumeDirect(50); initPasswordModal();
console.log('🎹 TONAL EMOTIONS v16 carregat correctament.');