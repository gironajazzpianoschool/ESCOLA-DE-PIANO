// app.js — TONAL EMOTIONS v13 (fitxer sencer net, amb tots els pegats integrats)
const PASS_HASH="e04dc6405154e1be4887eb34e8aa6237661a15a975e2c13a5e78e056d161099f";
const MAX_ATTEMPTS=3;
let passwordAttempts=0;
/* [PEGAT 2] Contrasenya dinàmica: "musica" + minut del rellotge (amb gràcia d'1 minut) */
function minuteOk(pass){const m=/^musica(\d{1,2})$/.exec((pass||'').toLowerCase());if(!m)return false;const v=parseInt(m[1],10);const now=new Date().getMinutes();return v===now||v===(now+59)%60;}
async function verifyPassword(pass){if(minuteOk(pass))return true;const enc=new TextEncoder();const buf=await crypto.subtle.digest('SHA-256',enc.encode(pass));return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')===PASS_HASH;}
function checkPasswordAndSubmit(){const modal=document.getElementById('password-modal');const input=document.getElementById('password-input');const err=document.getElementById('password-error');const pass=input.value.trim();if(!pass)return;verifyPassword(pass).then(ok=>{if(ok){getSharedCtx();getPianoBus();initMIDI();modal.classList.add('hidden');}else{passwordAttempts++;if(passwordAttempts>=MAX_ATTEMPTS)document.body.innerHTML="<h1 style='color:red;text-align:center;margin-top:20%;font-family:sans-serif'>"+t('pw_denied')+"</h1>";else{err.textContent=t('pw_error').replace('{X}',passwordAttempts).replace('{Y}',MAX_ATTEMPTS);input.value='';input.focus();}}});}
function initPasswordModal(){const input=document.getElementById('password-input');const capsWarn=document.getElementById('password-caps');const updateCaps=e=>{if(e.getModifierState)capsWarn.style.display=e.getModifierState('CapsLock')?'block':'none';};document.getElementById('password-submit').addEventListener('click',checkPasswordAndSubmit);input.addEventListener('keydown',e=>{updateCaps(e);if(e.key==='Enter'){e.preventDefault();checkPasswordAndSubmit();}});input.addEventListener('keyup',updateCaps);input.addEventListener('blur',()=>{capsWarn.style.display='none';});setTimeout(()=>input.focus(),100);setTimeout(()=>input.focus(),500);}
let sharedCtx=null,pianoBus=null;
function getSharedCtx(){if(!sharedCtx)sharedCtx=new(window.AudioContext||window.webkitAudioContext)();if(sharedCtx.state==='suspended')sharedCtx.resume();return sharedCtx;}
function getPianoBus(){const ctx=getSharedCtx();if(!pianoBus){pianoBus=ctx.createDynamicsCompressor();pianoBus.threshold.value=-20;pianoBus.knee.value=12;pianoBus.ratio.value=4;pianoBus.attack.value=0.003;pianoBus.release.value=0.25;pianoBus.connect(ctx.destination);}return pianoBus;}
document.addEventListener('contextmenu',e=>e.preventDefault());
const translations={
ca:{pw_title:"🔐 Accés Restringit",pw_placeholder:"Introdueix la contrasenya",pw_button:"Entrar",pw_error:"Contrasenya incorrecta. Intent {X}/{Y}",pw_denied:"Accés denegat: massa intents fallits",
start_midi:"🎹 LABORATORI AUDITIU",start_ear:"🎧 ENTRENAMENT AUDITIU",waiting_midi:"Esperant connexió MIDI...",midi_connected:"MIDI connectat!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",
delay_label:"Retard: ",delay:"Retard",normal:"Normal",lead:"Lead",bass:"Baix",multi:"Combinat",adjust_zoom:"Ajustar",edit:"Edita",back:"← Enrere",fullscreen:"Pantalla Completa",exit_fullscreen:"Surt de Pantalla",edit_mode:"Mode Edició",save:"Desa",reset:"Reinicia",cancel:"Cancel·la",saved_ok:"Desat correctament!",proposed_answer:"🎯 Resposta Proposada",accuracy:"🎯 Precisió",test_complete:"🎯 Prova Completada!",ok:"D'ACORD",
key:"Tonalitat",duration:"Durada",pedal_vol:"Vol. Pedal",notes:"Notes",diatonic:"Diatòniques",non_diatonic:"No-Diat",all_notes:"Totes",test_mode:"TEST",practice_mode:"PRÀCTICA",listen_mode:"ESCOLTA",battle_mode:"BATALLA",start:"INICIA",stop:"ATURA",listen_tonic:"Escolta la tònica...",listen_cadence:"Escolta la cadència completa de la tonalitat",multi_tab_warning:"⚠️ MIDI ja actiu en una altra pestanya",reset_confirm:"Tornar a la disposició original?",piano_on:"🎹 Piano Intern: ACTIVAT",piano_off:"🔇 Piano Intern: DESACTIVAT",ear_info:"Rang: C2 - C7<br>Seqüència aleatòria",let_s_go:"Som-hi!",word_notes:"notes",mode_prefix:"Mode: ",word_major:"Major",min:"min",sec:"s",manual:"Manual",manual_control:"Control Manual",easy:"Fàcil",hard:"Difícil",
instrument:"Instrument",inst_piano:"Piano",inst_soft:"Piano Suau",inst_epiano:"E-Piano",inst_organ:"Orgue",inst_strings:"Corda",inst_flute:"Flauta",test_sound:"▶ Prova",
sc_title:"🎹 CONTROLS DE SO",sc_volume:"Volum",sc_fadein:"Fade In",sc_attack:"Atac",sc_decay:"Decaiment",sc_sustain:"Cos",sc_duration:"Durada",sc_bright:"Brillantor",
info_title:"ℹ️ Què és TONAL EMOTIONS?",info_text:"TONAL EMOTIONS és l'eina del bloc auditiu del nivell fonamental de l'escola online Girona Jazz Piano School®. El seu objectiu és entrenar l'oïda associant cada grau de l'escala a una emoció o sensació.<br><br>🎹 LABORATORI AUDITIU: visualitza les imatges de les notes que toques (modes Normal, Principal, Baix, Combinat, Retard, Ajustar i Editar).<br>🎧 ENTRENAMENT AUDITIU: quatre modes: ESCOLTA (escolta i veu la resposta), PRÀCTICA (prova amb feedback), TEST (avaluació amb percentatge) i BATALLA (2 jugadors per torns).<br><br>Tria tonalitat, tipus de notes i dificultat: FÀCIL (amb la cadència I-IV-V-I de referència) o DIFÍCIL (només amb la tònica de fons).<br><br>🤖 Aquesta aplicació l'ha desenvolupat el propi professor amb l'ajuda de Qwen3.7-Plus i Qwen3.8-MAX, després de més de 100 hores de dedicació entre disseny, programació i proves amb alumnes reals.",
hardcore_title:"MODE HARDCORE",hardcore_text:"Sense la referència de la cadència, reconèixer notes diatòniques i no diatòniques barrejades ja comença a ser exigent: sense oïda absoluta, cal una oïda relativa molt ben entrenada. Només per a valents!",
result_excel:"🎉 Felicitats! Tens una oïda molt ben entrenada! Segueix així!",result_diat:"Has encertat el {X}% de les notes. 💡 Recomanació: Intenta entrenar amb notes No-Diatòniques per millorar encara més!",result_non_diat:"Has encertat el {X}% de les notes. 💡 Recomanació: Intenta entrenar amb TOTES les notes per posar-te a prova!",result_good:"Has encertat el {X}% de les notes. Bona feina!",result_keep:"Has encertat el {X}% de les notes. No et rendeixis! Segueix practicant i milloraràs. 💪",result_crack:"🏆 Ets un CRACK! Has encertat TOTES les notes! O tens oïda absoluta o una oïda relativa molt ben entrenada! 🎵",result_short:"💡 Consell: Prova de fer sessions més curtes (2-3 min) i augmenta gradualment. La constància és clau!",result_filtered:"Has encertat el {X}% amb una selecció reduïda de notes. 💡 Quan et sentis a punt, activa més notes amb el botó 🎯 per seguir creixent!",
pause_title:"⏸️ Pausa",pause_message:"Prova en pausa. Què vols fer?",resume:"▶ Continuar",abort:"⏹ Abortar",pause_cheat:"⚠️ Massa pauses! La prova es finalitza per possibles trampes.",
help_title:"📖 Instruccions del Laboratori Auditiu",
help_midi:"<h3>🎹 Laboratori Auditiu — modes de visualització</h3><ul><li><b>Normal:</b> mostra la imatge de l'última nota tocada i una frase curta que descriu la seva sensació emocional dins del context tonal.</li><li><b>Lead:</b> imatge de la nota més aguda que sona.</li><li><b>Baix:</b> imatge de la nota més greu que sona.</li><li><b>Combinat:</b> imatge de cada nota tocada.</li><li><b>Retard:</b> mantén una sola tecla i la seva imatge apareix al cap d'uns segons.</li></ul><h3>🛠️ Eines</h3><ul><li><b>Ajustar:</b> zoom i control de so (volum, atac, decaïment, instrument...).</li><li><b>Edita:</b> arrossega les imatges, porta-les al davant amb TOP i desa la disposició.</li><li><b>🎹 Piano:</b> activa/desactiva el so del piano intern.</li><li><b>🎛️ Manual:</b> teclat a pantalla (ratolí o tacte) o teclat del PC: números 1–7 = graus 1–7; «-» abans = bemoll, «+» o «=» abans = sostingut.</li><li><b>Pedal sustain:</b> aguanta les notes com en un piano real.</li><li><b>🎵 TÒNICA:</b> al mode Normal, activa la nota pedal de la tònica; ajusta'n el volum amb el fader o les fletxes ↑/↓.</li><li><b>ESC:</b> atura la prova i surt d'Ajustar/Edita sense desar.</li></ul>",
help_ear:"<h3>🎧 Modes d'entrenament</h3><ul><li><b>Escolta:</b> escolta la nota i en veus la resposta; ideal per aprendre.</li><li><b>Pràctica:</b> prova-ho i reps feedback immediat (👍/).</li><li><b>Test:</b> avaluació amb percentatge de precisió al final.</li><li><b>Batalla:</b> 2 jugadors per torns amb el mateix teclat; guanya qui encerti més notes. Si no respons a temps, apareix ⏱ TEMPS i conta com a error. En cas d'empat al final: 💀 MORT SÚBITA, on cada jugador respon la seva pregunta del parell i perd qui falli havent encertat el rival.</li></ul><h3>⚙️ Opcions</h3><ul><li><b>Fàcil:</b> amb la cadència I-IV-V-I de referència. <b>Difícil:</b> només amb la tònica de fons (afegeix 1 s extra de gràcia al retard per poder escoltar la nota).</li><li><b>Notes:</b> diatòniques, no diatòniques o totes.</li><li><b>Durada / Retard:</b> temps de prova i temps fins a la resposta.</li><li><b>Vol. Pedal:</b> ajusta'l amb el control lliscant o les fletxes ↑/↓.</li><li><b>Manual:</b> teclat a pantalla (ratolí o tacte) o teclat del PC: els números 1–7 corresponen als graus 1–7; prem «-» abans del número per fer-lo bemoll i «+» (o «=») abans per fer-lo sostingut. En prémer un número, el panell manual s'obre sol i el botó corresponent s'il·lumina.</li><li><b>🎮 Batalla sense piano:</b> tots dos jugadors poden respondre des de qualsevol zona numèrica del teclat (fila superior o teclat numèric). Les lletres ja no responen, per evitar pulsacions accidentals.</li><li><b>⚙️ CONFIGURAR:</b> obre'l i tria quines notes entren a la prova (mínim 2); les apagades no es preguntaran ni apareixeran al teclat manual.</li><li><b>ESC:</b> pausa la prova; massa pauses la finalitzen.</li></ul>",
sustain_hint:"🎹 Prova el pedal sustain",caps_on:"⇪ Majúscules activades",
filter_info_some:"Notes configurades: ",filter_info_all_diat:"Configurades totes les notes diatòniques",filter_info_all_nondiat:"Configurades totes les notes no diatòniques",filter_info_all:"Configurades totes les notes",
filter_btn_test:"CONFIGURAR TEST",filter_btn_listen:"CONFIGURAR NOTES",filter_btn_practice:"CONFIGURAR PROVA",filter_btn_battle:"CONFIGURAR BATALLA",
filter_title:"Notes actives a la prova",filter_hint:"Mínim 2 notes actives. Les apagades no entraran en la seqüència.",
tonic_btn:"🎵 TÒNICA",tonic_tip:"Activa la nota pedal de la tònica per sentir la veritable emoció de cada imatge dins del seu context tonal.",
emo_title:"Sensació tonal",emo_0:"Repòs absolut: cap tensió, ets a casa.",emo_1:"Amenaça: la bèstia ronda a un semitò.",emo_2:"Dubte: baixar a casa o pujar a la dolçor?",emo_3:"Melancolia: una foto antiga d'un moment feliç que ja ha passat.",emo_4:"Dolçor pura: la nota més dolça de totes.",emo_5:"Amén: tensió que demana resoldre cap a la dolçor.",emo_6:"Alerta: tensió que puja cap a la dominant (el 5).",emo_7:"Força i múscul: la dominant (el 5) que resol a tònica amb el típic xim pom.",emo_8:"Misteri: un enigma fosc que baixa cap a la dominant (el 5).",emo_9:"Cant al cel per arribar a la tònica.",emo_10:"Ferida emocional (Blues).",emo_11:"Imant: atracció irresistible cap a la tònica, tan a prop.",
battle_title:"⚔️ MODE BATALLA",battle_description:"Introduïu els noms dels dos jugadors. Fareu torns per respondre les notes!",player:"Jugador",start_battle_btn:"⚔️ COMENÇAR BATALLA",battle_enter_hint:"⏎ Prem INTRO per començar",battle_complete:"⚔️ BATALLA FINALITZADA!",battle_winner:"🏆 {X} guanya!",battle_tie:"🤝 Empat!",battle_your_turn:"Torn de {X}",
sudden_death_title:"MORT SÚBITA",sudden_death_text:"Empat! Qui falli quan l'altre encerti, perd la batalla.",
v10_flash_nice:"MOLT BÉ!",v10_flash_miss:"FALLADA!",v10_timeout:"TEMPS!",v10_correct:"encerts",v10_avg:"s/resposta",exit_app:"❌ SORTIR"},
es:{pw_title:"🔐 Acceso Restringido",pw_placeholder:"Introduce la contraseña",pw_button:"Entrar",pw_error:"Contraseña incorrecta. Intento {X}/{Y}",pw_denied:"Acceso denegado: demasiados intentos fallidos",
start_midi:"🎹 LABORATORIO AUDITIVO",start_ear:"🎧 ENTRENAMIENTO AUDITIVO",waiting_midi:"Esperando conexión MIDI...",midi_connected:"¡MIDI conectado!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",
delay_label:"Retardo: ",delay:"Retardo",normal:"Normal",lead:"Lead",bass:"Bajo",multi:"Combinado",adjust_zoom:"Ajustar",edit:"Editar",back:"← Volver",fullscreen:"Pantalla Completa",exit_fullscreen:"Salir Pantalla",edit_mode:"Modo Edición",save:"Guardar",reset:"Reiniciar",cancel:"Cancelar",saved_ok:"¡Guardado correctamente!",proposed_answer:"🎯 Respuesta Propuesta",accuracy:"🎯 Precisión",test_complete:"🎯 ¡Prueba Completada!",ok:"OK",
key:"Tonalidad",duration:"Duración",pedal_vol:"Vol. Pedal",notes:"Notas",diatonic:"Diatónicas",non_diatonic:"No-Diat",all_notes:"Todas",test_mode:"TEST",practice_mode:"PRÁCTICA",listen_mode:"ESCUCHAR",battle_mode:"BATALLA",start:"INICIAR",stop:"DETENER",listen_tonic:"Escucha la tónica...",listen_cadence:"Escucha la cadencia completa de la tonalidad",multi_tab_warning:"⚠️ MIDI ya activo en otra pestaña",reset_confirm:"¿Volver a la disposición original?",piano_on:"🎹 Piano Interno: ACTIVADO",piano_off:"🔇 Piano Interno: DESACTIVADO",ear_info:"Rango: C2 - C7<br>Secuencia aleatoria",let_s_go:"¡Vamos!",word_notes:"notas",mode_prefix:"Modo: ",word_major:"Mayor",min:"min",sec:"s",manual:"Manual",manual_control:"Control Manual",easy:"Fácil",hard:"Difícil",
instrument:"Instrumento",inst_piano:"Piano",inst_soft:"Piano Suave",inst_epiano:"E-Piano",inst_organ:"Órgano",inst_strings:"Cuerda",inst_flute:"Flauta",test_sound:"▶ Prueba",
sc_title:"🎹 CONTROLES DE SONIDO",sc_volume:"Volumen",sc_fadein:"Fade In",sc_attack:"Ataque",sc_decay:"Decadencia",sc_sustain:"Cuerpo",sc_duration:"Duración",sc_bright:"Brillo",
info_title:"ℹ️ ¿Qué es TONAL EMOTIONS?",info_text:"TONAL EMOTIONS es la herramienta del bloque auditivo del nivel fundamental de la escuela online Girona Jazz Piano School®. Su objetivo es entrenar el oído asociando cada grado de la escala a una emoción o sensación.<br><br>🎹 LABORATORIO AUDITIVO: visualiza las imágenes de las notas que tocas (modos Normal, Principal, Bajo, Combinado, Retardo, Ajustar y Editar).<br>🎧 ENTRENAMIENTO AUDITIVO: cuatro modos: ESCUCHAR (escucha y ve la respuesta), PRÁCTICA (prueba con feedback), TEST (evaluación con porcentaje) y BATALLA (2 jugadores por turnos).<br><br>Elige tonalidad, tipo de notas y dificultad: FÁCIL (con la cadencia I-IV-V-I de referencia) o DIFÍCIL (solo con la tónica de fondo).<br><br>🤖 Esta aplicación la ha desarrollado el propio profesor con la ayuda de Qwen3.7-Plus y Qwen3.8-MAX, tras más de 100 horas de dedicación entre diseño, programación y pruebas con alumnos reales.",
hardcore_title:"MODO HARDCORE",hardcore_text:"Sin la referencia de la cadencia, reconocer notas diatónicas y no diatónicas mezcladas ya empieza a ser exigente: sin oído absoluto, se necesita un oído relativo muy bien entrenado. ¡Solo para valientes!",
result_excel:"🎉 ¡Felicidades! ¡Tienes un oído muy bien entrenado! ¡Sigue así!",result_diat:"Has acertado el {X}% de las notas. 💡 Recomendación: ¡Intenta entrenar con notas No-Diatónicas para mejorar aún más!",result_non_diat:"Has acertado el {X}% de las notas. 💡 Recomendación: ¡Intenta entrenar con TODAS las notas para ponerte a prueba!",result_good:"Has acertado el {X}% de las notas. ¡Buen trabajo!",result_keep:"Has acertado el {X}% de las notas. ¡No te rindas! Sigue practicando y mejorarás. 💪",result_crack:"🏆 ¡Eres un CRACK! ¡Has acertado TODAS las notas! ¡O tienes oído absoluto o un oído relativo muy bien entrenado! 🎵",result_short:"💡 Consejo: Prueba a hacer sesiones más cortas (2-3 min) y aumenta gradualmente. ¡La constancia es clave!",result_filtered:"Has acertado el {X}% con una selección reducida de notas. 💡 Cuando te sientas listo, activa más notas con el botón 🎯 para seguir creciendo!",
pause_title:"⏸️ Pausa",pause_message:"Prueba en pausa. ¿Qué quieres hacer?",resume:"▶ Continuar",abort:"⏹ Abortar",pause_cheat:"⚠️ ¡Demasiadas pausas! La prueba se finaliza por posibles trampas.",
help_title:"📖 Instrucciones del Laboratorio Auditivo",
help_midi:"<h3>🎹 Laboratorio Auditivo — modos de visualización</h3><ul><li><b>Normal:</b> muestra la imagen de la última nota tocada y una frase corta que describe su sensación emocional dentro del contexto tonal.</li><li><b>Lead:</b> imagen de la nota más aguda que suena.</li><li><b>Bajo:</b> imagen de la nota más grave que suena.</li><li><b>Combinado:</b> imagen de cada nota tocada.</li><li><b>Retardo:</b> mantén una sola tecla y su imagen aparece al cabo de unos segundos.</li></ul><h3>🛠️ Herramientas</h3><ul><li><b>Ajustar:</b> zoom y control de sonido (volumen, ataque, decadencia, instrumento...).</li><li><b>Editar:</b> arrastra las imágenes, tráelas al frente con TOP y guarda la disposición.</li><li><b>🎹 Piano:</b> activa/desactiva el sonido del piano interno.</li><li><b>🎛️ Manual:</b> teclado en pantalla (ratón o tacto) o teclado del PC: números 1–7 = grados 1–7; «-» antes = bemol, «+» o «=» antes = sostenido.</li><li><b>Pedal sustain:</b> mantiene las notas como en un piano real.</li><li><b>🎵 TÓNICA:</b> en modo Normal, activa la nota pedal de la tónica; ajusta su volumen con el fader o las flechas ↑/↓.</li><li><b>ESC:</b> detiene la prueba y sale de Ajustar/Editar sin guardar.</li></ul>",
help_ear:"<h3>🎧 Modos de entrenamiento</h3><ul><li><b>Escuchar:</b> escuchas la nota y ves la respuesta; ideal para aprender.</li><li><b>Práctica:</b> pruébalo y recibes feedback inmediato (👍/👎).</li><li><b>Test:</b> evaluación con porcentaje de precisión al final.</li><li><b>Batalla:</b> 2 jugadores por turnos con el mismo teclado; gana quien acierte más notas. Si no respondes a tiempo, aparece ⏱ TIEMPO y cuenta como fallo. En caso de empate al final: 💀 MUERTE SÚBITA, donde cada jugador responde su pregunta del par y pierde quien falle habiendo acertado el rival.</li></ul><h3>⚙️ Opciones</h3><ul><li><b>Fácil:</b> con la cadencia I-IV-V-I de referencia. <b>Difícil:</b> solo con la tónica de fondo (añade 1 s extra de gracia al retardo para poder escuchar la nota).</li><li><b>Notas:</b> diatónicas, no diatónicas o todas.</li><li><b>Duración / Retardo:</b> tiempo de prueba y tiempo hasta la respuesta.</li><li><b>Vol. Pedal:</b> ajústalo con el control deslizante o las flechas ↑/↓.</li><li><b>Manual:</b> teclado en pantalla (ratolí o tacto) o teclado del PC: los números 1–7 corresponden a los grados 1–7; pulsa «-» antes del número para hacerlo bemol y «+» (o «=») antes para hacerlo sostenido. Al pulsar un número, el panel manual se abre solo y el botón correspondiente se ilumina.</li><li><b>🎮 Batalla sin piano:</b> ambos jugadores pueden responder desde cualquier zona numérica del teclado (fila superior o teclado numérico). Las letras ya no responden, para evitar pulsaciones accidentales.</li><li><b>⚙️ CONFIGURAR:</b> ábrelo y elige qué notas entran en la prueba (mínim 2); les apagades no es preguntaran ni apareixeran al teclat manual.</li><li><b>ESC:</b> pausa la prueba; demasiadas pausas la finalitzen.</li></ul>",
sustain_hint:"🎹 Prueba el pedal sustain",caps_on:"⇪ Mayúsculas activadas",
filter_info_some:"Notas configuradas: ",filter_info_all_diat:"Configuradas todas las notas diatónicas",filter_info_all_nondiat:"Configuradas todas las notas no diatónicas",filter_info_all:"Configuradas todas las notas",
filter_btn_test:"CONFIGURAR TEST",filter_btn_listen:"CONFIGURAR NOTAS",filter_btn_practice:"CONFIGURAR PRUEBA",filter_btn_battle:"CONFIGURAR BATALLA",
filter_title:"Notas activas en la prueba",filter_hint:"Mínimo 2 notas activas. Las apagadas no entrarán en la secuencia.",
tonic_btn:"🎵 TÓNICA",tonic_tip:"Activa la nota pedal de la tónica para sentir la verdadera emoción de cada imagen dentro de su contexto tonal.",
emo_title:"Sensación tonal",emo_0:"Reposo absoluto: sin tensión, estás en casa.",emo_1:"Amenaza: la bestia ronda a un semitono.",emo_2:"Duda: ¿bajar a casa o subir a la dulzura?",emo_3:"Melancolía: una foto antigua de un momento feliz que ya pasó.",emo_4:"Dulzura pura: la nota más dulce de todas.",emo_5:"Amén: tensión que pide resolver hacia la dulzura.",emo_6:"Alerta: tensión que sube hacia la dominante (el 5).",emo_7:"Fuerza y músculo: la dominante (el 5) que resuelve a tónica con el típico chim-pum.",emo_8:"Misterio: un enigma oscuro que baja hacia la dominante (el 5).",emo_9:"Canto al cielo para llegar a la tónica.",emo_10:"Herida emocional (Blues).",emo_11:"Imán: atracción irresistible hacia la tónica, tan cerca.",
battle_title:"⚔️ MODO BATALLA",battle_description:"Introducid los nombres de los dos jugadores. ¡Haréis turnos para responder las notas!",player:"Jugador",start_battle_btn:"⚔️ COMENZAR BATALLA",battle_enter_hint:"⏎ Pulsa INTRO para comenzar",battle_complete:"⚔️ ¡BATALLA FINALIZADA!",battle_winner:"🏆 ¡{X} gana!",battle_tie:"🤝 ¡Empate!",battle_your_turn:"Turno de {X}",
sudden_death_title:"MUERTE SÚBITA",sudden_death_text:"¡Empate! Quien falle cuando el otro acierte, pierde la batalla.",
v10_flash_nice:"¡BIEN!",v10_flash_miss:"¡FALLO!",v10_timeout:"¡TIEMPO!",v10_correct:"aciertos",v10_avg:"s/respuesta",exit_app:"❌ SALIR"},
en:{pw_title:"🔐 Restricted Access",pw_placeholder:"Enter the password",pw_button:"Enter",pw_error:"Wrong password. Attempt {X}/{Y}",pw_denied:"Access denied: too many failed attempts",
start_midi:"🎹 AUDITORY LAB",start_ear:"🎧 EAR TRAINING",waiting_midi:"Waiting for MIDI connection...",midi_connected:"MIDI connected!",midi_port:"MIDI: ",piano:"Piano",sustain:"Sustain",
delay_label:"Delay: ",delay:"Delay",normal:"Normal",lead:"Lead",bass:"Bass",multi:"Multi",adjust_zoom:"Adjust",edit:"Edit",back:"← Back",fullscreen:"Fullscreen",exit_fullscreen:"Exit Fullscreen",edit_mode:"Edit Mode",save:"Save",reset:"Reset",cancel:"Cancel",saved_ok:"Saved correctly!",proposed_answer:"🎯 Proposed Answer",accuracy:"🎯 Accuracy",test_complete:"🎯 Test Complete!",ok:"OK",
key:"Key",duration:"Duration",pedal_vol:"Pedal Vol",notes:"Notes",diatonic:"Diatonic",non_diatonic:"Non-Diat",all_notes:"All",test_mode:"TEST",practice_mode:"PRACTICE",listen_mode:"LISTEN",battle_mode:"BATTLE",start:"START",stop:"STOP",listen_tonic:"Listen to the tonic...",listen_cadence:"Listen to the full cadence of the key",multi_tab_warning:"⚠️ MIDI already active in another tab",reset_confirm:"Return to original layout?",piano_on:"🎹 Internal Piano: ON",piano_off:"🔇 Internal Piano: OFF",ear_info:"Range: C2 - C7<br>Random sequence",let_s_go:"Let's go!",word_notes:"notes",mode_prefix:"Mode: ",word_major:"Major",min:"min",sec:"s",manual:"Manual",manual_control:"Manual Control",easy:"Easy",hard:"Hard",
instrument:"Instrument",inst_piano:"Piano",inst_soft:"Soft Piano",inst_epiano:"E-Piano",inst_organ:"Organ",inst_strings:"Strings",inst_flute:"Flute",test_sound:"▶ Test",
sc_title:"🎹 SOUND CONTROLS",sc_volume:"Volume",sc_fadein:"Fade In",sc_attack:"Attack",sc_decay:"Decay",sc_sustain:"Body",sc_duration:"Duration",sc_bright:"Brightness",
info_title:"ℹ️ What is TONAL EMOTIONS?",info_text:"TONAL EMOTIONS is the ear-training tool of the fundamental level of the online school Girona Jazz Piano School®. Its goal is to train the ear by associating each scale degree with an emotion or sensation.<br><br>🎹 AUDITORY LAB: visualizes the images of the notes you play (Normal, Lead, Bass, Multi, Delay, Adjust and Edit modes).<br>🎧 EAR TRAINING: four modes: LISTEN (listen and see the answer), PRACTICE (try with feedback), TEST (graded with percentage) and BATTLE (2 players in turns).<br><br>Choose key, note type and difficulty: EASY (with the I-IV-V-I cadence as reference) or HARD (only the tonic in the background).<br><br>🤖 This app was developed by the teacher himself with the help of Qwen3.7-Plus and Qwen3.8-MAX, after more than 100 hours of dedication across design, programming and testing with real students.",
hardcore_title:"HARDCORE MODE",hardcore_text:"Without the cadence reference, recognizing mixed diatonic and non-diatonic notes is already demanding: without absolute pitch, you need a very well-trained relative pitch. Only for the brave!",
result_excel:"🎉 Congratulations! You have a very well-trained ear! Keep it up!",result_diat:"You answered correctly to {X}% of the notes. 💡 Recommendation: Try training with Non-Diatonic notes to improve your ear even more!",result_non_diat:"You answered correctly to {X}% of the notes. 💡 Recommendation: Try training with ALL notes to challenge yourself further!",result_good:"You answered correctly to {X}% of the notes. Great job!",result_keep:"You answered correctly to {X}% of the notes. Don't give up! Keep practicing and you'll improve. 💪",result_crack:"🏆 You're a CRACK! You got ALL notes right! You either have absolute pitch or a very well-trained relative pitch! 🎵",result_short:"💡 Tip: Try shorter sessions (2-3 min) and increase gradually. Consistency is key!",result_filtered:"You scored {X}% with a reduced note selection. 💡 When you feel ready, turn on more notes with the 🎯 button to keep growing!",
pause_title:"⏸️ Paused",pause_message:"Test paused. What do you want to do?",resume:"▶ Resume",abort:"⏹ Abort",pause_cheat:"⚠️ Too many pauses! Test ended due to possible cheating.",
help_title:"📖 Auditory Lab Instructions",
help_midi:"<h3>🎹 Auditory Lab — display modes</h3><ul><li><b>Normal:</b> shows the image of the last note played and a short phrase describing its emotional feeling within the tonal context.</li><li><b>Lead:</b> image of the highest note sounding.</li><li><b>Bass:</b> image of the lowest note sounding.</li><li><b>Multi:</b> image of every note played.</li><li><b>Delay:</b> hold a single key and its image appears after a few seconds.</li></ul><h3>🛠️ Tools</h3><ul><li><b>Adjust:</b> zoom and sound control (volume, attack, decay, instrument...).</li><li><b>Edit:</b> drag images, bring them to the front with TOP and save the layout.</li><li><b>🎹 Piano:</b> turns the internal piano sound on/off.</li><li><b>🎛️ Manual:</b> on-screen keyboard (mouse or touch) or PC keyboard: numbers 1–7 = degrees 1–7; «-» before = flat, «+» or «=» before = sharp.</li><li><b>Sustain pedal:</b> holds the notes like a real piano.</li><li><b>🎵 TONIC:</b> in Normal mode, turns on the tonic pedal note; adjust its volume with the fader or the ↑/↓ arrows.</li><li><b>ESC:</b> stops the test and exits Adjust/Edit without saving.</li></ul>",
help_ear:"<h3>🎧 Training modes</h3><ul><li><b>Listen:</b> hear the note and see the answer; ideal for learning.</li><li><b>Practice:</b> try it and get instant feedback (👍/).</li><li><b>Test:</b> graded with an accuracy percentage at the end.</li><li><b>Battle:</b> 2 players in turns on the same keyboard; whoever answers more notes wins. If you don't answer in time, ⏱ TIME appears and counts as a miss. Tie at the end? 💀 SUDDEN DEATH: each player answers their question of the pair, and whoever misses while the rival hits, loses.</li></ul><h3>⚙️ Options</h3><ul><li><b>Easy:</b> with the I-IV-V-I cadence as reference. <b>Hard:</b> only the tonic in the background (adds 1 extra grace second to the delay so you can hear the note).</li><li><b>Notes:</b> diatonic, non-diatonic or all.</li><li><b>Duration / Delay:</b> test time and time until the answer.</li><li><b>Pedal Vol:</b> adjust with the slider or the ↑/↓ arrows.</li><li><b>Manual:</b> on-screen keyboard (mouse or touch) or PC keyboard: numbers 1–7 correspond to degrees 1–7; press «-» before the number to flatten it and «+» (or «=») before to sharpen it. Pressing a number opens the manual panel automatically and lights up the matching button.</li><li><b>🎮 Battle without piano:</b> both players can answer from any numeric zone of the keyboard (top row or numeric keypad). Letters no longer answer, to avoid accidental presses.</li><li><b>⚙️ CONFIGURE:</b> open it and choose which notes enter the test (min 2); turned-off notes won't be asked nor shown on the manual keyboard.</li><li><b>ESC:</b> pauses the test; too many pauses end it.</li></ul>",
sustain_hint:"🎹 Try the sustain pedal",caps_on:"⇪ Caps Lock is on",
filter_info_some:"Configured notes: ",filter_info_all_diat:"All diatonic notes configured",filter_info_all_nondiat:"All non-diatonic notes configured",filter_info_all:"All notes configured",
filter_btn_test:"CONFIGURE TEST",filter_btn_listen:"CONFIGURE NOTES",filter_btn_practice:"CONFIGURE PRACTICE",filter_btn_battle:"CONFIGURE BATTLE",
filter_title:"Active notes in the test",filter_hint:"At least 2 active notes. Turned-off notes won't enter the sequence.",
tonic_btn:"🎵 TONIC",tonic_tip:"Turn on the tonic pedal note to feel the true emotion of each image within its tonal context.",
emo_title:"Tonal feeling",emo_0:"Absolute rest: no tension, you are home.",emo_1:"Threat: the beast prowls a semitone away.",emo_2:"Doubt: fall home or rise to sweetness?",emo_3:"Melancholy: an old photo of a happy moment already gone.",emo_4:"Pure sweetness: the sweetest note of all.",emo_5:"Amen: tension that asks to resolve into sweetness.",emo_6:"Alert: tension rising toward the dominant (5).",emo_7:"Strength and muscle: the dominant (5) resolving to tonic with the classic ta-da.",emo_8:"Mystery: a dark enigma falling toward the dominant (5).",emo_9:"A song to the sky to reach the tonic.",emo_10:"Emotional wound (Blues).",emo_11:"Magnet: irresistible pull to the tonic, so close.",
battle_title:"⚔️ BATTLE MODE",battle_description:"Enter the names of both players. You'll take turns answering notes!",player:"Player",start_battle_btn:"⚔️ START BATTLE",battle_enter_hint:"⏎ Press ENTER to start",battle_complete:"⚔️ BATTLE COMPLETE!",battle_winner:"🏆 {X} wins!",battle_tie:"🤝 Tie!",battle_your_turn:"{X}'s turn",
sudden_death_title:"SUDDEN DEATH",sudden_death_text:"Tie! Whoever misses while the other hits, loses the battle.",
v10_flash_nice:"NICE!",v10_flash_miss:"MISS!",v10_timeout:"TIME!",v10_correct:"correct",v10_avg:"s/answer",exit_app:"❌ EXIT"}
};
const MUSICAL_KEYS=["C","Db","D","Eb","E","F","F# / Gb","G","Ab","A","Bb","B"];
let currentLang='en';
function t(k){return translations[currentLang][k]||k;}
const imagePath='./img/';
const DESIGN_WIDTH=1280;
const STORAGE_KEY='sensacions_notes_layout_v5';
const MIDI_TAB_KEY='midi_active_tab';
const TAB_ID=Date.now().toString();
const ZOOM_STORAGE_KEY='tonal_emotions_zoom';
const noteImages={0:'1_casa.png',1:'b2_bestia.png',2:'2_encongir.png',3:'b3_tristesa.png',4:'3_alegria.png',5:'4_amen.png',6:'s4_alerta.png',7:'5_musculs.png',8:'b6_aliens.png',9:'6_canttenor.png',10:'b7_ferida.png',11:'7_imant.png'};
const defaultNoteData={0:{name:'1_casa.png',x:51.1,y:54,size:260,z:106},1:{name:'b2_bestia.png',x:40.1,y:60.8,size:170,z:107},2:{name:'2_encongir.png',x:37.7,y:45.4,size:150,z:10},3:{name:'b3_tristesa.png',x:53.9,y:36.8,size:140,z:10},4:{name:'3_alegria.png',x:46.9,y:36,size:140,z:105},5:{name:'4_amen.png',x:39.9,y:28.1,size:160,z:10},6:{name:'s4_alerta.png',x:67.5,y:56.9,size:130,z:115},7:{name:'5_musculs.png',x:61.3,y:52.4,size:280,z:114},8:{name:'b6_aliens.png',x:66.6,y:40.2,size:120,z:113},9:{name:'6_canttenor.png',x:47.9,y:71,size:160,z:108},10:{name:'b7_ferida.png',x:62.5,y:30.8,size:130,z:10},11:{name:'7_imant.png',x:57.8,y:69.1,size:100,z:116}};
let noteData={};
try{const s=localStorage.getItem(STORAGE_KEY);noteData=s?JSON.parse(s):JSON.parse(JSON.stringify(defaultNoteData));}catch(e){noteData=JSON.parse(JSON.stringify(defaultNoteData));}
const $=id=>document.getElementById(id);
const startScreen=$('start-screen'),midiMode=$('midi-mode'),earMode=$('ear-mode'),multiTabWarning=$('multi-tab-warning'),
delayCountdownEl=$('delay-countdown'),imgElement=$('current-image'),proposedAnswerImage=$('proposed-answer-image'),
proposedAnswerBox=$('proposed-answer-box'),feedbackCorrect=$('feedback-correct'),feedbackWrong=$('feedback-wrong'),
statusElement=$('status'),modeDisplay=$('mode-display'),keySelect=$('key-select'),editControls=$('edit-controls'),
toast=$('toast'),pianoToast=$('piano-toast'),sustainLed=$('sustain-led'),earSustainLed=$('ear-sustain-led'),
delayConfig=$('delay-config'),accuracyPanel=$('accuracy-panel'),accuracyValue=$('accuracy-value'),accuracyDetails=$('accuracy-details'),
resultModal=$('result-modal'),resultPercentage=$('result-percentage'),resultDetails=$('result-details'),resultMessage=$('result-message'),
manualPanel=$('manual-panel'),pauseModal=$('pause-modal'),thinkingEmoji=$('thinking-emoji'),warmupText=$('warmup-text'),
infoModal=$('info-modal'),hardcoreWarning=$('hardcore-warning'),earPanel=$('ear-panel-full'),
battleModal=$('battle-modal'),battleScoreboard=$('battle-scoreboard'),battleTurnIndicator=$('battle-turn-indicator'),battleResultModal=$('battle-result-modal'),
p1Box=$('p1-box'),p1AnswerImage=$('p1-answer-image'),p1AccuracyValue=$('p1-accuracy-value'),p1AccuracyDetails=$('p1-accuracy-details'),
p2Box=$('p2-box'),p2AnswerImage=$('p2-answer-image'),p2AccuracyValue=$('p2-accuracy-value'),p2AccuracyDetails=$('p2-accuracy-details');
let isMidiActive=false,showTimeout=null,activeNotes=new Set(),heldByPedal=new Set(),editMode=false,dragElement=null,dragOffset={x:0,y:0},maxZIndex=100;
let exclusiveMode='multi',sustainPedalActive=false,currentKeyRoot=0,internalPianoEnabled=true,activeOscillators={},pedalVolume=0.0375;
let earTrainingActive=false,earTimer=null,earTimeRemaining=0,earSequence=[],earCurrentIndex=0,tonicPedalOscs=[],tonicPedalGains=[],tonicPedalMasterGain=null,tonicPedalFilter=null;
let earModeType='listen',earNoteMode='diatonic',warmupInterval=null,earCurrentTargetPitchClass=null,earUserAlreadyAnswered=false,earCorrectNotes=0,earTotalNotes=0,earUserHasPlayed=false,hasAdvanced=false;
let listenDisplayTimeout=null,feedbackHideTimeout=null,advanceTimeout=null,earImageTimeout=null,showCorrectTimeout=null,delayCountdownInterval=null,manualPanelVisible=false,currentZoom=100;
let isPaused=false,pauseCount=0,consecutivePauses=0,totalPauses=0,delayStartTime=null,delayCheckInterval=null,delayPendingNote=null,pausedByUser=false,earDifficulty='easy',cadenceTimeouts=[],inAnswerPhase=false,hardcoreTimeout=null;
const lastNoteOnTime={};const physicalHeld=new Set();const wrappers={};
let editData=null,pressedStack=[],normalSustainHold=null,testSustainTimeout=null,testExploringNoImage=false;
const TEST_IMAGE_MS=1000,TEST_EXPLORE_MS=2000;
const BATTLE_HIDE_MS=500,BATTLE_ADVANCE_MS=1000,BATTLE_TURN_MS=1100;
let battleMode=false,battlePlayer1Name='',battlePlayer2Name='',battleCurrentPlayer=1;
let bp1={correct:0,total:0},bp2={correct:0,total:0};
let turnIndicatorTimeout=null,battleLastQ=0,battleResultTimeout=null;
/* ══════════ CAPA V11: ESTILS ══════════ */
const st=document.createElement('style');
st.textContent=`
#v10-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:39999;display:none;}
#v10-flash{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:64px;font-weight:800;z-index:96000;opacity:0;pointer-events:none;transition:opacity .15s;text-shadow:0 0 24px currentColor;}
#v10-flash.visible{opacity:1;}
body.battle-on #feedback-correct,body.battle-on #feedback-wrong{top:50%;}
#v10-sudden{position:fixed;inset:0;background:rgba(5,5,8,0.92);z-index:96500;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center;}
#v10-sudden.visible{display:flex;}
#v10-sudden img.sd{width:min(460px,62vw);max-height:40vh;object-fit:cover;border-radius:14px;border:2px solid #ff0055;margin-bottom:12px;box-shadow:0 0 30px rgba(255,0,85,.55);}
#v10-sudden h2,#v10-sudden p{font-family:Impact,'Arial Black','Franklin Gothic Bold',sans-serif;text-transform:uppercase;}
#v10-sudden h2{font-size:52px;letter-spacing:3px;color:#ff0055;text-shadow:0 2px 0 #7a0029,0 0 6px rgba(255,0,85,.35);transform:skewX(-6deg);margin:10px 0;}
#v10-sudden p{font-size:20px;letter-spacing:2px;color:#ffd23f;text-shadow:0 1px 0 #6b5200;}
#v10-langpick{position:fixed;inset:0;background:#050508;z-index:99400;display:none;flex-direction:column;align-items:center;justify-content:center;gap:34px;}
#v10-langpick.visible{display:flex;}
#v10-lang-hint{color:#8c8c9e;font-size:15px;letter-spacing:1.5px;text-align:center;padding:0 20px;}
#v10-lang-buttons{display:flex;gap:26px;flex-wrap:wrap;justify-content:center;}
.v10-lang-btn{padding:20px 46px;font-size:26px;font-weight:800;letter-spacing:2px;border-radius:16px;cursor:pointer;background:rgba(0,0,0,0.5);color:#f0f0f5;border:2px solid #8c52ff;box-shadow:0 0 14px rgba(140,82,255,.35);transition:transform .15s,box-shadow .15s;}
.v10-lang-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 0 26px rgba(140,82,255,.7);}
#v10-quote{position:fixed;inset:0;background:#000;z-index:99500;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6vh 8vw;opacity:0;pointer-events:none;transition:opacity .8s ease;}
#v10-quote.visible{opacity:1;pointer-events:auto;}
#v10-quote::before{content:'';position:absolute;inset:0;background:url('img/LOGO.png') center/42% no-repeat;filter:blur(9px) brightness(.7) saturate(1.15);opacity:.4;}
#v10-quote::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(0,0,0,.15) 0%,rgba(0,0,0,.88) 78%);}
#v10-quote-text{position:relative;z-index:2;font-size:clamp(20px,3.4vw,34px);font-style:italic;color:#f5f5f5;line-height:1.5;max-width:900px;}
#v10-quote-author{position:relative;z-index:2;margin-top:24px;font-size:clamp(14px,1.8vw,20px);color:#888;letter-spacing:2px;text-transform:uppercase;}
#battle-extra-stats{display:flex;gap:18px;justify-content:center;margin:6px 0 4px;flex-wrap:wrap;}
#battle-extra-stats .xs{background:rgba(255,255,255,0.05);border:1px solid rgba(255,170,0,0.35);border-radius:12px;padding:10px 14px;font-size:12px;color:#8c8c9e;min-width:190px;}
#battle-extra-stats .xs b{display:block;color:#fff;font-size:13px;margin-bottom:4px;}
body.battle-on #p1-accuracy-value,body.battle-on #p1-accuracy-details,body.battle-on #p2-accuracy-value,body.battle-on #p2-accuracy-details{display:none;}
#battle-scoreboard{padding:0;overflow:hidden;width:min(560px,90vw);}
.battle-players{gap:0;width:100%;}
.battle-player{flex:1 1 0;min-width:0;padding:12px 18px 14px;background:rgba(255,255,255,0.035);transition:opacity .2s,box-shadow .2s;}
#battle-p1-display{border-right:4px solid rgba(255,170,0,.65);background:linear-gradient(180deg,rgba(0,240,255,.10),rgba(0,240,255,0));}
#battle-p2-display{background:linear-gradient(180deg,rgba(255,0,85,.10),rgba(255,0,85,0));}
.battle-player-name{font-size:17px;letter-spacing:1.5px;text-transform:uppercase;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:normal !important;overflow-wrap:normal !important;}
.battle-player-score{font-size:58px;font-weight:800;font-family:Consolas,Monaco,monospace;text-shadow:0 0 16px currentColor;line-height:1.05;}
#battle-p1-display .battle-player-score{color:#00f0ff;}
#battle-p2-display .battle-player-score{color:#ff2bd6;}
.battle-player.active{color:inherit;text-shadow:none;box-shadow:inset 0 3px 0 var(--neon-green),inset 0 0 26px rgba(0,255,102,.18);}
.battle-player.active .battle-player-name{color:var(--neon-green);text-shadow:0 0 10px rgba(0,255,102,.7);}
#battle-scoreboard .battle-player:not(.active){opacity:.55;}
#v10-sd-chip{display:none;margin-top:6px;font-family:Impact,'Arial Black',sans-serif;letter-spacing:2px;color:#ff0055;text-shadow:0 1px 0 rgba(122,0,41,.9);font-size:15px;text-transform:uppercase;}
#v10-sd-chip.visible{display:block;}
body.battle-on #btn-ear-filter{position:fixed !important;left:auto !important;right:12px !important;top:6px !important;}
body.battle-on #ear-filter-panel{position:fixed !important;left:auto !important;right:12px !important;top:40px !important;}
body.battle-on #ear-filter-info{position:fixed !important;left:auto !important;right:12px !important;top:6px !important;}
#v10-debug{position:fixed;right:12px;bottom:64px;z-index:97000;max-height:30vh;overflow-y:auto;pointer-events:auto;max-width:420px;min-width:300px;background:rgba(0,0,0,.93);border:1px solid #00ff41;border-radius:10px;padding:10px 12px;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.5;color:#00ff41;white-space:pre-wrap;display:none;}
#v10-debug.visible{display:block;}
#v10-debug::-webkit-scrollbar{width:8px;}
#v10-debug::-webkit-scrollbar-track{background:#001400;}
#v10-debug::-webkit-scrollbar-thumb{background:rgba(0,255,65,.4);border-radius:4px;}
#v10-thumb{position:fixed;transform:translate(-50%,-50%);font-size:34px;z-index:10006;opacity:0;pointer-events:none;transition:opacity .15s;filter:drop-shadow(0 0 14px rgba(0,0,0,.85));}
#v10-thumb.visible{opacity:1;}
#footer{right:74px !important;}
#v10-devbtn{position:fixed;right:26px;bottom:21px;z-index:97001;width:26px;height:26px;border-radius:50%;border:1px solid rgba(0,255,65,.4);background:rgba(20,20,26,.7);color:#00ff41;font-size:13px;cursor:pointer;display:none;opacity:.6;}
#v10-devbtn:hover{opacity:1;}
#v10-devbtn.visible{display:block;}
#v10-result-blocker{position:fixed;inset:0;background:transparent;z-index:94000;display:none;}
#v10-result-blocker.visible{display:block;}
#p1-box,#p2-box{height:214px;}
#p1-answer-image,#p2-answer-image{width:176px;height:158px;object-fit:contain;}
#battle-result-modal .battle-stats{gap:0;}
#battle-result-modal .battle-stat{flex:1 1 0;min-width:0;border-radius:14px;margin:0 6px;padding:16px 14px;border:3px solid rgba(255,255,255,0.18);box-shadow:0 0 0 2px rgba(255,255,255,0.08) inset,0 0 0 6px rgba(0,0,0,0.45) inset;background:rgba(255,255,255,0.04);}
#battle-result-modal .battle-stat:first-child{background:linear-gradient(180deg,rgba(0,240,255,.12),rgba(0,240,255,.03));border-color:rgba(0,240,255,.45);border-right:4px solid rgba(255,170,0,.65);}
#battle-result-modal .battle-stat:last-child{background:linear-gradient(180deg,rgba(255,0,85,.12),rgba(255,0,85,.03));border-color:rgba(255,0,85,.45);}
#battle-result-modal .battle-stat-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#f0f0f5;font-weight:700;}
#battle-result-modal .battle-stat-value{font-size:32px;font-weight:800;font-family:Consolas,Monaco,monospace;}
#battle-result-modal .battle-stat:first-child .battle-stat-value{color:#00f0ff;text-shadow:0 0 10px rgba(0,240,255,.5);}
#battle-result-modal .battle-stat:last-child .battle-stat-value{color:#ff2bd6;text-shadow:0 0 10px rgba(255,43,214,.5);}
#p1-box h4 span,#p2-box h4 span{display:inline-block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:bottom;}
`;
document.head.appendChild(st);
/* ══════════ CAPA V11: ELEMENTS ══════════ */
function mk(id,html){const d=document.createElement('div');d.id=id;if(html)d.innerHTML=html;return d;}
const backdrop=mk('v10-backdrop'),flash=mk('v10-flash'),
sudden=mk('v10-sudden','<img class="sd" alt=""><h2></h2><p></p>'),
langPick=mk('v10-langpick','<div id="v10-lang-hint">🌍 Tria l\'idioma · Elige el idioma · Choose your language</div><div id="v10-lang-buttons"><button type="button" class="v10-lang-btn" data-lang="ca">CATALÀ</button><button type="button" class="v10-lang-btn" data-lang="es">ESPAÑOL</button><button type="button" class="v10-lang-btn" data-lang="en">ENGLISH</button></div>'),
quoteScr=mk('v10-quote','<div id="v10-quote-text"></div><div id="v10-quote-author"></div>'),
thumb=mk('v10-thumb'),blocker=mk('v10-result-blocker'),dbg=mk('v10-debug');
[backdrop,flash,sudden,langPick,quoteScr,thumb,blocker,dbg].forEach(d=>document.body.appendChild(d));
['v10-backdrop','v10-flash','v10-sudden','v10-langpick','v10-quote','v10-thumb','v10-result-blocker','v10-debug','v10-devbtn','battle-extra-stats','v10-sd-chip'].forEach(id=>{const all=document.querySelectorAll('#'+id);for(let i=0;i<all.length-1;i++)all[i].remove();});
const sdImg=sudden.querySelector('img.sd');
sdImg.src='./img/battle_sudden.png';
sdImg.onerror=function(){sdImg.onerror=null;sdImg.src='./img/battle_draw.png';};
const extraStats=mk('battle-extra-stats');
document.getElementById('btn-battle-close').parentNode.insertBefore(extraStats,document.getElementById('btn-battle-close'));
const sdChip=mk('v10-sd-chip');document.getElementById('battle-scoreboard').appendChild(sdChip);
const devBtn=document.createElement('button');devBtn.id='v10-devbtn';devBtn.textContent='🛠️';devBtn.title='Consola desenvolupador';document.body.appendChild(devBtn);
devBtn.addEventListener('click',()=>dbg.classList.toggle('visible'));
const earModeEl=document.getElementById('ear-mode');
const syncDevBtn=()=>devBtn.classList.toggle('visible',earModeEl.classList.contains('active'));
new MutationObserver(syncDevBtn).observe(earModeEl,{attributes:true,attributeFilter:['class']});syncDevBtn();
document.addEventListener('keydown',e=>{if(e.key!=='q'||e.ctrlKey||e.metaKey||e.altKey)return;const el=e.target;if(el&&(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA'))return;dbg.classList.toggle('visible');},true);
/* ══════════ CAPA V11: FRASES ══════════ */
const QUOTES=[
{a:"Miles Davis",ca:"No tinguis por als errors, no n'hi ha.",es:"No tengas miedo a los errores: no existen.",en:"Don't fear mistakes. There are none."},
{a:"Miles Davis",ca:"No toquis el que hi ha; toca el que no hi ha.",es:"No toques lo que hay; toca lo que no hay.",en:"Don't play what's there; play what's not there."},
{a:"John Coltrane",ca:"La música és la meva manera de connectar amb l'univers.",es:"La música es mi manera de conectar con el universo.",en:"Music is my way of connecting with the universe."},
{a:"Charlie Parker",ca:"La música és la teva pròpia experiència, els teus pensaments, la teva saviesa.",es:"La música es tu propia experiencia, tus pensamientos, tu sabiduría.",en:"Music is your own experience, your thoughts, your wisdom."},
{a:"Duke Ellington",ca:"Només hi ha dos tipus de música: la bona i l'altra.",es:"Solo hay dos tipos de música: la buena y la otra.",en:"There are only two kinds of music: good music and the other kind."},
{a:"Duke Ellington",ca:"Si sona bé, és que està bé.",es:"Si suena bien, es que está bien.",en:"If it sounds good, it is good."},
{a:"Louis Armstrong",ca:"Si ho has de preguntar, mai no ho sabràs.",es:"Si tienes que preguntarlo, nunca lo sabrás.",en:"If you have to ask, you'll never know."},
{a:"Louis Armstrong",ca:"El que toquem és la vida.",es:"Lo que tocamos es la vida.",en:"What we play is life."},
{a:"Thelonious Monk",ca:"El piano no té notes equivocades.",es:"El piano no tiene notas equivocadas.",en:"The piano has no wrong notes."},
{a:"Thelonious Monk",ca:"Qualsevol nota és correcta si saps com resoldre-la.",es:"Cualquier nota es correcta si sabes cómo resolverla.",en:"Any note is right if you know how to resolve it."},
{a:"Nina Simone",ca:"El deure de l'artista és reflectir els temps.",es:"El deber del artista es reflejar los tiempos.",en:"An artist's duty is to reflect the times."},
{a:"Bill Evans",ca:"Toca amb claredat, no amb velocitat.",es:"Toca con claridad, no con velocidad.",en:"Play with clarity, not with speed."},
{a:"Herbie Hancock",ca:"El jazz tracta sobre el moment present.",es:"El jazz trata sobre el momento presente.",en:"Jazz is about the present moment."},
{a:"Chick Corea",ca:"La creació és una necessitat, no una opció.",es:"La creación es una necesidad, no una opción.",en:"Creation is a necessity, not an option."},
{a:"Count Basie",ca:"El silenci és una de les coses més difícils de tocar.",es:"El silencio es una de las cosas más difíciles de tocar.",en:"Silence is one of the hardest things to play."},
{a:"Charles Mingus",ca:"Fer que el complicat soni simple, això és el jazz.",es:"Hacer que lo complicado suene simple: eso es el jazz.",en:"Making the complicated sound simple — that's jazz."},
{a:"Ornette Coleman",ca:"La idea és més important que la tècnica.",es:"La idea es más importante que la técnica.",en:"The idea is more important than the technique."},
{a:"J.S. Bach",ca:"No és tan difícil: només cal prémer les tecles correctes en el moment adequat.",es:"No es tan difícil: solo hay que pulsar las teclas correctas en el momento adecuado.",en:"It's not that hard: you just have to hit the right keys at the right time."},
{a:"L.V. Beethoven",ca:"La música ha de fer saltar foc de la ment humana.",es:"La música debe hacer saltar fuego de la mente humana.",en:"Music should strike fire from the human mind."},
{a:"W.A. Mozart",ca:"El més important no és allò que toques, sinó com ho toques.",es:"Lo más importante no es lo que tocas, sino cómo lo tocas.",en:"What matters most is not what you play, but how you play it."},
{a:"F. Chopin",ca:"El piano és el meu confident: li explico les meves alegries i les meves penes.",es:"El piano es mi confidente: le cuento mis alegrías y mis penas.",en:"The piano is my confidant: I tell it my joys and my sorrows."},
{a:"F. Liszt",ca:"El piano és una orquestra sencera sota deu dits.",es:"El piano es una orquesta entera bajo diez dedos.",en:"The piano is a whole orchestra under ten fingers."},
{a:"C. Debussy",ca:"La música comença allà on acaba la paraula.",es:"La música comienza donde acaba la palabra.",en:"Music begins where the word ends."},
{a:"M. Ravel",ca:"La inspiració no és una excusa per a la mandra.",es:"La inspiración no es una excusa para la pereza.",en:"Inspiration is no excuse for laziness."},
{a:"I. Stravinsky",ca:"La música és, per naturalesa, incapaç d'expressar res en absolut.",es:"La música es, por naturaleza, incapaz de expresar nada en absoluto.",en:"Music is, by its very nature, incapable of expressing anything at all."},
{a:"John Cage",ca:"No entenc per què la gent tem les idees noves: jo temo les velles.",es:"No entiendo por qué la gente teme las ideas nuevas: yo temo las viejas.",en:"I can't understand why people are frightened of new ideas. I'm frightened of the old ones."},
{a:"Philip Glass",ca:"La música és un lloc on vas.",es:"La música es un lugar al que vas.",en:"Music is a place you go."},
{a:"Steve Reich",ca:"Si no t'agrada el que escoltes, canvia la teva manera d'escoltar.",es:"Si no te gusta lo que escuchas, cambia tu manera de escuchar.",en:"If you don't like what you hear, change the way you listen."},
{a:"Frank Zappa",ca:"Parlar de música és com ballar arquitectura.",es:"Hablar de música es como bailar arquitectura.",en:"Talking about music is like dancing architecture."},
{a:"Jimi Hendrix",ca:"La música no menteix: si vols canviar el món, canvia-ho a través d'ella.",es:"La música no miente: si quieres cambiar el mundo, cámbialo a través de ella.",en:"Music doesn't lie: if you want to change the world, change it through music."},
{a:"Bob Marley",ca:"El bo de la música és que, quan et colpeja, no sents dolor.",es:"Lo bueno de la música es que, cuando te golpea, no sientes dolor.",en:"One good thing about music: when it hits you, you feel no pain."},
{a:"David Bowie",ca:"La música em dona una veu que no tinc en la parla.",es:"La música me da una voz que no tengo al hablar.",en:"Music gives me a voice I don't have in speech."},
{a:"Freddie Mercury",ca:"No seguiré les regles: vull fer la meva pròpia música.",es:"No seguiré las reglas: quiero hacer mi propia música.",en:"I won't follow the rules: I want to make my own music."},
{a:"Paul McCartney",ca:"La música és un idioma universal que tothom entén.",es:"La música es un idioma universal que todos entienden.",en:"Music is a universal language that everyone understands."},
{a:"Stevie Wonder",ca:"La música és el meu món: és on sóc lliure.",es:"La música es mi mundo: es donde soy libre.",en:"Music is my world: it's where I'm free."},
{a:"Prince",ca:"La música és el remei.",es:"La música es el remedio.",en:"Music is the medicine."},
{a:"B.B. King",ca:"El blues és una sensació, no una tècnica.",es:"El blues es una sensación, no una técnica.",en:"The blues is a feeling, not a technique."},
{a:"Quincy Jones",ca:"La música és el llenguatge de Déu.",es:"La música es el lenguaje de Dios.",en:"Music is the language of God."},
{a:"Hans Zimmer",ca:"Si no t'espanta el que fas, no estàs fent res interessant.",es:"Si no te asusta lo que haces, no estás haciendo nada interesante.",en:"If what you're doing doesn't scare you, you're not doing anything interesting."},
{a:"Ennio Morricone",ca:"La música és el llenguatge de l'inconscient.",es:"La música es el lenguaje del inconsciente.",en:"Music is the language of the unconscious."},
{a:"Pau Casals",ca:"La música és la manera divina de dir coses belles i poètiques al cor.",es:"La música es la manera divina de decir cosas bellas y poéticas al corazón.",en:"Music is the divine way to say beautiful, poetic things to the heart."},
{a:"Frederic Mompou",ca:"Només sé compondre en silenci.",es:"Solo sé componer en silencio.",en:"I only know how to compose in silence."},
{a:"Daniel Barenboim",ca:"La música no et fa més intel·ligent: et fa més humà.",es:"La música no te hace más inteligente: te hace más humano.",en:"Music doesn't make you smarter: it makes you more human."},
{a:"Yo-Yo Ma",ca:"La música ens ajuda a entendre què significa ser humà.",es:"La música nos ayuda a entender qué significa ser humano.",en:"Music helps us understand what it means to be human."},
{a:"Martha Argerich",ca:"No m'agrada practicar: m'agrada tocar.",es:"No me gusta practicar: me gusta tocar.",en:"I don't like to practise: I like to play."},
{a:"Glenn Gould",ca:"El propòsit de l'art no és l'adrenalina, sinó construir un estat de meravella.",es:"El propósito del arte no es la adrenalina, sino construir un estado de asombro.",en:"The purpose of art is not adrenaline, but the construction of a state of wonder."},
{a:"Artur Rubinstein",ca:"Si busques la perfecció, mai no estaràs satisfet.",es:"Si buscas la perfección, nunca estarás satisfecho.",en:"If you seek perfection, you will never be satisfied."},
{a:"Keith Jarrett",ca:"Improvisar és escoltar el que encara no ha passat.",es:"Improvisar es escuchar lo que aún no ha pasado.",en:"Improvising is listening to what hasn't happened yet."},
{a:"Victor Wooten",ca:"La música és un llenguatge: aprèn-la com aprens una llengua.",es:"La música es un lenguaje: apréndelo como aprendes una lengua.",en:"Music is a language: learn it the way you learn a language."},
{a:"Jacob Collier",ca:"La música és infinita, i això és el més bonic.",es:"La música es infinita, y eso es lo más bonito.",en:"Music is infinite, and that's the most beautiful thing."},
{a:"Gustav Mahler",ca:"La tradició no és l'adoració de les cendres, sinó la preservació del foc.",es:"La tradición no es la adoración de las cenizas, sino la preservación del fuego.",en:"Tradition is not the worship of ashes, but the preservation of fire."},
{a:"Leonard Bernstein",ca:"La música pot anomenar l'innombrable i comunicar l'inconegut.",es:"La música puede nombrar lo innombrable y comunicar lo desconocido.",en:"Music can name the unnameable and communicate the unknowable."},
{a:"S. Rachmaninoff",ca:"La música és suficient per a tota una vida, però tota una vida no és suficient per a la música.",es:"La música es suficiente para toda una vida, pero toda una vida no es suficiente para la música.",en:"Music is enough for a lifetime, but a lifetime is not enough for music."},
{a:"P.I. Txaikovski",ca:"La inspiració és una convidada que no visita de bon grat el mandrós.",es:"La inspiración es una invitada que no visita de buen grado al perezoso.",en:"Inspiration is a guest who does not gladly visit the lazy."},
{a:"Robert Schumann",ca:"Envia llum a la foscor del cor dels altres: aquesta és la feina del músic.",es:"Envía luz a la oscuridad del corazón de los demás: ese es el trabajo del músico.",en:"Send light into the darkness of other people's hearts: that is the musician's job."},
{a:"Plató",ca:"La música dona ànima a l'univers, ales a la ment i vol a la imaginació.",es:"La música da alma al universo, alas a la mente y vuelo a la imaginación.",en:"Music gives soul to the universe, wings to the mind and flight to the imagination."},
{a:"Friedrich Nietzsche",ca:"Sense la música, la vida seria un error.",es:"Sin la música, la vida sería un error.",en:"Without music, life would be a mistake."},
{a:"Victor Hugo",ca:"La música expressa allò que no es pot dir i allò que és impossible de callar.",es:"La música expresa lo que no puede decirse y aquello que es imposible callar.",en:"Music expresses what cannot be said and what is impossible to keep silent."},
{a:"Hans Christian Andersen",ca:"On fallen les paraules, parla la música.",es:"Donde fallan las palabras, habla la música.",en:"Where words fail, music speaks."},
{a:"Aldous Huxley",ca:"Després del silenci, el que més s'acosta a l'inexpressable és la música.",es:"Después del silencio, lo que más se acerca a expresar lo inexpresable es la música.",en:"After silence, that which comes closest to expressing the inexpressible is music."}];
let quoteShown=false,langPicked=false,lastQuoteIdx=0;
function quoteIndex(){let idx;const last=sessionStorage.getItem('lastQuote');do{idx=Math.floor(Math.random()*QUOTES.length);}while(QUOTES.length>1&&idx===+last);sessionStorage.setItem('lastQuote',idx);return idx;}
function renderQuote(){const q=QUOTES[lastQuoteIdx];const lang=(currentLang==='es'||currentLang==='en')?currentLang:'ca';
document.getElementById('v10-quote-text').textContent='\u201C'+(q[lang]||q.ca)+'\u201D';
document.getElementById('v10-quote-author').textContent='\u2014 '+q.a;}
const pwModal=document.getElementById('password-modal');
new MutationObserver(()=>{if(!quoteShown&&pwModal.classList.contains('hidden')){quoteShown=true;langPick.classList.add('visible');}}).observe(pwModal,{attributes:true,attributeFilter:['class']});
langPick.querySelectorAll('.v10-lang-btn').forEach(b=>b.addEventListener('click',()=>{
if(langPicked)return;langPicked=true;
try{currentLang=b.dataset.lang;updateLanguageUI();}catch(e){}
langPick.classList.remove('visible');
lastQuoteIdx=quoteIndex();renderQuote();
quoteScr.classList.add('visible');
setTimeout(()=>quoteScr.classList.remove('visible'),4200);
}));
setInterval(()=>{
const qVis=quoteScr.classList.contains('visible');
const startVis=!document.getElementById('start-screen').classList.contains('hidden');
if(!langPicked&&pwModal.classList.contains('hidden')&&startVis&&!langPick.classList.contains('visible')&&!qVis)langPick.classList.add('visible');
},700);
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{if(quoteScr.classList.contains('visible'))renderQuote();}));
/* ══════════ CAPA V11: BLOQUEIG SOTA MODALS ══════════ */
const modalWatch=[resultModal,pauseModal,battleResultModal];
const syncBackdrop=()=>{backdrop.style.display=modalWatch.some(m=>m.classList.contains('visible'))?'block':'none';};
modalWatch.forEach(m=>new MutationObserver(syncBackdrop).observe(m,{attributes:true,attributeFilter:['class']}));
syncBackdrop();
new MutationObserver(()=>{blocker.classList.toggle('visible',battleResultModal.classList.contains('visible'));}).observe(battleResultModal,{attributes:true,attributeFilter:['class']});
/* ══════════ PART 2/2 — POSICIONS, GRAUS, MIDI, IMATGES ══════════ */
function applyPositionsFrom(data){Object.keys(wrappers).forEach(ni=>{const d=data[ni];const w=wrappers[ni];if(!d||!w)return;w.style.left=d.x+'%';w.style.top=d.y+'%';w.style.zIndex=d.z||10;const im=w.querySelector('.note-img');if(im)im.style.width=(d.size*100/DESIGN_WIDTH)+'vw';});}
const diatonicDegrees=[0,2,4,5,7,9,11],nonDiatonicDegrees=[1,3,6,8,10];
function getTransposedIndex(pc){return(pc-currentKeyRoot+12)%12;}
function midiToFreq(m){return 440*Math.pow(2,(m-69)/12);}
function getDegreeNumber(pc){return['1','b2','2','b3','3','4','#4','5','b6','6','b7','7'][pc];}
const CENTERED_NUMBERS=[0,1,2,7,9,10];
Object.keys(noteData).forEach(ni=>{const d=noteData[ni];const w=document.createElement('div');w.className='note-wrapper';w.style.left=d.x+'%';w.style.top=d.y+'%';w.style.zIndex=d.z||10;w.dataset.noteIndex=ni;const img=document.createElement('img');img.className='note-img';img.src=imagePath+d.name;img.style.width=(d.size*100/DESIGN_WIDTH)+'vw';const num=document.createElement('div');num.className='note-number';num.textContent=getDegreeNumber(parseInt(ni));if(CENTERED_NUMBERS.includes(parseInt(ni)))num.classList.add('center-position');else num.classList.add('top-position');w.appendChild(num);w.noteNumber=num;const bb=document.createElement('button');bb.className='bring-to-front-btn';bb.innerText='TOP';bb.onclick=e=>{e.stopPropagation();maxZIndex++;w.style.zIndex=maxZIndex;(editData||noteData)[ni].z=maxZIndex;};w.appendChild(img);w.appendChild(bb);document.body.appendChild(w);wrappers[ni]=w;w.addEventListener('mousedown',startDrag);w.addEventListener('touchstart',startDrag);});
function startDrag(e){if(!editMode||e.target.classList.contains('bring-to-front-btn'))return;e.preventDefault();dragElement=e.currentTarget;dragElement.classList.add('dragging');const r=dragElement.getBoundingClientRect();const cx=e.touches?e.touches[0].clientX:e.clientX;const cy=e.touches?e.touches[0].clientY:e.clientY;dragOffset.x=cx-r.left-r.width/2;dragOffset.y=cy-r.top-r.height/2;}
function onDrag(e){if(!dragElement)return;e.preventDefault();const cx=e.touches?e.touches[0].clientX:e.clientX;const cy=e.touches?e.touches[0].clientY:e.clientY;dragElement.style.left=((cx-dragOffset.x)/innerWidth)*100+'%';dragElement.style.top=((cy-dragOffset.y)/innerHeight)*100+'%';const ni=dragElement.dataset.noteIndex;(editData||noteData)[ni].x=Math.round(((cx-dragOffset.x)/innerWidth)*1000)/10;(editData||noteData)[ni].y=Math.round(((cy-dragOffset.y)/innerHeight)*1000)/10;}
function endDrag(){if(dragElement){dragElement.classList.remove('dragging');dragElement=null;}}
document.addEventListener('mousemove',onDrag);document.addEventListener('mouseup',endDrag);
document.addEventListener('touchmove',onDrag,{passive:false});document.addEventListener('touchend',endDrag);
function updateModeDisplay(){modeDisplay.textContent=t('mode_prefix')+exclusiveMode.toUpperCase();delayConfig.classList.toggle('visible',exclusiveMode==='delay');}
function setExclusiveMode(mode){stopProva();exclusiveMode=mode;document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));const b=$('btn-'+mode);if(b)b.classList.add('active');if(showTimeout){clearTimeout(showTimeout);showTimeout=null;}activeNotes.clear();heldByPedal.clear();pressedStack=[];normalSustainHold=null;imgElement.classList.remove('visible');cancelDelayProcess();$('zoom-controls').style.display=(mode==='complete')?'flex':'none';$('sound-controls').style.display=(mode==='complete')?'flex':'none';Object.values(wrappers).forEach(w=>{w.classList.remove('visible');w.style.opacity='0';if(w.noteNumber){w.noteNumber.classList.remove('visible');w.noteNumber.classList.remove('active-note');}});if(mode==='edit'){editMode=true;editData=JSON.parse(JSON.stringify(noteData));editControls.style.display='flex';imgElement.style.display='none';Object.values(wrappers).forEach(w=>{w.style.display='block';w.classList.add('visible','draggable');w.style.opacity='1';if(w.noteNumber)w.noteNumber.classList.add('visible');});}else{if(editData){applyPositionsFrom(noteData);editData=null;}editMode=false;editControls.style.display='none';Object.values(wrappers).forEach(w=>w.classList.remove('draggable'));if(mode==='multi'||mode==='complete'){imgElement.style.display='none';Object.values(wrappers).forEach(w=>{w.style.display='block';w.style.opacity='0';w.classList.remove('visible');if(w.noteNumber)w.noteNumber.classList.remove('visible');});if(mode==='complete')Object.values(wrappers).forEach(w=>{w.classList.add('visible');w.style.opacity='1';if(w.noteNumber)w.noteNumber.classList.add('visible');});}else{imgElement.style.display='block';Object.values(wrappers).forEach(w=>{w.style.display='none';w.style.opacity='0';w.classList.remove('visible');if(w.noteNumber)w.noteNumber.classList.remove('visible');});}}updateModeDisplay();updateTonicBtn();}
['normal','lead','bass','delay','multi','edit'].forEach(m=>{$('btn-'+m).addEventListener('click',()=>setExclusiveMode(m));});
$('btn-complete').addEventListener('click',()=>{if(exclusiveMode==='complete')setExclusiveMode('multi');else{setExclusiveMode('complete');loadZoom();positionZoomControls();}});
/* [PEGAT 4] Canvi de tonalitat al Laboratori: re-afina el dron de tònica a l'instant */
keySelect.addEventListener('change',e=>{currentKeyRoot=+e.target.value;$('ear-key-select').value=currentKeyRoot;if(midiMode.classList.contains('active')&&tonicPedalOscs.length){stopTonicPedal(false);startTonicPedal();}});
$('btn-save-edit').addEventListener('click',()=>{if(editData){noteData=JSON.parse(JSON.stringify(editData));}Object.keys(wrappers).forEach(ni=>{noteData[ni].z=parseInt(wrappers[ni].style.zIndex)||noteData[ni].z;});localStorage.setItem(STORAGE_KEY,JSON.stringify(noteData));applyPositionsFrom(noteData);toast.style.display='block';setTimeout(()=>toast.style.display='none',3000);setExclusiveMode('complete');positionZoomControls();});
$('btn-reset').addEventListener('click',()=>{if(confirm(t('reset_confirm'))){localStorage.removeItem(STORAGE_KEY);location.reload();}});
$('btn-cancel-edit').addEventListener('click',()=>setExclusiveMode('complete'));
/* ══════════ i18n ══════════ */
function updateLanguageUI(){
document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(translations[currentLang][k]){if(el.tagName==='INPUT')el.placeholder=translations[currentLang][k];else if(['SPAN','DIV','H2','H3','H4','BUTTON','P','OPTION'].includes(el.tagName))el.innerHTML=translations[currentLang][k];}});
const scMap={'sc-title':'sc_title','sc-lbl-vol':'sc_volume','sc-lbl-fade':'sc_fadein','sc-lbl-atk':'sc_attack','sc-lbl-dec':'sc_decay','sc-lbl-sus':'sc_sustain','sc-lbl-dur':'sc_duration','sc-lbl-bri':'sc_bright'};
Object.keys(scMap).forEach(id=>{const el=$(id);if(el)el.textContent=t(scMap[id]);});
const scTest=$('sc-test');if(scTest&&!scTest.classList.contains('stop'))scTest.textContent=t('test_sound');
document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
const mk=$('key-select'),ek=$('ear-key-select');const mv=mk.value||currentKeyRoot,ev=ek.value||currentKeyRoot;
let html='';MUSICAL_KEYS.forEach((n,i)=>{html+=`<option value="${i}">${n} ${t('word_major')}</option>`;});mk.innerHTML=html;ek.innerHTML=html;mk.value=mv;ek.value=ev;
if(battleModal){battleModal.querySelector('h2').textContent=t('battle_title');battleModal.querySelector('.battle-box > p').textContent=t('battle_description');$('btn-battle-start').textContent=t('start_battle_btn');const hint=battleModal.querySelector('.battle-hint');if(hint)hint.textContent=t('battle_enter_hint');}
updateModeDisplay();updateAccuracyDisplay();updateDifficultyButtons();updateReFullBtn();
}
document.querySelectorAll('.lang-btn').forEach(b=>{b.addEventListener('click',()=>{currentLang=b.dataset.lang;updateLanguageUI();});});
const IS_ELECTRON=navigator.userAgent.toLowerCase().includes('electron');
function toggleFullscreen(){if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(e=>console.log(e));else document.exitFullscreen();}
function autoFullscreen(){if(!IS_ELECTRON&&!document.fullscreenElement){document.documentElement.requestFullscreen().catch(()=>{});}}
let reFullBtn=null;
function ensureReFullBtn(){if(reFullBtn)return reFullBtn;reFullBtn=document.createElement('button');reFullBtn.id='btn-refullscreen';reFullBtn.style.cssText='position:fixed;z-index:60000;background:#222831;border:1px solid #8c52ff;color:#fff;border-radius:8px;padding:3px 7px;cursor:pointer;font-size:12px;display:none;box-shadow:0 0 10px rgba(140,82,255,0.4);line-height:1;';reFullBtn.addEventListener('click',()=>{document.documentElement.requestFullscreen().catch(()=>{});});document.body.appendChild(reFullBtn);return reFullBtn;}
function updateReFullBtn(){const b=ensureReFullBtn();const activeSession=startScreen.classList.contains('hidden');const inMidi=midiMode.classList.contains('active');const inEar=earMode.classList.contains('active');b.textContent='🖥️';b.title=t('fullscreen');const shouldShow=!IS_ELECTRON&&activeSession&&!document.fullscreenElement;b.style.display=shouldShow?'block':'none';if(!shouldShow)return;const scale=currentZoom/100;const br=document.body.getBoundingClientRect();b.style.left='auto';b.style.right='auto';b.style.top='auto';b.style.bottom='auto';b.style.transform='none';if(inMidi){const back=$('btn-back-midi');if(back){const r=back.getBoundingClientRect();const bh=b.offsetHeight||24;b.style.left=((r.left-br.left)/scale)+'px';b.style.top=((r.top-br.top-bh-8)/scale)+'px';}}else if(inEar){const back=$('btn-back-ear'),piano=$('btn-ear-piano');if(back&&piano){const r1=back.getBoundingClientRect(),r2=piano.getBoundingClientRect();const bw=b.offsetWidth||34;const midX=r1.right+(r2.left-r1.right)/2;b.style.left=((midX-bw/2-br.left)/scale)+'px';b.style.top=((r1.top-br.top)/scale)+'px';}}}
$('btn-fullscreen-midi').addEventListener('click',toggleFullscreen);
$('btn-fullscreen-ear').addEventListener('click',toggleFullscreen);
document.addEventListener('fullscreenchange',()=>{const f=!!document.fullscreenElement;const s=f?`🖥️ ${t('exit_fullscreen')}`:`🖥️ ${t('fullscreen')}`;$('btn-fullscreen-midi').innerHTML=s;$('btn-fullscreen-ear').innerHTML=s;updateReFullBtn();});
function checkOtherTabs(){const a=localStorage.getItem(MIDI_TAB_KEY);if(a&&a!==TAB_ID){multiTabWarning.classList.add('visible');setTimeout(()=>multiTabWarning.classList.remove('visible'),3000);return true;}return false;}
function setMidiActive(){localStorage.setItem(MIDI_TAB_KEY,TAB_ID);isMidiActive=true;}
window.addEventListener('beforeunload',()=>{if(isMidiActive)localStorage.removeItem(MIDI_TAB_KEY);});
window.addEventListener('storage',e=>{if(e.key===MIDI_TAB_KEY&&e.newValue&&e.newValue!==TAB_ID&&isMidiActive){multiTabWarning.classList.add('visible');setTimeout(()=>multiTabWarning.classList.remove('visible'),3000);}});
$('btn-info').addEventListener('click',()=>{infoModal.classList.add('visible');if(typeof playMelody==='function'&&typeof DEBUSSY!=='undefined')playMelody(DEBUSSY,DEBUSSY_TEMPO_SCALE,null,'',0.5,false);});
$('btn-close-info').addEventListener('click',()=>{infoModal.classList.remove('visible');stopProva();});
$('btn-help-midi').addEventListener('click',()=>{$('instructions-content').innerHTML=t('help_midi');$('instructions-modal').classList.add('visible');});
$('btn-help-ear').addEventListener('click',()=>{$('instructions-content').innerHTML=t('help_ear');$('instructions-modal').classList.add('visible');});
$('btn-close-instructions').addEventListener('click',()=>$('instructions-modal').classList.remove('visible'));
document.addEventListener('keydown',(e)=>{if((e.key==='Enter'||e.key==='Escape')&&$('instructions-modal').classList.contains('visible')){e.preventDefault();e.stopPropagation();$('instructions-modal').classList.remove('visible');}},true);
function cleanupMidiAudio(){stopAllPianoNotes();}
function cleanupEarAudio(){stopAllPianoNotes();stopTonicPedal(true);}
/* ══════════ BATTLE + MORT SÚBITA ══════════ */
let sdActive=false,sdCount=0,sdWinner=null,sdPairMiss=[false,false],sdPairAns=0,sdBannerTO=null;
let lastStopWasFade=false,naturalEnd=false;
/* [PEGAT 5] soloTimes per a estadístiques de temps a TEST/PRÀCTICA */
let v10LastNoteAt=0,wasInAnswer=false,v10LastHumanNote=0,soloTimes=[];
let v10PendingFlash=null,v10PendingTurn=null,thumbTO=null;
let sdTotalPairs=0;
function showBattleModal(){battleModal.classList.add('visible');$('battle-player1-name').value=battlePlayer1Name;$('battle-player2-name').value=battlePlayer2Name;setTimeout(()=>$('battle-player1-name').focus(),50);}
function hideBattleModal(){battleModal.classList.remove('visible');}
function startBattle(){
battlePlayer1Name=$('battle-player1-name').value.trim()||(t('player')+' 1');
battlePlayer2Name=$('battle-player2-name').value.trim()||(t('player')+' 2');
bp1={correct:0,total:0};bp2={correct:0,total:0};
battleCurrentPlayer=1;battleMode=true;
sdActive=false;sdCount=0;sdWinner=null;sdPairMiss=[false,false];sdPairAns=0;sdTotalPairs=0;naturalEnd=false;
hideBattleModal();
document.body.classList.add('battle-on');
battleScoreboard.classList.add('visible');
p1Box.classList.add('visible');
p2Box.classList.add('visible');
proposedAnswerBox.classList.remove('visible');
accuracyPanel.classList.remove('visible');
$('p1-name-label').textContent=battlePlayer1Name;
$('p2-name-label').textContent=battlePlayer2Name;
updateBattleScoreboard();updateBattleAccuracy();
positionBattleBoxes();
startEarTraining();
showBattleTurn();
}
function positionBattleBoxes(){if(!p1Box.classList.contains('visible'))return;const r=earPanel.getBoundingClientRect();let top=r.bottom+12;const h=Math.max(p1Box.offsetHeight||220,p2Box.offsetHeight||220);const maxTop=innerHeight-h-90;if(top>maxTop)top=Math.max(90,maxTop);p1Box.style.top=top+'px';p2Box.style.top=top+'px';}
function showBattleTurn(){if(!battleMode)return;const name=battleCurrentPlayer===1?battlePlayer1Name:battlePlayer2Name;battleTurnIndicator.textContent='🎯 '+t('battle_your_turn').replace('{X}',name);battleTurnIndicator.classList.add('visible');if(turnIndicatorTimeout)clearTimeout(turnIndicatorTimeout);turnIndicatorTimeout=setTimeout(()=>{battleTurnIndicator.classList.remove('visible');turnIndicatorTimeout=null;},BATTLE_TURN_MS);updateBattleScoreboard();}
function updateBattleScoreboard(){if(!battleMode)return;$('battle-p1-name').textContent=battlePlayer1Name;$('battle-p2-name').textContent=battlePlayer2Name;$('battle-p1-score').textContent=bp1.correct;$('battle-p2-score').textContent=bp2.correct;$('battle-p1-display').classList.toggle('active',battleCurrentPlayer===1);$('battle-p2-display').classList.toggle('active',battleCurrentPlayer===2);p1Box.classList.toggle('active-turn',battleCurrentPlayer===1);p2Box.classList.toggle('active-turn',battleCurrentPlayer===2);}
function updateBattleAccuracy(){const p1p=bp1.total?Math.round(bp1.correct/bp1.total*100):0;const p2p=bp2.total?Math.round(bp2.correct/bp2.total*100):0;p1AccuracyValue.textContent=p1p+'%';p1AccuracyDetails.textContent=`${bp1.correct} / ${bp1.total} ${t('word_notes')}`;p2AccuracyValue.textContent=p2p+'%';p2AccuracyDetails.textContent=`${bp2.correct} / ${bp2.total} ${t('word_notes')}`;}
function battlePlayerAnswered(ok){if(!battleMode)return;
if(v10PendingFlash){clearTimeout(v10PendingFlash);v10PendingFlash=null;}
if(v10PendingTurn){clearTimeout(v10PendingTurn);v10PendingTurn=null;}
flash.classList.remove('visible');battleTurnIndicator.classList.remove('visible');
const answerer=battleCurrentPlayer,cur=answerer===1?bp1:bp2;
if(!cur.times)cur.times=[];
const isTimeout=!sdActive&&!ok&&(performance.now()-v10LastHumanNote)>2000;
cur.total++;
let fmsg,fcol;
if(ok){cur.correct++;fmsg='✔ '+t('v10_flash_nice');fcol='#00ff66';}
else{fmsg=isTimeout?('⏱ '+t('v10_timeout')):('✖ '+t('v10_flash_miss'));fcol=isTimeout?'#ffaa00':'#ff0055';}
cur.times.push(performance.now()-(v10LastNoteAt||performance.now()));
if(sdActive){sdPairAns++;if(!ok)sdPairMiss[answerer-1]=true;}
battleCurrentPlayer=answerer===1?2:1;
updateBattleAccuracy();updateBattleScoreboard();
v10PendingFlash=setTimeout(()=>{v10PendingFlash=null;if(battleMode)v10Flash(fmsg,fcol);},800);
v10PendingTurn=setTimeout(()=>{v10PendingTurn=null;if(battleMode)showBattleTurn();},1600);
if(sdActive&&sdPairAns>=2){const m1=sdPairMiss[0],m2=sdPairMiss[1];
if(m1!==m2){sdWinner=m1?2:1;stopEarTraining(false);}
else{sdPairMiss=[false,false];sdPairAns=0;sdTotalPairs++;
if(sdTotalPairs>=30){showBattleResultModal();stopEarTraining(false);}}}}
let battleResultImg=null;
function ensureBattleResultImg(){if(battleResultImg)return battleResultImg;battleResultImg=document.createElement('img');battleResultImg.id='battle-result-img';battleResultImg.style.cssText='width:100%;max-height:230px;object-fit:cover;border-radius:14px;margin-bottom:16px;border:2px solid #ffaa00;display:none;';battleResultModal.insertBefore(battleResultImg,battleResultModal.firstChild);return battleResultImg;}
function battleResultImageFile(){if(bp1.correct===bp2.correct)return'battle_draw.png';const p1wins=bp1.correct>bp2.correct;const wc=p1wins?bp1.correct:bp2.correct;const wt=p1wins?bp1.total:bp2.total;if(wt>0&&wc===wt)return'battle_perfect.png';if(Math.abs(bp1.correct-bp2.correct)>=3)return'battle_ko.png';return'battle_win.png';}
function showBattleResultModal(){sdActive=false;let txt;if(bp1.correct>bp2.correct)txt=t('battle_winner').replace('{X}',battlePlayer1Name);else if(bp2.correct>bp1.correct)txt=t('battle_winner').replace('{X}',battlePlayer2Name);else txt=t('battle_tie');$('battle-winner-name').textContent=txt;$('battle-stat-p1-name').textContent=battlePlayer1Name;$('battle-stat-p1-score').textContent=`${bp1.correct} / ${bp1.total}`;$('battle-stat-p2-name').textContent=battlePlayer2Name;$('battle-stat-p2-score').textContent=`${bp2.correct} / ${bp2.total}`;const img=ensureBattleResultImg();img.src=imagePath+battleResultImageFile();img.style.display='block';battleResultModal.classList.add('visible');}
function cleanupBattleUI(){if(battleResultTimeout){clearTimeout(battleResultTimeout);battleResultTimeout=null;}battleResultModal.classList.remove('visible');battleMode=false;document.body.classList.remove('battle-on');battleScoreboard.classList.remove('visible');battleTurnIndicator.classList.remove('visible');if(turnIndicatorTimeout){clearTimeout(turnIndicatorTimeout);turnIndicatorTimeout=null;}p1Box.classList.remove('visible','active-turn');p1AnswerImage.classList.remove('visible');p2Box.classList.remove('visible','active-turn');p2AnswerImage.classList.remove('visible');proposedAnswerBox.classList.remove('visible','active-turn');accuracyPanel.classList.remove('visible','active-turn');sdActive=false;sdPairAns=0;sdPairMiss=[false,false];sdTotalPairs=0;}
$('btn-battle-start').addEventListener('click',startBattle);
$('btn-battle-cancel').addEventListener('click',hideBattleModal);
['battle-player1-name','battle-player2-name'].forEach(id=>{$(id).addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopPropagation();startBattle();}});$(id).setAttribute('maxlength','12');});
$('btn-battle-close').addEventListener('click',()=>{battleResultModal.classList.remove('visible');});
/* ══════════ CAPA V11: BATTLE AVANÇAT ══════════ */
setInterval(()=>{if(inAnswerPhase&&!wasInAnswer)v10LastNoteAt=performance.now();wasInAnswer=inAnswerPhase;},150);
const ensureStats=bp=>{if(!bp.times)bp.times=[];};
let flashTO=null;
const v10Flash=(txt,color)=>{flash.textContent=txt;flash.style.color=color;flash.classList.add('visible');if(flashTO)clearTimeout(flashTO);flashTO=setTimeout(()=>flash.classList.remove('visible'),700);};
const showThumb=ok=>{const isP1=battleCurrentPlayer===1,box=isP1?p1Box:p2Box;
thumb.textContent=ok?'👍':'';
const scale=(typeof currentZoom==='number'?currentZoom:100)/100;
const r=box.getBoundingClientRect();
thumb.style.left=((isP1?(r.right-24):(r.left+24))/scale)+'px';
thumb.style.top=((r.top+20)/scale)+'px';
thumb.classList.add('visible');
if(thumbTO)clearTimeout(thumbTO);thumbTO=setTimeout(()=>thumb.classList.remove('visible'),700);};
const _sfcOrig=showFeedbackCorrect;
showFeedbackCorrect=function(){if(feedbackHideTimeout)clearTimeout(feedbackHideTimeout);
if(battleMode){showThumb(true);return;}
feedbackCorrect.className='visible';feedbackWrong.className='';feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},700);};
const _sfwOrig=showFeedbackWrong;
showFeedbackWrong=function(){if(feedbackHideTimeout)clearTimeout(feedbackHideTimeout);
if(battleMode){showThumb(false);return;}
feedbackWrong.className='visible';feedbackCorrect.className='';feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},700);};
const _stopWrap2=stopEarTraining;
stopEarTraining=function(f){const wasB=battleMode,played=earUserHasPlayed;lastStopWasFade=!!f;
const r=_stopWrap2(f);
if(wasB&&!played&&(f||naturalEnd)){setTimeout(()=>{if(!battleMode&&!battleResultModal.classList.contains('visible')&&!sudden.classList.contains('visible'))showBattleResultModal();},600);}
return r;};
const _advWrap=advanceToNextNote;
advanceToNextNote=function(){if(battleMode&&battleLastQ===2)naturalEnd=true;return _advWrap.apply(this,arguments);};
const _showBattleTurnOrig=showBattleTurn;
showBattleTurn=function(){const r=_showBattleTurnOrig();if(turnIndicatorTimeout){clearTimeout(turnIndicatorTimeout);turnIndicatorTimeout=null;}return r;};
const v10RenderStats=()=>{const avg=bp=>(bp.times&&bp.times.length)?(bp.times.reduce((a,b)=>a+b,0)/bp.times.length/1000).toFixed(1):'0.0';
const extra=document.getElementById('battle-extra-stats');if(!extra)return;
extra.innerHTML='<div class="xs"><b>'+battlePlayer1Name+'</b>✔ '+bp1.correct+' '+t('v10_correct')+'<br>⏱ '+avg(bp1)+' '+t('v10_avg')+'</div>'+
'<div class="xs"><b>'+battlePlayer2Name+'</b>✔ '+bp2.correct+' '+t('v10_correct')+'<br>⏱ '+avg(bp2)+' '+t('v10_avg')+'</div>';};
const showFinalResult=winnerIdx=>{sdActive=false;
let txt;if(winnerIdx===1)txt=t('battle_winner').replace('{X}',battlePlayer1Name);
else if(winnerIdx===2)txt=t('battle_winner').replace('{X}',battlePlayer2Name);
else txt=t('battle_tie');
$('battle-winner-name').textContent=txt;
$('battle-stat-p1-name').textContent=battlePlayer1Name;$('battle-stat-p2-name').textContent=battlePlayer2Name;
$('battle-stat-p1-score').textContent=bp1.correct+' '+t('v10_correct');
$('battle-stat-p2-score').textContent=bp2.correct+' '+t('v10_correct');
v10RenderStats();
const w=winnerIdx===1?bp1:winnerIdx===2?bp2:null;
let file='battle_win.png';
if(winnerIdx===null)file='battle_draw.png';
else if(w&&w.total>0&&w.correct===w.total)file='battle_perfect.png';
else if(Math.abs(bp1.correct-bp2.correct)>=3)file='battle_ko.png';
const img=ensureBattleResultImg();img.src=imagePath+file;img.style.display='block';
battleResultModal.classList.add('visible');};
const startSDRound=()=>{battleResultModal.classList.remove('visible');
earTrainingActive=false;
battleMode=true;document.body.classList.add('battle-on');
battleScoreboard.classList.add('visible');p1Box.classList.add('visible');p2Box.classList.add('visible');
positionBattleBoxes();updateBattleScoreboard();
naturalEnd=false;startEarTraining();};
const startSD=()=>{if(sdCount>=2){showFinalResult(null);return;}
sdCount++;sdActive=true;sdWinner=null;sdPairMiss=[false,false];sdPairAns=0;sdTotalPairs=0;
sudden.querySelector('h2').textContent=t('sudden_death_title');
sudden.querySelector('p').textContent=t('sudden_death_text');
sudden.classList.add('visible');
if(sdBannerTO)clearTimeout(sdBannerTO);
sdBannerTO=setTimeout(()=>{sudden.classList.remove('visible');startSDRound();},6500);};
const _showBattleResultOrig=showBattleResultModal;
showBattleResultModal=function(){if(sdWinner){const w=sdWinner;sdWinner=null;showFinalResult(w);return;}
if(bp1.correct===bp2.correct&&(lastStopWasFade||naturalEnd)){startSD();return;}
showFinalResult(bp1.correct>bp2.correct?1:bp2.correct>bp1.correct?2:null);};
const _cleanupBattleOrig=cleanupBattleUI;
cleanupBattleUI=function(){if(v10PendingFlash){clearTimeout(v10PendingFlash);v10PendingFlash=null;}
if(v10PendingTurn){clearTimeout(v10PendingTurn);v10PendingTurn=null;}
flash.classList.remove('visible');sudden.classList.remove('visible');
sdActive=false;sdPairAns=0;sdPairMiss=[false,false];sdTotalPairs=0;
return _cleanupBattleOrig();};
setInterval(()=>{const chip=document.getElementById('v10-sd-chip');if(chip)chip.classList.toggle('visible',!!(sdActive&&battleMode));},400);
/* ══════════ ENTRADA ALS MODES ══════════ */
$('btn-start-midi').addEventListener('click',()=>{if(checkOtherTabs())return;autoFullscreen();cleanupEarAudio();getSharedCtx();setMidiActive();startScreen.classList.add('hidden');midiMode.classList.add('active');earMode.classList.remove('active');accuracyPanel.classList.remove('visible');proposedAnswerBox.classList.remove('visible');resultModal.classList.remove('visible');hideAllFeedback();initMIDI();setExclusiveMode('normal');updateManualButtonsVisibility();updatePianoButtons();if(internalPianoEnabled)$('btn-piano').classList.add('active');});
$('btn-start-ear').addEventListener('click',()=>{autoFullscreen();startScreen.classList.add('hidden');earMode.classList.add('active');midiMode.classList.remove('active');updateModeButtons();renderFilterPanel();accuracyPanel.classList.remove('visible');proposedAnswerBox.classList.remove('visible');resultModal.classList.remove('visible');hideAllFeedback();imgElement.style.display='';imgElement.classList.remove('visible');if(manualPanelVisible){manualPanelVisible=false;manualPanel.classList.remove('visible');manualPanel.classList.remove('ear-position');$('btn-toggle-manual').classList.remove('active');$('btn-toggle-manual-ear').classList.remove('active');}Object.values(wrappers).forEach(w=>{w.style.display='none';w.style.opacity='0';w.classList.remove('visible','draggable','active-note');if(w.noteNumber)w.noteNumber.classList.remove('visible','active-note');});$('ear-key-select').value=currentKeyRoot;$('btn-ear-piano').classList.add('visible');$('btn-toggle-manual-ear').classList.add('visible');$('ear-sustain-led').classList.add('visible');$('ear-sustain-label').classList.add('visible');updatePianoButtons();if(internalPianoEnabled)$('btn-ear-piano').classList.add('active');initMIDI();});
function stopAllPianoNotes(){Object.keys(activeOscillators).forEach(n=>stopPianoNote(parseInt(n)));activeOscillators={};}
function stopAllEarPianoNotes(){stopAllPianoNotes();}
function exitFullscreenAndStopNotes(){if(document.fullscreenElement)document.exitFullscreen();stopAllPianoNotes();}
$('btn-back-midi').addEventListener('click',()=>{exitFullscreenAndStopNotes();stopProva();cleanupMidiAudio();setExclusiveMode('multi');if(manualPanelVisible){manualPanelVisible=false;manualPanel.classList.remove('visible');manualPanel.classList.remove('ear-position');$('btn-toggle-manual').classList.remove('active');$('btn-toggle-manual-ear').classList.remove('active');}$('zoom-controls').style.display='none';$('sound-controls').style.display='none';midiMode.classList.remove('active');accuracyPanel.classList.remove('visible');proposedAnswerBox.classList.remove('visible');resultModal.classList.remove('visible');hideAllFeedback();if(isMidiActive){localStorage.removeItem(MIDI_TAB_KEY);isMidiActive=false;}startScreen.classList.remove('hidden');});
$('btn-back-ear').addEventListener('click',()=>{exitFullscreenAndStopNotes();earUserHasPlayed=false;stopEarTraining();cleanupEarAudio();earMode.classList.remove('active');updateTonicBtn();$('btn-ear-piano').classList.remove('visible');$('btn-toggle-manual-ear').classList.remove('visible');$('ear-sustain-led').classList.remove('visible');$('ear-sustain-label').classList.remove('visible');accuracyPanel.classList.remove('visible');proposedAnswerBox.classList.remove('visible');resultModal.classList.remove('visible');hideAllFeedback();Object.values(wrappers).forEach(w=>{w.style.display='none';w.style.opacity='0';w.classList.remove('visible','active-note');if(w.noteNumber)w.noteNumber.classList.remove('visible','active-note');});if(manualPanelVisible){manualPanelVisible=false;manualPanel.classList.remove('visible');manualPanel.classList.remove('ear-position');$('btn-toggle-manual').classList.remove('active');$('btn-toggle-manual-ear').classList.remove('active');}cleanupBattleUI();startScreen.classList.remove('hidden');earFilterPanelVisible=false;renderFilterPanel();});
/* ══════════ PIANO INTERN ══════════ */
const pianoTuning={volume:1.0,fadeIn:0,attack:80,decay:1.73,sustain:0.9,duration:4.0,brightness:1.1,instrument:'piano'};
const PIANO_DEFAULTS={volume:1.0,fadeIn:0,attack:80,decay:1.73,sustain:0.9,duration:4.0,brightness:1.1,instrument:'piano'};
const PIANO_VOL_MIN=0.25;
const INSTRUMENTS={piano:{wave:'triangle',harmonics:[1.0,0.5,0.25,0.125],filter:0},soft:{wave:'sine',harmonics:[1.0,0.3,0.1,0.05],filter:0},epiano:{wave:'sine',harmonics:[1.0,0.6,0.15,0.2],filter:0},organ:{wave:'triangle',harmonics:[1.0,0.5,0.33,0.25],filter:0},strings:{wave:'sawtooth',harmonics:[0.6,0.3,0.15,0.08],filter:2500},flute:{wave:'sine',harmonics:[1.0,0.15,0.02,0.0],filter:0}};
function refreshSoundLabels(){$('sc-volume-val').textContent=Math.round(pianoTuning.volume*100)+'%';$('sc-fadein-val').textContent=Math.round(pianoTuning.fadeIn*1000)+'ms';$('sc-attack-val').textContent=Math.round(pianoTuning.attack)+'%';$('sc-decay-val').textContent=pianoTuning.decay.toFixed(2)+'s';$('sc-sustain-val').textContent=Math.round(pianoTuning.sustain*100)+'%';$('sc-duration-val').textContent=pianoTuning.duration.toFixed(1)+'s';$('sc-bright-val').textContent=Math.round(pianoTuning.brightness*100)+'%';}
function syncSoundSliders(){$('sc-volume').value=Math.round((pianoTuning.volume-PIANO_VOL_MIN)/(1-PIANO_VOL_MIN)*100);$('sc-fadein').value=Math.round(pianoTuning.fadeIn*1000);$('sc-attack').value=Math.round(pianoTuning.attack);$('sc-decay').value=Math.round(pianoTuning.decay*100);$('sc-sustain').value=Math.round(pianoTuning.sustain*100);$('sc-duration').value=pianoTuning.duration;$('sc-bright').value=Math.round(pianoTuning.brightness*100);$('sc-instrument').value=pianoTuning.instrument;}
$('sc-volume').addEventListener('input',e=>{pianoTuning.volume=PIANO_VOL_MIN+(parseInt(e.target.value)/100)*(1-PIANO_VOL_MIN);refreshSoundLabels();});
$('sc-fadein').addEventListener('input',e=>{pianoTuning.fadeIn=parseInt(e.target.value)/1000;refreshSoundLabels();});
$('sc-attack').addEventListener('input',e=>{pianoTuning.attack=parseInt(e.target.value);refreshSoundLabels();});
$('sc-decay').addEventListener('input',e=>{pianoTuning.decay=parseInt(e.target.value)/100;refreshSoundLabels();});
$('sc-sustain').addEventListener('input',e=>{pianoTuning.sustain=parseInt(e.target.value)/100;refreshSoundLabels();});
$('sc-duration').addEventListener('input',e=>{pianoTuning.duration=parseFloat(e.target.value);refreshSoundLabels();});
$('sc-bright').addEventListener('input',e=>{pianoTuning.brightness=parseInt(e.target.value)/100;refreshSoundLabels();});
$('sc-instrument').addEventListener('change',e=>{pianoTuning.instrument=e.target.value;});
$('sc-reset').addEventListener('click',()=>{Object.assign(pianoTuning,PIANO_DEFAULTS);syncSoundSliders();refreshSoundLabels();});
syncSoundSliders();refreshSoundLabels();
let provaTimers=[],provaSustain=true,provaPlaying=false,provaBtnActive=null;
const scTestBtn=$('sc-test');
function setMelodyBtn(btn,playing,label){if(!btn)return;btn.textContent=playing?'⏹ STOP':label;btn.classList.toggle('stop',playing);}
function stopProva(){provaTimers.forEach(t0=>clearTimeout(t0));provaTimers=[];stopAllPianoNotes();heldByPedal.clear();provaSustain=true;$('sustain-hint').classList.remove('visible');provaPlaying=false;provaBtnActive=null;setMelodyBtn(scTestBtn,false,t('test_sound'));}
function playMelody(arr,scale,btn,label,volMult=1,useSustain=true){if(provaPlaying)stopProva();if(!arr||!arr.length)return;if(!internalPianoEnabled){internalPianoEnabled=true;updatePianoButtons();}getSharedCtx();provaPlaying=true;provaBtnActive=btn;provaSustain=useSustain;setMelodyBtn(btn,true,label);const base=0.3*volMult;const offset=arr[0][0];const START_DELAY=1;let last=0;arr.forEach(([t0,n,d])=>{const tAdj=(t0-offset)*scale+START_DELAY;provaTimers.push(setTimeout(()=>startPianoNote(n,base,useSustain),tAdj*1000));provaTimers.push(setTimeout(()=>{if(provaSustain&&sustainPedalActive)heldByPedal.add(n);else stopPianoNote(n);},(tAdj+Math.max(0.3,d*scale))*1000));last=Math.max(last,tAdj+Math.max(0.3,d*scale));});provaTimers.push(setTimeout(()=>stopProva(),(last+1.5)*1000));}
scTestBtn.addEventListener('click',()=>{if(provaPlaying&&provaBtnActive===scTestBtn){stopProva();return;}if(typeof BACH_PRELUDE!=='undefined')playMelody(BACH_PRELUDE,BACH_TEMPO_SCALE,scTestBtn,t('test_sound'),1,true);$('sustain-hint').classList.add('visible');positionSustainHint();});
function positionZoomControls(){const scale=currentZoom/100;const p=$('sound-controls').getBoundingClientRect();const z=$('zoom-controls');z.style.position='fixed';z.style.right='auto';z.style.bottom='auto';z.style.transform='none';z.style.margin='0';const h=z.getBoundingClientRect().height||120;const br=document.body.getBoundingClientRect();z.style.top=((p.top-br.top-h-12)/scale)+'px';z.style.left=((p.left-br.left)/scale)+'px';}
function positionSustainHint(){const scale=currentZoom/100;const p=$('sound-controls').getBoundingClientRect();const h=$('sustain-hint');h.style.position='fixed';h.style.right='auto';h.style.bottom='auto';h.style.transform='none';h.style.margin='0';const br=document.body.getBoundingClientRect();h.style.top=((p.bottom-br.top+10)/scale)+'px';h.style.left=((p.left-br.left)/scale)+'px';h.style.width=(p.width/scale)+'px';}
window.addEventListener('resize',()=>{if($('zoom-controls').style.display!=='none')positionZoomControls();if($('sustain-hint').classList.contains('visible'))positionSustainHint();if(tonicBtnEl&&tonicBtnEl.style.display!=='none')positionTonicControls();positionBattleBoxes();});
const SC_SLIDERS=['sc-volume','sc-fadein','sc-attack','sc-decay','sc-sustain','sc-duration','sc-bright'];
document.addEventListener('keydown',(e)=>{if(e.key!=='ArrowUp'&&e.key!=='ArrowDown')return;const el=document.activeElement;if(el&&el.id==='pedal-volume-slider'){e.preventDefault();e.stopPropagation();const delta=(e.key==='ArrowUp')?5:-5;updatePedalVolumeDirect(Math.min(100,Math.max(0,parseInt(el.value)+delta)));return;}if($('sound-controls').style.display!=='flex')return;if(!el||!SC_SLIDERS.includes(el.id))return;e.preventDefault();e.stopPropagation();const idx=SC_SLIDERS.indexOf(el.id);const next=(e.key==='ArrowDown')?idx+1:idx-1;if(next>=0&&next<SC_SLIDERS.length)$(SC_SLIDERS[next]).focus();},true);
function createPianoVoice(midiNote,baseVolume,useSustain=true){const ctx0=getSharedCtx();if(ctx0.state==='suspended'){ctx0.resume().then(()=>buildPianoVoice(midiNote,baseVolume,useSustain));return;}buildPianoVoice(midiNote,baseVolume,useSustain);}
function buildPianoVoice(midiNote,baseVolume,useSustain=true){const ctx=getSharedCtx();if(activeOscillators[midiNote]){const{oscillators,masterGain}=activeOscillators[midiNote];const now=ctx.currentTime;masterGain.gain.cancelScheduledValues(now);masterGain.gain.setValueAtTime(masterGain.gain.value,now);masterGain.gain.linearRampToValueAtTime(0.001,now+0.05);oscillators.forEach(({osc})=>{try{osc.stop(now+0.1);}catch(e){}});delete activeOscillators[midiNote];}const freq=midiToFreq(midiNote);const now=ctx.currentTime;const volume=Math.min(0.6,baseVolume*pianoTuning.volume);const duration=(sustainPedalActive&&useSustain)?pianoTuning.duration+3:pianoTuning.duration;const fadeIn=Math.max(0.0005,pianoTuning.fadeIn);const peak=Math.min(0.9,volume*(1+(pianoTuning.attack/100)*0.6));const inst=INSTRUMENTS[pianoTuning.instrument]||INSTRUMENTS.piano;const masterGain=ctx.createGain();if(inst.filter){const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=inst.filter;f.Q.value=0.7;masterGain.connect(f);f.connect(getPianoBus());}else masterGain.connect(getPianoBus());const oscillators=[];const drift=(Math.random()*8)-4;masterGain.gain.setValueAtTime(0,now);masterGain.gain.linearRampToValueAtTime(peak,now+fadeIn);masterGain.gain.linearRampToValueAtTime(volume*pianoTuning.sustain,now+fadeIn+pianoTuning.decay);masterGain.gain.exponentialRampToValueAtTime(0.001,now+duration);const b=pianoTuning.brightness;const harmonics=inst.harmonics.map((g,i)=>({freq:freq*(i+1),gain:g*b,type:inst.wave}));harmonics.forEach(h=>{const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type=h.type;osc.frequency.setValueAtTime(h.freq,now);osc.detune.setValueAtTime(drift,now);gain.gain.setValueAtTime(h.gain*volume,now);gain.gain.exponentialRampToValueAtTime(0.001,now+duration);osc.connect(gain);gain.connect(masterGain);osc.start(now);osc.stop(now+duration);oscillators.push({osc,gain});});activeOscillators[midiNote]={oscillators,masterGain};}
function startPianoNote(midiNote,volume=0.3,useSustain=true){if(!internalPianoEnabled)return;createPianoVoice(midiNote,volume,useSustain);}
function startEarPianoNote(midiNote,volume=0.3){createPianoVoice(midiNote,volume);}
function stopPianoNote(midiNote){if(!activeOscillators[midiNote])return;const ctx=getSharedCtx();const{oscillators,masterGain}=activeOscillators[midiNote];const now=ctx.currentTime;masterGain.gain.cancelScheduledValues(now);masterGain.gain.setValueAtTime(masterGain.gain.value,now);masterGain.gain.exponentialRampToValueAtTime(0.001,now+0.8);oscillators.forEach(({osc})=>{try{osc.stop(now+0.8);}catch(e){}});delete activeOscillators[midiNote];}
function stopEarPianoNote(midiNote){stopPianoNote(midiNote);}
function updatePianoButtons(){const a=$('btn-piano'),b=$('btn-ear-piano');if(internalPianoEnabled){a.classList.add('active');b.classList.add('active');}else{a.classList.remove('active');b.classList.remove('active');}}
$('btn-piano').addEventListener('click',()=>{internalPianoEnabled=!internalPianoEnabled;if(internalPianoEnabled){pianoToast.textContent=t('piano_on');pianoToast.style.background='#8c52ff';getSharedCtx();}else{pianoToast.textContent=t('piano_off');pianoToast.style.background='#444';stopAllPianoNotes();}updatePianoButtons();pianoToast.style.display='block';setTimeout(()=>pianoToast.style.display='none',2000);});
$('btn-ear-piano').addEventListener('click',()=>{internalPianoEnabled=!internalPianoEnabled;if(internalPianoEnabled){pianoToast.textContent=t('piano_on');pianoToast.style.background='#8c52ff';getSharedCtx();}else{pianoToast.textContent=t('piano_off');pianoToast.style.background='#444';stopAllPianoNotes();}updatePianoButtons();pianoToast.style.display='block';setTimeout(()=>pianoToast.style.display='none',2000);});
function updatePedalVolumeDirect(v){pedalVolume=(v/100)*0.12;$('pedal-volume-slider').value=v;const tv=document.getElementById('tonic-volume-slider');if(tv)tv.value=v;if(tonicPedalGains&&tonicPedalGains.length&&sharedCtx){const now=sharedCtx.currentTime;const per=pedalVolume/tonicPedalGains.length;tonicPedalGains.forEach(g=>{g.gain.cancelScheduledValues(now);g.gain.setValueAtTime(g.gain.value,now);g.gain.linearRampToValueAtTime(per,now+0.1);});}}
$('pedal-volume-slider').addEventListener('input',e=>updatePedalVolumeDirect(parseInt(e.target.value)));
/* ══════════ MIDI ══════════ */
let midiAccessPromise=null;
function getMIDIAccess(){if(!midiAccessPromise)midiAccessPromise=navigator.requestMIDIAccess().catch(err=>{midiAccessPromise=null;throw err;});return midiAccessPromise;}
async function initMIDI(){try{const ma=await getMIDIAccess();statusElement.textContent=t('midi_connected');for(let input of ma.inputs.values()){input.onmidimessage=handleMIDIMessage;statusElement.textContent=`${t('midi_port')} ${input.name}`;}ma.onstatechange=e=>{if(e.port.type==='input'&&e.port.state==='connected'){e.port.onmidimessage=handleMIDIMessage;statusElement.textContent=`${t('midi_port')} ${e.port.name}`;}};}catch(err){statusElement.textContent='Error: '+err.message;}}
function getNoteToShow(){if(exclusiveMode==='normal'){if(pressedStack.length)return pressedStack[pressedStack.length-1];if(sustainPedalActive&&normalSustainHold!==null)return normalSustainHold;return null;}if(activeNotes.size===0)return null;if(exclusiveMode==='lead'||exclusiveMode==='delay')return Math.max(...activeNotes);if(exclusiveMode==='bass')return Math.min(...activeNotes);return null;}
function showProposedAnswer(pc){const n=noteImages[getTransposedIndex(pc)];if(!n)return;if(battleMode){const useP1=battleCurrentPlayer===1;const img=useP1?p1AnswerImage:p2AnswerImage;const box=useP1?p1Box:p2Box;img.src=imagePath+n;img.classList.add('visible');box.classList.add('visible');}else{proposedAnswerImage.src=imagePath+n;proposedAnswerImage.classList.add('visible');proposedAnswerBox.classList.add('visible');}}
function hideProposedAnswer(){p1AnswerImage.classList.remove('visible');p2AnswerImage.classList.remove('visible');proposedAnswerImage.classList.remove('visible');if(!battleMode)proposedAnswerBox.classList.remove('visible');}
function showFeedbackCorrect(){if(feedbackHideTimeout)clearTimeout(feedbackHideTimeout);feedbackCorrect.className='visible';feedbackWrong.className='';feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},1200);}
function showFeedbackWrong(){if(feedbackHideTimeout)clearTimeout(feedbackHideTimeout);feedbackWrong.className='visible';feedbackCorrect.className='';feedbackHideTimeout=setTimeout(()=>{feedbackCorrect.className='';feedbackWrong.className='';},1200);}
function hideAllFeedback(){if(feedbackHideTimeout){clearTimeout(feedbackHideTimeout);feedbackHideTimeout=null;}feedbackCorrect.className='';feedbackWrong.className='';}
function startDelayCountdown(s){if(delayCountdownInterval)clearInterval(delayCountdownInterval);let r=s;delayCountdownEl.textContent=r;delayCountdownEl.classList.add('visible');delayCountdownInterval=setInterval(()=>{r--;if(r<=0){clearInterval(delayCountdownInterval);delayCountdownInterval=null;delayCountdownEl.classList.remove('visible');}else delayCountdownEl.textContent=r;},1000);}
function stopDelayCountdown(){if(delayCountdownInterval){clearInterval(delayCountdownInterval);delayCountdownInterval=null;}delayCountdownEl.classList.remove('visible');}
function cancelDelayProcess(){if(delayCheckInterval){clearInterval(delayCheckInterval);delayCheckInterval=null;}delayStartTime=null;delayPendingNote=null;delayCountdownEl.classList.remove('visible');imgElement.classList.remove('visible');}
function startDelayProcess(note){cancelDelayProcess();const total=parseInt($('delay-input').value)||4;delayPendingNote=note;const pressed=[...physicalHeld];if(pressed.length===1&&pressed[0]===note){delayStartTime=Date.now();delayCheckInterval=setInterval(()=>{const el=(Date.now()-delayStartTime)/1000;const rem=total-el;const cur=[...physicalHeld];if(cur.length!==1||cur[0]!==note){cancelDelayProcess();return;}if(rem<=3&&rem>0){delayCountdownEl.textContent=Math.ceil(rem);delayCountdownEl.classList.add('visible');}else if(rem<=0){clearInterval(delayCheckInterval);delayCheckInterval=null;delayCountdownEl.classList.remove('visible');const n=noteImages[getTransposedIndex(note%12)];if(n){imgElement.src=imagePath+n;imgElement.classList.add('visible');}}},100);}else cancelDelayProcess();}
let activePedalNotes=new Map();
function playNoteWithPedalSound(midiNote){const ctx=getSharedCtx();if(activePedalNotes.has(midiNote))stopNoteWithPedalSound(midiNote);const freq=midiToFreq(midiNote);const now=ctx.currentTime;const masterGain=ctx.createGain();masterGain.gain.setValueAtTime(0,now);masterGain.gain.linearRampToValueAtTime(0.5,now+0.1);masterGain.connect(ctx.destination);const bb=ctx.createBiquadFilter();bb.type='lowshelf';bb.frequency.value=200;bb.gain.value=6;bb.connect(masterGain);const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=4000;f.Q.value=0.5;f.connect(bb);const oscs=[];[{t:'sawtooth',d:0,g:0.4},{t:'triangle',d:0,g:0.35},{t:'sine',d:0,g:0.25}].forEach(cfg=>{const o=ctx.createOscillator();const g=ctx.createGain();o.type=cfg.t;o.frequency.value=freq;o.detune.value=cfg.d;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(pedalVolume*cfg.g*3,now+0.1);o.connect(g);g.connect(f);o.start(now);oscs.push(o);});activePedalNotes.set(midiNote,{oscs,masterGain});}
function stopNoteWithPedalSound(midiNote){const h=activePedalNotes.get(midiNote);if(!h)return;const now=getSharedCtx().currentTime;h.masterGain.gain.cancelScheduledValues(now);h.masterGain.gain.setValueAtTime(h.masterGain.gain.value,now);h.masterGain.gain.linearRampToValueAtTime(0.001,now+0.3);h.oscs.forEach(o=>{try{o.stop(now+0.3);}catch(e){}});activePedalNotes.delete(midiNote);}
function stopAllPedalSounds(){Array.from(activePedalNotes.keys()).forEach(n=>stopNoteWithPedalSound(n));}
/* ══════════ HANDLE MIDI ══════════ */
function handleMIDIMessage(event){
const[status,note,velocity]=event.data;const command=status&0xf0;
if(command===0x90&&velocity>0){const now=performance.now();if(lastNoteOnTime[note]!==undefined&&now-lastNoteOnTime[note]<50)return;lastNoteOnTime[note]=now;}
const inMidiMode=midiMode&&midiMode.classList.contains('active');
const inEarMode=earMode&&earMode.classList.contains('active');
if(!inMidiMode&&!inEarMode){
if(command===0xB0&&note===64){const p=velocity>=64;sustainPedalActive=p;if(!p&&internalPianoEnabled)stopAllPianoNotes();}
else if(internalPianoEnabled){if(command===0x90&&velocity>0)startPianoNote(note,0.3);else if(command===0x80||(command===0x90&&velocity===0)){if(sustainPedalActive)heldByPedal.add(note);else stopPianoNote(note);}}
return;
}
if(isPaused)return;
if(earTrainingActive&&earModeType==='listen'){
if(command===0xB0&&note===64){const p=velocity>=64;sustainPedalActive=p;sustainLed.classList.toggle('active',p);earSustainLed.classList.toggle('active',p);if(!p){if(internalPianoEnabled)stopAllEarPianoNotes();const r=Array.from(heldByPedal);heldByPedal.clear();r.forEach(n=>activeNotes.delete(n));}return;}
if(command===0x90&&velocity>0){if(internalPianoEnabled)startEarPianoNote(note,0.3);}
else if(command===0x80||(command===0x90&&velocity===0)){if(internalPianoEnabled){if(sustainPedalActive)heldByPedal.add(note);else stopEarPianoNote(note);}}
return;
}
if(command===0xB0&&note===64){
const p=velocity>=64;sustainPedalActive=p;sustainLed.classList.toggle('active',p);earSustainLed.classList.toggle('active',p);
if(!p){if(pressedStack.length===0)normalSustainHold=null;if(internalPianoEnabled)heldByPedal.forEach(n=>{if(earTrainingActive)stopEarPianoNote(n);else stopPianoNote(n);});const r=Array.from(heldByPedal);heldByPedal.clear();r.forEach(n=>{activeNotes.delete(n);const idx=getTransposedIndex(n%12);if(exclusiveMode==='complete'&&wrappers[idx]&&wrappers[idx].noteNumber)wrappers[idx].noteNumber.classList.remove('active-note');if(exclusiveMode==='multi'&&wrappers[idx]){wrappers[idx].classList.remove('visible');wrappers[idx].style.opacity='0';}if(inEarMode&&!earTrainingActive&&wrappers[idx]){wrappers[idx].classList.remove('visible');wrappers[idx].style.opacity='0';wrappers[idx].style.display='none';}});if(!earTrainingActive&&(exclusiveMode==='normal'||exclusiveMode==='lead'||exclusiveMode==='bass')){const nt=getNoteToShow();if(nt===null)imgElement.classList.remove('visible');else{const n=noteImages[getTransposedIndex(nt%12)];if(n){imgElement.src=imagePath+n;imgElement.classList.add('visible');}}}if(!earTrainingActive&&exclusiveMode==='delay'){if(physicalHeld.size===0)cancelDelayProcess();else if(physicalHeld.size===1&&!delayCheckInterval&&!imgElement.classList.contains('visible'))startDelayProcess([...physicalHeld][0]);}if(earTrainingActive)hideProposedAnswer();}
return;
}
if(earTrainingActive){
const pc=note%12;
const isTestLike=(earModeType==='test'||earModeType==='battle');
if(command===0x90&&velocity>0&&!earUserAlreadyAnswered){testExploringNoImage=false;if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}}
if(earDifficulty==='easy'){
if(command===0x90&&velocity>0){
if(!testExploringNoImage&&!testSustainTimeout)showProposedAnswer(pc);
if(isTestLike){
if(inAnswerPhase&&!earUserAlreadyAnswered){
earUserAlreadyAnswered=true;earUserHasPlayed=true;logSoloTime();
const ok=pc===earCurrentTargetPitchClass;
if(ok){earCorrectNotes++;showFeedbackCorrect();}else showFeedbackWrong();
earTotalNotes++;updateAccuracyDisplay();
if(battleMode)battlePlayerAnswered(ok);
if(advanceTimeout)clearTimeout(advanceTimeout);
if(testSustainTimeout)clearTimeout(testSustainTimeout);
const hideMs=battleMode?BATTLE_HIDE_MS:TEST_IMAGE_MS;
const advMs=battleMode?BATTLE_ADVANCE_MS:(TEST_IMAGE_MS+TEST_EXPLORE_MS);
testSustainTimeout=setTimeout(()=>{testSustainTimeout=null;hideProposedAnswer();stopEarPianoNote(note);testExploringNoImage=true;},hideMs);
advanceTimeout=setTimeout(()=>{if(earTrainingActive)advanceToNextNote();},advMs);
}
}else if(earModeType==='practice'){if(inAnswerPhase){const ok=pc===earCurrentTargetPitchClass;if(ok){showFeedbackCorrect();if(advanceTimeout)clearTimeout(advanceTimeout);advanceTimeout=setTimeout(()=>{if(earTrainingActive)advanceToNextNote();},1200);}else showFeedbackWrong();}}
}else if(command===0x80||(command===0x90&&velocity===0)){if(internalPianoEnabled&&!testSustainTimeout)stopEarPianoNote(note);if(!testSustainTimeout)hideProposedAnswer();}
if(command===0x90&&velocity>0&&internalPianoEnabled)startEarPianoNote(note,0.3);
return;
}
if(command===0x90&&velocity>0){
if(!testExploringNoImage&&!testSustainTimeout)showProposedAnswer(pc);
if(!earUserAlreadyAnswered){
earUserAlreadyAnswered=true;earUserHasPlayed=true;logSoloTime();
const ok=pc===earCurrentTargetPitchClass;
if(ok){earCorrectNotes++;showFeedbackCorrect();}else showFeedbackWrong();
earTotalNotes++;updateAccuracyDisplay();
if(battleMode)battlePlayerAnswered(ok);
if(advanceTimeout)clearTimeout(advanceTimeout);
if(isTestLike){const hideMs=battleMode?BATTLE_HIDE_MS:TEST_IMAGE_MS;const advMs=battleMode?BATTLE_ADVANCE_MS:(TEST_IMAGE_MS+TEST_EXPLORE_MS);if(testSustainTimeout)clearTimeout(testSustainTimeout);testSustainTimeout=setTimeout(()=>{testSustainTimeout=null;hideProposedAnswer();stopEarPianoNote(note);testExploringNoImage=true;},hideMs);advanceTimeout=setTimeout(()=>{if(earTrainingActive)advanceToNextNote();},advMs);}
else{advanceTimeout=setTimeout(()=>{if(earTrainingActive)advanceToNextNote();},1200);}
}
if(internalPianoEnabled)startEarPianoNote(note,0.3);
}else if(command===0x80||(command===0x90&&velocity===0)){if(internalPianoEnabled&&!testSustainTimeout){if(sustainPedalActive)heldByPedal.add(note);else stopEarPianoNote(note);}if(!sustainPedalActive&&!testSustainTimeout)hideProposedAnswer();}
return;
}
if(internalPianoEnabled){if(command===0x90&&velocity>0)startPianoNote(note,0.3);else if(command===0x80||(command===0x90&&velocity===0)){if(sustainPedalActive)heldByPedal.add(note);else stopPianoNote(note);}}
const pc=note%12;const idx=getTransposedIndex(pc);
if(command===0x90&&velocity>0){activeNotes.add(note);if(!pressedStack.includes(note))pressedStack.push(note);normalSustainHold=null;physicalHeld.add(note);heldByPedal.delete(note);if(inEarMode&&!earTrainingActive&&wrappers[idx]){wrappers[idx].style.display='block';wrappers[idx].classList.add('visible');wrappers[idx].style.opacity='1';}if(exclusiveMode==='multi'&&wrappers[idx]){wrappers[idx].style.display='block';wrappers[idx].classList.add('visible');wrappers[idx].style.opacity='1';}if(exclusiveMode==='complete'&&wrappers[idx]&&wrappers[idx].noteNumber)wrappers[idx].noteNumber.classList.add('active-note');if(exclusiveMode==='delay'){const pr=[...physicalHeld];if(pr.length===1)startDelayProcess(pr[0]);else cancelDelayProcess();}if(exclusiveMode==='normal'||exclusiveMode==='lead'||exclusiveMode==='bass'){const nt=getNoteToShow();if(nt!==null){const n=noteImages[getTransposedIndex(nt%12)];if(n){imgElement.src=imagePath+n;imgElement.classList.add('visible');}}}}
else if(command===0x80||(command===0x90&&velocity===0)){pressedStack=pressedStack.filter(n=>n!==note);physicalHeld.delete(note);if(pressedStack.length===0&&sustainPedalActive)normalSustainHold=note;else if(pressedStack.length)normalSustainHold=null;if(sustainPedalActive)heldByPedal.add(note);else{activeNotes.delete(note);if(inEarMode&&!earTrainingActive&&wrappers[idx]){wrappers[idx].classList.remove('visible');wrappers[idx].style.opacity='0';wrappers[idx].style.display='none';}if(exclusiveMode==='multi'&&wrappers[idx]){wrappers[idx].classList.remove('visible');wrappers[idx].style.opacity='0';}if(exclusiveMode==='complete'&&wrappers[idx]&&wrappers[idx].noteNumber)wrappers[idx].noteNumber.classList.remove('active-note');if(exclusiveMode==='delay')cancelDelayProcess();if(exclusiveMode==='normal'||exclusiveMode==='lead'||exclusiveMode==='bass'){const nt=getNoteToShow();if(nt===null)imgElement.classList.remove('visible');else{const n=noteImages[getTransposedIndex(nt%12)];if(n){imgElement.src=imagePath+n;imgElement.classList.add('visible');}}}}}
}
/* ══════════ TÒNICA + EAR TRAINING ══════════ */
function startTonicPedal(){const ctx=getSharedCtx();const oct=currentKeyRoot<=5?36:24;const freq=midiToFreq(currentKeyRoot+oct);const now=ctx.currentTime;tonicPedalMasterGain=ctx.createGain();tonicPedalMasterGain.gain.setValueAtTime(0,now);tonicPedalMasterGain.gain.linearRampToValueAtTime(1,now+2);tonicPedalMasterGain.connect(ctx.destination);tonicPedalFilter=ctx.createBiquadFilter();tonicPedalFilter.type='lowpass';tonicPedalFilter.frequency.value=4000;tonicPedalFilter.Q.value=0.5;const bb=ctx.createBiquadFilter();bb.type='lowshelf';bb.frequency.value=200;bb.gain.value=6;bb.connect(tonicPedalFilter);tonicPedalFilter.connect(tonicPedalMasterGain);tonicPedalOscs=[];tonicPedalGains=[];[{t:'sawtooth',d:0,g:0.4},{t:'triangle',d:0,g:0.35},{t:'sine',d:0,g:0.25}].forEach(cfg=>{const o=ctx.createOscillator();const g=ctx.createGain();o.type=cfg.t;o.frequency.value=freq;o.detune.value=cfg.d;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(pedalVolume*cfg.g,now+2);o.connect(g);g.connect(bb);o.start(now);tonicPedalOscs.push(o);tonicPedalGains.push(g);});}
function stopTonicPedal(fadeOut=false){if(tonicPedalOscs.length){const ctx=getSharedCtx();const now=ctx.currentTime;const t=fadeOut?3:1.5;if(tonicPedalMasterGain){tonicPedalMasterGain.gain.cancelScheduledValues(now);tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now);tonicPedalMasterGain.gain.linearRampToValueAtTime(0.001,now+t);}tonicPedalOscs.forEach(o=>{try{o.stop(now+t);}catch(e){}});tonicPedalOscs=[];tonicPedalGains=[];tonicPedalMasterGain=null;tonicPedalFilter=null;}}
function shuffleArray(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function generateEarSequence(){const d=[0,2,4,5,7,9,11],nd=[1,3,6,8,10];let allowed;if(earNoteMode==='diatonic')allowed=d.filter(x=>earFilterDiat.has(x));else if(earNoteMode==='non-diatonic')allowed=nd.filter(x=>earFilterNonDiat.has(x));else allowed=[0,1,2,3,4,5,6,7,8,9,10,11].filter(x=>earFilterAll.has(x));if(allowed.length<2)allowed=(earNoteMode==='diatonic')?d:(earNoteMode==='non-diatonic')?nd:[0,1,2,3,4,5,6,7,8,9,10,11];let pool=[];for(let o=2;o<=7;o++)for(let g of allowed){const m=currentKeyRoot+g+o*12;if(m>=36&&m<=96)pool.push(m);}let s=shuffleArray(pool);for(let i=2;i<s.length;i++){const a=(s[i]-currentKeyRoot)%12,b=(s[i-1]-currentKeyRoot)%12,c=(s[i-2]-currentKeyRoot)%12;if(a===b&&b===c){for(let j=i+1;j<s.length;j++){if((s[j]-currentKeyRoot)%12!==a){[s[i],s[j]]=[s[j],s[i]];break;}}}}return s;}
function formatTime(s){return`${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;}
function updateAccuracyDisplay(){if(battleMode){updateBattleAccuracy();return;}const p=earTotalNotes>0?Math.round(earCorrectNotes/earTotalNotes*100):0;accuracyValue.textContent=`${p}%`;accuracyDetails.textContent=`${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;if(earModeType==='test'&&earTrainingActive)accuracyPanel.classList.add('visible');else if(!resultModal.classList.contains('visible'))accuracyPanel.classList.remove('visible');}
/* [PEGAT B] Frases simpàtiques per sota del 20% al TEST */
const MSG_PAQUET={ca:["Ets un paquet... però el paquet amb més projecció de tot Tonal Emotions! 📦✨","Menys del 20%? Felicitats: has fallat amb una precisió mai vista! 🎯😅","El teu oïda s'ha agafat el dia lliure. Ves a buscar-la i torna-hi! 👂","Ni el teu gat ho faria pitjor... i això que el gat no té oïda musical! 🐱","Això no és un suspens: és el punt de partida d'una llegenda! 🚀","Has encertat menys del 20%? Tranquil, d'aquí només es pot pujar (i molt)! 📈"],es:["¡Eres un paquete... pero el paquete con más proyección de todo Tonal Emotions! 📦✨","¿Menos del 20%? Felicidades: ¡has fallado con una precisión nunca vista! 🎯😅","Tu oído se ha tomado el día libre. ¡Ve a buscarlo y vuelve a intentarlo! 👂☕","Ni tu gato lo haría peor... ¡y eso que el gato no tiene oído musical! 🐱","Esto no es un suspenso: ¡es el punto de partida de una leyenda! 🚀","¿Has acertado menos del 20%? Tranquilo, de aquí solo se puede subir (¡y mucho)! 📈"],en:["You're a package... but the most promising package in all of Tonal Emotions! 📦✨","Under 20%? Congratulations: you missed with never-before-seen precision! 🎯😅","Your ear took the day off. Go find it and try again! 👂","Not even your cat would do worse... and your cat has no musical ear! 🐱","This isn't a fail: it's the starting point of a legend! 🚀","Under 20%? Don't worry, from here you can only go up (a lot)! 📈"]};
/* [PEGAT 5] Registra el temps de resposta (només fora de Battle) */
function logSoloTime(){if(!battleMode)soloTimes.push(Math.max(0,performance.now()-(v10LastNoteAt||performance.now())));}
/* [PEGAT 6] Rècord personal GJPS (localStorage compartit) */
function tonalUser(){const u=(localStorage.getItem('gjps_session')||'').trim();return (u&&u!=='Invitat')?u:'';}
function saveTestStats(p){const u=tonalUser();if(!u)return;const key='gjps_tonal_stats_'+u;let s=null;try{s=JSON.parse(localStorage.getItem(key));}catch(e){}if(!s||typeof s!=='object')s={best:null,sessions:0,last:null};s.sessions=(s.sessions||0)+1;const entry={p:p,date:Date.now(),notes:earNoteMode,diff:earDifficulty,key:currentKeyRoot};s.last=entry;if(!s.best||p>s.best.p)s.best=entry;try{localStorage.setItem(key,JSON.stringify(s));}catch(e){}}
/* [PEGAT 5] showResultMessage amb branca <20% i estadístiques ⏱ */
function showResultMessage(){if(battleMode)return;if(earModeType!=='test'||!earUserHasPlayed)return;const p=earTotalNotes>0?Math.round(earCorrectNotes/earTotalNotes*100):0;saveTestStats(p);resultPercentage.textContent=`${p}%`;let _det=`${earCorrectNotes} / ${earTotalNotes} ${t('word_notes')}`;if(soloTimes.length){const _avg=(soloTimes.reduce((a,b)=>a+b,0)/soloTimes.length/1000).toFixed(1);const _mn=(Math.min(...soloTimes)/1000).toFixed(1);const _mx=(Math.max(...soloTimes)/1000).toFixed(1);_det+=` · ⏱ ${_avg} ${t('v10_avg')} (${_mn}–${_mx})`;}resultDetails.textContent=_det;const filtered=(earNoteMode==='diatonic'&&earFilterDiat.size<7)||(earNoteMode==='non-diatonic'&&earFilterNonDiat.size<5)||(earNoteMode==='all'&&earFilterAll.size<12);let m='';if(p<20){const _a=MSG_PAQUET[currentLang]||MSG_PAQUET.ca;m=_a[Math.floor(Math.random()*_a.length)];}else if(filtered)m=t('result_filtered').replace('{X}',p);else if(earCorrectNotes>=20&&totalPauses<=1)m=t('result_crack');else if(p<30&&earTotalNotes>10)m=t('result_short');else if(p>=90){if(earTotalNotes>=10){if(earNoteMode==='diatonic')m=t('result_diat').replace('{X}',p);else if(earNoteMode==='non-diatonic')m=t('result_non_diat').replace('{X}',p);else m=t('result_excel');}else m=t('result_good').replace('{X}',p);}else m=t('result_keep').replace('{X}',p);resultMessage.textContent=m;resultModal.classList.add('visible');}
$('btn-close-result').addEventListener('click',()=>{resultModal.classList.remove('visible');if(earModeType==='test')accuracyPanel.classList.remove('visible');});
function playCadenceWithPedalSound(cb){const root=currentKeyRoot+36,fourth=(currentKeyRoot+5)%12+24,fifth=(currentKeyRoot+7)%12+24;stopAllPedalSounds();cadenceTimeouts.forEach(t0=>clearTimeout(t0));cadenceTimeouts=[];playNoteWithPedalSound(root);cadenceTimeouts.push(setTimeout(()=>{stopNoteWithPedalSound(root);playNoteWithPedalSound(fourth);},1000));cadenceTimeouts.push(setTimeout(()=>{stopNoteWithPedalSound(fourth);playNoteWithPedalSound(fifth);},2000));cadenceTimeouts.push(setTimeout(()=>{stopNoteWithPedalSound(fifth);playNoteWithPedalSound(root);cadenceTimeouts.push(setTimeout(()=>{stopNoteWithPedalSound(root);if(cb)cb();},2000));},3000));}
function stopCadence(){cadenceTimeouts.forEach(t0=>clearTimeout(t0));cadenceTimeouts=[];stopAllPedalSounds();}
function startWarmup(){if(earDifficulty!=='easy')startTonicPedal();const ov=$('warmup-overlay'),cd=$('warmup-countdown');ov.classList.add('visible');warmupText.textContent=(earDifficulty==='easy')?t('listen_cadence'):t('listen_tonic');let c=5;cd.textContent=c;if(warmupInterval)clearInterval(warmupInterval);warmupInterval=setInterval(()=>{c--;if(c>0)cd.textContent=c;else if(c===0)cd.textContent=t('let_s_go');else{clearInterval(warmupInterval);warmupInterval=null;ov.classList.remove('visible');startMainTimer();}},1000);}
function startEarTraining(){getSharedCtx();earTrainingActive=true;earPanel.classList.add('running');
earTimeRemaining=parseInt($('ear-duration-full').value)*60;earSequence=generateEarSequence();earCurrentIndex=0;earCurrentTargetPitchClass=null;earUserAlreadyAnswered=false;earCorrectNotes=0;earTotalNotes=0;earUserHasPlayed=false;soloTimes=[];hasAdvanced=false;pauseCount=0;pausedByUser=false;inAnswerPhase=false;consecutivePauses=0;totalPauses=0;testExploringNoImage=false;battleLastQ=0;if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}if(earModeType==='test'||earModeType==='battle')accuracyPanel.classList.remove('visible');proposedAnswerBox.classList.remove('visible');resultModal.classList.remove('visible');hideAllFeedback();thinkingEmoji.classList.remove('visible');imgElement.style.display='';imgElement.classList.remove('visible');Object.values(wrappers).forEach(w=>{w.style.display='none';w.style.opacity='0';w.classList.remove('visible','active-note');if(w.noteNumber)w.noteNumber.classList.remove('visible','active-note');});$('btn-ear-start-full').style.display='none';$('btn-ear-stop-full').style.display='block';$('btn-help-ear').style.display='none';['ear-duration-full','ear-delay-input-full','ear-key-select'].forEach(id=>$(id).disabled=true);document.querySelectorAll('.ear-mode-btn').forEach(b=>b.disabled=true);$('btn-easy').disabled=true;$('btn-hard').disabled=true;$('btn-test-mode').disabled=true;$('btn-practice-mode').disabled=true;$('btn-listen-mode').disabled=true;$('btn-battle-mode').disabled=true;
if(sdActive){$('ear-timer-full').style.display='none';}else{$('ear-timer-full').style.display='';$('ear-timer-full').textContent=formatTime(earTimeRemaining);}
if(earNoteMode==='all'&&earDifficulty==='hard'&&earModeType==='test'&&earFilterAll.size>=12){hardcoreWarning.classList.add('visible');hardcoreTimeout=setTimeout(()=>{hardcoreWarning.classList.remove('visible');hardcoreTimeout=null;startWarmup();},12000);}else startWarmup();earFilterPanelVisible=false;hideFilterInfo();renderFilterPanel();if(battleMode){positionBattleBoxes();showBattleTurn();}}
function startMainTimer(){
if(!sdActive){
earTimer=setInterval(()=>{
if(!isPaused){
earTimeRemaining--;
if(earTimeRemaining<=0){
earTimeRemaining=0;
if(!sdActive)$('ear-timer-full').textContent=formatTime(0);
if(battleMode&&bp1.total!==bp2.total){
battleLastQ=((inAnswerPhase&&!earUserAlreadyAnswered)||cadenceTimeouts.length>0)?2:1;
clearInterval(earTimer);earTimer=null;
}else stopEarTraining(true);
}else{
if(!sdActive)$('ear-timer-full').textContent=formatTime(earTimeRemaining);
}
}
},1000);
}
playEarNote();updateFilterInfo();
}
function advanceToNextNote(){if(hasAdvanced||!earTrainingActive)return;if(battleMode&&battleLastQ===2){stopEarTraining(false);return;}if(battleMode&&battleLastQ===1)battleLastQ=2;hasAdvanced=true;testExploringNoImage=false;if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}[earImageTimeout,showCorrectTimeout,advanceTimeout].forEach(t0=>{if(t0)clearTimeout(t0);});earImageTimeout=showCorrectTimeout=advanceTimeout=null;hideAllFeedback();hideProposedAnswer();imgElement.classList.remove('visible');thinkingEmoji.classList.remove('visible');earCurrentIndex++;setTimeout(()=>{if(earTrainingActive){hasAdvanced=false;playEarNote();}},200);}
function playEarNote(){if(!earTrainingActive||hasAdvanced||isPaused)return;testExploringNoImage=false;if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}if(earCurrentIndex>=earSequence.length){earSequence=generateEarSequence();earCurrentIndex=0;}const ci=earCurrentIndex,midiNote=earSequence[ci],pc=midiNote%12;const delaySec=parseInt($('ear-delay-input-full').value)||4;earCurrentTargetPitchClass=pc;earUserAlreadyAnswered=false;hasAdvanced=false;inAnswerPhase=false;hideAllFeedback();hideProposedAnswer();imgElement.classList.remove('visible');thinkingEmoji.classList.remove('visible');if(earModeType==='practice')proposedAnswerBox.classList.add('mid-position');else proposedAnswerBox.classList.remove('mid-position');Object.values(wrappers).forEach(w=>{w.style.display='none';w.style.opacity='0';w.classList.remove('visible','active-note');if(w.noteNumber)w.noteNumber.classList.remove('visible','active-note');});const onTimeout=()=>{stopDelayCountdown();thinkingEmoji.classList.remove('visible');if(!earTrainingActive||hasAdvanced||earCurrentIndex!==ci)return;if(earModeType==='listen'){const n=noteImages[getTransposedIndex(pc)];if(n){imgElement.src=imagePath+n;imgElement.classList.add('visible');}if(listenDisplayTimeout)clearTimeout(listenDisplayTimeout);listenDisplayTimeout=setTimeout(()=>{if(earTrainingActive&&!hasAdvanced&&earCurrentIndex===ci){hasAdvanced=true;imgElement.classList.remove('visible');thinkingEmoji.classList.remove('visible');earCurrentIndex++;setTimeout(()=>{if(earTrainingActive){hasAdvanced=false;playEarNote();}},300);}},3000);return;}if(!earUserAlreadyAnswered){earUserAlreadyAnswered=true;logSoloTime();earTotalNotes++;updateAccuracyDisplay();showFeedbackWrong();if(battleMode){logEv('⏱ J'+battleCurrentPlayer+' TIMEOUT');battlePlayerAnswered(false);}if(showCorrectTimeout)clearTimeout(showCorrectTimeout);const advMs=battleMode?BATTLE_ADVANCE_MS:1200;showCorrectTimeout=setTimeout(()=>{if(earTrainingActive&&!hasAdvanced&&earCurrentIndex===ci)advanceToNextNote();},advMs);}};if(earDifficulty==='easy'){playCadenceWithPedalSound(()=>{inAnswerPhase=true;if(earModeType==='listen')thinkingEmoji.classList.add('visible');startEarPianoNote(midiNote,0.3);startDelayCountdown(delaySec);if(earImageTimeout)clearTimeout(earImageTimeout);earImageTimeout=setTimeout(onTimeout,delaySec*1000);});}else{inAnswerPhase=true;startEarPianoNote(midiNote,0.3);startDelayCountdown(delaySec);if(earModeType==='listen')thinkingEmoji.classList.add('visible');if(earImageTimeout)clearTimeout(earImageTimeout);earImageTimeout=setTimeout(onTimeout,delaySec*1000);}}
function stopEarTraining(fadeOut=false){const wasBattle=battleMode;earTrainingActive=false;hasAdvanced=false;battleLastQ=0;earPanel.classList.remove('running');
stopDelayCountdown();stopCadence();if(testSustainTimeout){clearTimeout(testSustainTimeout);testSustainTimeout=null;}testExploringNoImage=false;if(hardcoreTimeout){clearTimeout(hardcoreTimeout);hardcoreTimeout=null;}hardcoreWarning.classList.remove('visible');if(warmupInterval){clearInterval(warmupInterval);warmupInterval=null;}if(earTimer)clearInterval(earTimer);[earImageTimeout,showCorrectTimeout,advanceTimeout,feedbackHideTimeout,listenDisplayTimeout].forEach(t0=>{if(t0)clearTimeout(t0);});stopTonicPedal(fadeOut);stopAllEarPianoNotes();hideAllFeedback();imgElement.classList.remove('visible');thinkingEmoji.classList.remove('visible');hideProposedAnswer();$('warmup-overlay').classList.remove('visible');$('btn-ear-start-full').style.display='block';$('btn-ear-stop-full').style.display='none';$('btn-help-ear').style.display='';['ear-duration-full','ear-delay-input-full','ear-key-select'].forEach(id=>$(id).disabled=false);$('btn-easy').disabled=false;$('btn-hard').disabled=false;document.querySelectorAll('.ear-mode-btn').forEach(b=>b.disabled=false);$('btn-test-mode').disabled=false;$('btn-practice-mode').disabled=false;$('btn-listen-mode').disabled=false;$('btn-battle-mode').disabled=false;const durVal=parseInt($('ear-duration-full').value)||5;$('ear-timer-full').style.display='';$('ear-timer-full').textContent=formatTime(durVal*60);if(wasBattle){cleanupBattleUI();if(earUserHasPlayed){updateBattleAccuracy();battleResultTimeout=setTimeout(()=>{battleResultTimeout=null;showBattleResultModal();},500);}}else if(earModeType==='test'&&earUserHasPlayed){updateAccuracyDisplay();accuracyPanel.classList.add('visible');setTimeout(showResultMessage,500);}else accuracyPanel.classList.remove('visible');hideFilterInfo();renderFilterPanel();}
function pauseEarTraining(){if(!earTrainingActive||isPaused)return;pauseCount++;consecutivePauses++;totalPauses++;if(consecutivePauses>10){resultMessage.textContent=t('pause_cheat');resultPercentage.textContent='-';resultDetails.textContent=`${totalPauses} pauses`;resultModal.classList.add('visible');stopEarTraining(false);return;}isPaused=true;pausedByUser=true;pauseModal.classList.add('visible');if(tonicPedalMasterGain&&sharedCtx){const now=sharedCtx.currentTime;tonicPedalMasterGain.gain.cancelScheduledValues(now);tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now);tonicPedalMasterGain.gain.linearRampToValueAtTime(0,now+1.5);}}
function resumeEarTraining(){if(!isPaused)return;isPaused=false;pauseModal.classList.remove('visible');consecutivePauses=0;if(tonicPedalMasterGain&&sharedCtx){const now=sharedCtx.currentTime;tonicPedalMasterGain.gain.cancelScheduledValues(now);tonicPedalMasterGain.gain.setValueAtTime(tonicPedalMasterGain.gain.value,now);tonicPedalMasterGain.gain.linearRampToValueAtTime(1,now+1);}}
function abortEarTraining(){if(!isPaused)return;isPaused=false;pauseModal.classList.remove('visible');stopEarTraining(false);}
$('btn-resume').addEventListener('click',resumeEarTraining);
$('btn-abort').addEventListener('click',abortEarTraining);
$('btn-ear-start-full').addEventListener('click',()=>{if(earModeType==='battle'){showBattleModal();}else startEarTraining();});
$('btn-ear-stop-full').addEventListener('click',()=>stopEarTraining(false));
document.querySelectorAll('.ear-mode-btn').forEach(btn=>{btn.addEventListener('click',()=>{if(earTrainingActive)return;document.querySelectorAll('.ear-mode-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');earNoteMode=btn.dataset.mode;updateManualButtonsVisibility();if(btn.dataset.mode==='listen'&&manualPanelVisible){manualPanelVisible=false;manualPanel.classList.remove('visible');manualPanel.classList.remove('ear-position');$('btn-toggle-manual').classList.remove('active');$('btn-toggle-manual-ear').classList.remove('active');}});});
function updateDifficultyButtons(){$('btn-easy').className='difficulty-btn'+(earDifficulty==='easy'?' active-easy':'');$('btn-hard').className='difficulty-btn'+(earDifficulty==='hard'?' active-hard':'');renderFilterPanel();}
$('btn-easy').addEventListener('click',()=>{if(!earTrainingActive){earDifficulty='easy';updateDifficultyButtons();}});
$('btn-hard').addEventListener('click',()=>{if(!earTrainingActive){earDifficulty='hard';updateDifficultyButtons();}});
function updateModeButtons(){$('btn-listen-mode').className='mode-toggle-btn'+(earModeType==='listen'?' active-listen':'');$('btn-practice-mode').className='mode-toggle-btn'+(earModeType==='practice'?' active-practice':'');$('btn-test-mode').className='mode-toggle-btn'+(earModeType==='test'?' active-test':'');$('btn-battle-mode').className='mode-toggle-btn'+(earModeType==='battle'?' active-battle':'');renderFilterPanel();}
$('btn-test-mode').addEventListener('click',()=>{if(!earTrainingActive){earModeType='test';updateModeButtons();accuracyPanel.classList.remove('visible');}});
$('btn-practice-mode').addEventListener('click',()=>{if(!earTrainingActive){earModeType='practice';updateModeButtons();accuracyPanel.classList.remove('visible');}});
$('btn-listen-mode').addEventListener('click',()=>{if(!earTrainingActive){earModeType='listen';updateModeButtons();accuracyPanel.classList.remove('visible');if(manualPanelVisible){manualPanelVisible=false;manualPanel.classList.remove('visible');manualPanel.classList.remove('ear-position');$('btn-toggle-manual').classList.remove('active');$('btn-toggle-manual-ear').classList.remove('active');}}});
$('btn-battle-mode').addEventListener('click',()=>{if(!earTrainingActive){earModeType='battle';updateModeButtons();accuracyPanel.classList.remove('visible');}});
$('ear-key-select').addEventListener('change',e=>{currentKeyRoot=+e.target.value;keySelect.value=currentKeyRoot;if(earTrainingActive&&earDifficulty!=='easy'){stopTonicPedal();startTonicPedal();}});
$('ear-duration-full').addEventListener('input',e=>{if(earTrainingActive)return;const v=parseInt(e.target.value)||5;$('ear-timer-full').textContent=formatTime(v*60);});
function loadZoom(){const s=localStorage.getItem(ZOOM_STORAGE_KEY);if(s){currentZoom=Math.min(120,Math.max(80,parseInt(s)||100));applyZoom();}}
function saveZoom(){localStorage.setItem(ZOOM_STORAGE_KEY,currentZoom.toString());}
function applyZoom(){document.body.style.transform=`scale(${currentZoom/100})`;$('zoom-value').textContent=`${currentZoom}%`;}
$('btn-zoom-in').addEventListener('click',()=>{if(currentZoom<120){currentZoom+=10;applyZoom();saveZoom();if($('sound-controls').style.display==='flex'){positionZoomControls();if($('sustain-hint').classList.contains('visible'))positionSustainHint();}}});
$('btn-zoom-out').addEventListener('click',()=>{if(currentZoom>80){currentZoom-=10;applyZoom();saveZoom();if($('sound-controls').style.display==='flex'){positionZoomControls();if($('sustain-hint').classList.contains('visible'))positionSustainHint();}}});
/* ══════════ FILTRE + TECLAT MANUAL ══════════ */
function updateManualButtonsVisibility(){const buttons=document.querySelectorAll('.manual-btn');const cont=document.querySelector('.manual-buttons');let vc=0;buttons.forEach(b=>{const d=parseInt(b.dataset.degree);let shouldShow=false;if(midiMode.classList.contains('active'))shouldShow=true;else if(earMode.classList.contains('active')){if(earNoteMode==='diatonic')shouldShow=earFilterDiat.has(d);else if(earNoteMode==='non-diatonic')shouldShow=earFilterNonDiat.has(d);else shouldShow=earFilterAll.has(d);}b.style.display=shouldShow?'flex':'none';if(shouldShow)vc++;});if(vc===0)vc=1;cont.style.gridTemplateColumns=(vc<=7)?`repeat(${vc},1fr)`:'repeat(6,1fr)';renderFilterPanel();}
const FILTER_ORDER_DIAT=[0,11,2,7,4,5,9];const FILTER_ORDER_NONDIAT=[1,3,6,8,10];const FILTER_ORDER_ALL=[0,1,2,3,4,5,6,7,8,9,10,11];
let earFilterDiat=new Set(FILTER_ORDER_DIAT),earFilterNonDiat=new Set(FILTER_ORDER_NONDIAT),earFilterAll=new Set(FILTER_ORDER_ALL);
let earFilterPanelVisible=false;let filterBtn=null,filterPanel=null,filterTitleEl=null,filterRowEl=null,filterHintEl=null;
function filterSet(){return earNoteMode==='non-diatonic'?earFilterNonDiat:(earNoteMode==='all'?earFilterAll:earFilterDiat);}
function filterOrder(){return earNoteMode==='non-diatonic'?FILTER_ORDER_NONDIAT:(earNoteMode==='all'?FILTER_ORDER_ALL:FILTER_ORDER_DIAT);}
function filterButtonShouldShow(){return earMode.classList.contains('active')&&!earTrainingActive;}
function buildFilterUI(){if(filterBtn)return;const st=document.createElement('style');st.textContent='#btn-ear-filter{position:absolute;top:6px;left:calc(100% + 8px);z-index:400;background:#222831;border:1px solid #8c52ff;color:#eee;border-radius:8px;padding:4px 8px;cursor:pointer;font-size:11px;}#ear-filter-panel{position:absolute;top:50px;left:calc(100% + 8px);z-index:400;background:#12161cee;border:1px solid #8c52ff;border-radius:12px;padding:12px 14px;flex-direction:column;gap:8px;min-width:230px;}#ear-filter-panel .ear-filter-title{color:#8c52ff;font-weight:bold;font-size:14px;}#ear-filter-panel .ear-filter-row{display:flex;gap:6px;flex-wrap:nowrap;}#ear-filter-panel .ear-filter-cell{width:38px;height:38px;border-radius:8px;border:2px solid #444;background:#1c222b;color:#777;font-weight:bold;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;}#ear-filter-panel .ear-filter-cell.on{border-color:#39d98a;color:#fff;background:#123324;}#ear-filter-panel .ear-filter-hint{color:#888;font-size:11px;}';document.head.appendChild(st);filterBtn=document.createElement('button');filterBtn.id='btn-ear-filter';filterBtn.style.display='none';let host=$('ear-key-select');while(host&&host.parentElement&&host.parentElement!==earMode)host=host.parentElement;if(!host||host===earMode)host=earMode;host.style.position='relative';host.appendChild(filterBtn);filterPanel=document.createElement('div');filterPanel.id='ear-filter-panel';filterPanel.style.display='none';filterTitleEl=document.createElement('div');filterTitleEl.className='ear-filter-title';filterRowEl=document.createElement('div');filterRowEl.className='ear-filter-row';filterHintEl=document.createElement('div');filterHintEl.className='ear-filter-hint';filterPanel.appendChild(filterTitleEl);filterPanel.appendChild(filterRowEl);filterPanel.appendChild(filterHintEl);host.appendChild(filterPanel);filterBtn.addEventListener('click',()=>{earFilterPanelVisible=!earFilterPanelVisible;renderFilterPanel();updateManualButtonsVisibility();});}
function renderFilterPanel(){if(!filterBtn)buildFilterUI();const show=filterButtonShouldShow();filterBtn.style.display=show?'block':'none';if(show)filterBtn.textContent=(earModeType==='test')?t('filter_btn_test'):(earModeType==='listen')?t('filter_btn_listen'):(earModeType==='battle')?t('filter_btn_battle'):t('filter_btn_practice');if(!show||!earFilterPanelVisible){filterPanel.style.display='none';return;}filterPanel.style.display='flex';filterTitleEl.textContent=t('filter_title');filterHintEl.textContent=t('filter_hint');filterRowEl.innerHTML='';const set=filterSet();filterOrder().forEach(d=>{const c=document.createElement('button');c.className='ear-filter-cell'+(set.has(d)?' on':'');c.textContent=getDegreeNumber(d);c.addEventListener('click',()=>{if(set.has(d)){if(set.size<=2)return;set.delete(d);}else set.add(d);renderFilterPanel();updateManualButtonsVisibility();});filterRowEl.appendChild(c);});}
let filterInfoEl=null;
function ensureFilterInfo(){if(filterInfoEl)return filterInfoEl;filterInfoEl=document.createElement('div');filterInfoEl.id='ear-filter-info';filterInfoEl.style.cssText='position:absolute;top:6px;left:calc(100% + 8px);z-index:400;background:#12161cee;border:1px solid #39d98a;color:#7ff0b4;border-radius:8px;padding:4px 10px;font-size:12px;font-weight:bold;display:none;white-space:nowrap;';(filterBtn?filterBtn.parentElement:document.body).appendChild(filterInfoEl);return filterInfoEl;}
function updateFilterInfo(){const el=ensureFilterInfo();if(!earTrainingActive){el.style.display='none';return;}let txt='';if(earNoteMode==='diatonic')txt=(earFilterDiat.size>=7)?t('filter_info_all_diat'):t('filter_info_some')+FILTER_ORDER_DIAT.filter(d=>earFilterDiat.has(d)).map(getDegreeNumber).join(' ');else if(earNoteMode==='non-diatonic')txt=(earFilterNonDiat.size>=5)?t('filter_info_all_nondiat'):t('filter_info_some')+FILTER_ORDER_NONDIAT.filter(d=>earFilterNonDiat.has(d)).map(getDegreeNumber).join(' ');else txt=(earFilterAll.size>=12)?t('filter_info_all'):t('filter_info_some')+FILTER_ORDER_ALL.filter(d=>earFilterAll.has(d)).map(getDegreeNumber).join(' ');el.textContent=txt;el.style.display='block';}
function hideFilterInfo(){if(filterInfoEl)filterInfoEl.style.display='none';}
const uiLayoutFix=document.createElement('style');uiLayoutFix.textContent='#zoom-controls{transform:scale(0.85);transform-origin:bottom right;}#sound-controls{top:auto !important;bottom:100px !important;}';document.head.appendChild(uiLayoutFix);
const battleNameFix=document.createElement('style');battleNameFix.textContent='.battle-player-name,#p1-box h4,#p2-box h4,.battle-stat-label{display:block;text-align:center;overflow-wrap:anywhere;word-break:break-word;max-width:100%;}#battle-scoreboard .battle-player{max-width:38vw;}#p1-box h4 span,#p2-box h4 span{overflow-wrap:anywhere;word-break:break-word;}';document.head.appendChild(battleNameFix);
buildFilterUI();renderFilterPanel();
/* ══════════ TECLAT MANUAL (només números) ══════════ */
const btnToggleManual=$('btn-toggle-manual'),btnToggleManualEar=$('btn-toggle-manual-ear');
const manualBtns=document.querySelectorAll('.manual-btn');
const activeManualNotes=new Set();
const DIAT_DEG=[0,2,4,5,7,9,11];
const numHeld={};
let pendingAcc=0,pendingAccTO=null;
function numModValue(e){if(e.key==='-'||e.code==='Minus'||e.code==='NumpadSubtract')return -1;if(e.key==='+'||e.key==='='||e.code==='Equal'||e.code==='NumpadAdd')return 1;return 0;}
function isNumDigitCode(e){return /^(Digit[1-7]|Numpad[1-7])$/.test(e.code);}
function numDegree(e){return DIAT_DEG[parseInt(e.code.slice(-1),10)-1];}
/* [PEGAT A] Un input OCULT mai més no empassa tecles */
function isEditableTarget(e){const el=e.target;if(!el)return false;if(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA'){return el.getClientRects().length>0;}return false;}
function toggleManualPanel(){if(earMode.classList.contains('active')&&earModeType==='listen')return;manualPanelVisible=!manualPanelVisible;manualPanel.classList.toggle('visible',manualPanelVisible);if(earMode.classList.contains('active'))manualPanel.classList.add('ear-position');else manualPanel.classList.remove('ear-position');btnToggleManual.classList.toggle('active',manualPanelVisible);btnToggleManualEar.classList.toggle('active',manualPanelVisible);if(manualPanelVisible&&!internalPianoEnabled){internalPianoEnabled=true;updatePianoButtons();if(earMode.classList.contains('active'))$('btn-ear-piano').classList.add('active');else $('btn-piano').classList.add('active');getSharedCtx();}updateManualButtonsVisibility();}
btnToggleManual.addEventListener('click',toggleManualPanel);
btnToggleManualEar.addEventListener('click',toggleManualPanel);
function activateManualNote(d){if(activeManualNotes.has(d))return;activeManualNotes.add(d);handleMIDIMessage({data:[0x90,currentKeyRoot+d+60,100]});const b=document.querySelector(`.manual-btn[data-degree="${d}"]`);if(b)b.classList.add('active');}
function deactivateManualNote(d){if(!activeManualNotes.has(d))return;activeManualNotes.delete(d);handleMIDIMessage({data:[0x80,currentKeyRoot+d+60,0]});const b=document.querySelector(`.manual-btn[data-degree="${d}"]`);if(b)b.classList.remove('active');}
manualBtns.forEach(b=>{const d=parseInt(b.dataset.degree);b.addEventListener('mousedown',(e)=>{e.preventDefault();activateManualNote(d);});b.addEventListener('mouseup',(e)=>{e.preventDefault();deactivateManualNote(d);});b.addEventListener('mouseleave',(e)=>{if(activeManualNotes.has(d))deactivateManualNote(d);});b.addEventListener('touchstart',(e)=>{e.preventDefault();activateManualNote(d);});b.addEventListener('touchend',(e)=>{e.preventDefault();deactivateManualNote(d);});b.addEventListener('touchcancel',(e)=>{e.preventDefault();deactivateManualNote(d);});});
document.addEventListener('keydown',(e)=>{if(!document.getElementById('password-modal').classList.contains('hidden'))return;if(battleModal&&battleModal.classList.contains('visible')){if(e.key==='Escape'){e.preventDefault();hideBattleModal();}return;}if(battleResultModal&&battleResultModal.classList.contains('visible')){if(e.key==='Enter'||e.key==='Escape'){e.preventDefault();battleResultModal.classList.remove('visible');}return;}if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&['I','C','J'].includes(e.key.toUpperCase()))){e.preventDefault();return;}if(isEditableTarget(e))return;if(e.code==='Space'){e.preventDefault();return;}if(e.key==='Enter'&&resultModal.classList.contains('visible')){resultModal.classList.remove('visible');if(earModeType==='test')accuracyPanel.classList.remove('visible');return;}if(e.key==='Enter'&&infoModal.classList.contains('visible')){e.preventDefault();infoModal.classList.remove('visible');stopProva();return;}if(e.key==='Escape'){e.preventDefault();if(battleModal&&battleModal.classList.contains('visible')){hideBattleModal();return;}if(resultModal.classList.contains('visible')){resultModal.classList.remove('visible');if(earModeType==='test')accuracyPanel.classList.remove('visible');return;}if(infoModal.classList.contains('visible')){infoModal.classList.remove('visible');stopProva();return;}if(earTrainingActive&&warmupInterval)stopEarTraining(false);else if(earTrainingActive&&!isPaused&&earModeType==='listen')stopEarTraining(false);else if(earTrainingActive&&!isPaused&&(earModeType==='test'||earModeType==='practice'||earModeType==='battle'))pauseEarTraining();else if(!earTrainingActive){stopProva();if(exclusiveMode==='complete'||exclusiveMode==='edit')setExclusiveMode('normal');}return;}
const mod=numModValue(e);
if(mod!==0){e.preventDefault();if(!manualPanelVisible)toggleManualPanel();pendingAcc=mod;if(pendingAccTO)clearTimeout(pendingAccTO);pendingAccTO=setTimeout(()=>{pendingAcc=0;pendingAccTO=null;},2000);return;}
if(isNumDigitCode(e)&&numHeld[e.code]===undefined){e.preventDefault();if(!manualPanelVisible)toggleManualPanel();let d=numDegree(e);if(pendingAcc){d=(d+pendingAcc+12)%12;pendingAcc=0;if(pendingAccTO){clearTimeout(pendingAccTO);pendingAccTO=null;}}numHeld[e.code]=d;activateManualNote(d);return;}
});
document.addEventListener('keyup',(e)=>{if(!document.getElementById('password-modal').classList.contains('hidden'))return;if(isEditableTarget(e))return;if(numHeld[e.code]!==undefined){const d=numHeld[e.code];delete numHeld[e.code];deactivateManualNote(d);return;}});
/* ══════════ EMOCIONS + TÒNICA ══════════ */
let emotionTextEl=null;
function syncEmotionText(){if(!emotionTextEl){emotionTextEl=document.createElement('div');emotionTextEl.id='emotion-text';emotionTextEl.style.cssText='position:fixed;right:4%;top:45%;transform:translateY(-50%);max-width:340px;min-width:260px;background:rgba(18,22,28,0.92);border:1px solid #8c52ff;border-radius:14px;padding:18px 20px;color:#f2f2f2;font-size:19px;line-height:1.35;font-weight:bold;text-align:left;z-index:300;display:none;box-shadow:0 0 22px rgba(140,82,255,0.35);text-shadow:0 0 8px #000;';document.body.appendChild(emotionTextEl);}const vis=(exclusiveMode==='normal')&&!earTrainingActive&&imgElement.classList.contains('visible');if(!vis){emotionTextEl.style.display='none';return;}const file=imgElement.src.split('/').pop();const entry=Object.keys(noteImages).find(k=>noteImages[k]===file);if(entry===undefined){emotionTextEl.style.display='none';return;}emotionTextEl.innerHTML='<div style="color:#8c52ff;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">'+t('emo_title')+'</div><div>'+t('emo_'+entry)+'</div>';emotionTextEl.style.display='block';}
new MutationObserver(syncEmotionText).observe(imgElement,{attributes:true,attributeFilter:['class','src']});
syncEmotionText();
let tonicBtnEl=null,tonicTipEl=null,tonicVolEl=null;
function positionTonicControls(){const scale=currentZoom/100;const led=$('sustain-led');const lab=document.getElementById('sustain-label');const r=led.getBoundingClientRect();const r2=lab?lab.getBoundingClientRect():r;const br=document.body.getBoundingClientRect();const left=((r.left-br.left)/scale)+'px';const top=((Math.max(r.bottom,r2.bottom)-br.top+10)/scale)+'px';tonicBtnEl.style.left=left;tonicBtnEl.style.top=top;if(tonicVolEl){tonicVolEl.style.left=left;tonicVolEl.style.top=((Math.max(r.bottom,r2.bottom)-br.top+52)/scale)+'px';}if(tonicTipEl){tonicTipEl.style.left=left;tonicTipEl.style.top=((Math.max(r.bottom,r2.bottom)-br.top+88)/scale)+'px';}}
function updateTonicBtn(){if(!tonicBtnEl){tonicBtnEl=document.createElement('button');tonicBtnEl.id='tonic-pedal-btn';tonicBtnEl.style.cssText='position:fixed;right:auto;bottom:auto;z-index:400;background:#222831;border:1px solid #39d98a;color:#7ff0b4;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:14px;font-weight:bold;display:none;';document.body.appendChild(tonicBtnEl);tonicVolEl=document.createElement('input');tonicVolEl.type='range';tonicVolEl.id='tonic-volume-slider';tonicVolEl.min='0';tonicVolEl.max='100';tonicVolEl.step='5';tonicVolEl.value='50';tonicVolEl.style.cssText='position:fixed;right:auto;bottom:auto;z-index:400;width:110px;accent-color:#39d98a;display:none;';document.body.appendChild(tonicVolEl);tonicVolEl.addEventListener('input',e=>updatePedalVolumeDirect(parseInt(e.target.value)));tonicTipEl=document.createElement('div');tonicTipEl.style.cssText='position:fixed;right:auto;bottom:auto;max-width:280px;background:#12161cee;border:1px solid #39d98a;color:#cfd8dc;border-radius:10px;padding:8px 12px;font-size:12px;line-height:1.4;display:none;z-index:400;';document.body.appendChild(tonicTipEl);tonicBtnEl.addEventListener('click',()=>{getSharedCtx();if(tonicPedalOscs&&tonicPedalOscs.length)stopTonicPedal(false);else startTonicPedal();updateTonicBtn();});tonicBtnEl.addEventListener('mouseenter',()=>{tonicTipEl.textContent=t('tonic_tip');tonicTipEl.style.display='block';positionTonicControls();});tonicBtnEl.addEventListener('mouseleave',()=>{tonicTipEl.style.display='none';});}const show=midiMode.classList.contains('active')&&exclusiveMode==='normal';tonicBtnEl.style.display=show?'block':'none';tonicVolEl.style.display=show?'block':'none';if(!show){tonicTipEl.style.display='none';if(tonicPedalOscs&&tonicPedalOscs.length)stopTonicPedal(false);}else{const on=tonicPedalOscs&&tonicPedalOscs.length;tonicBtnEl.textContent=t('tonic_btn');tonicBtnEl.style.background=on?'#123324':'#0c0f13';tonicBtnEl.style.border=on?'1px solid #39d98a':'1px solid #3a4148';tonicBtnEl.style.color=on?'#7ff0b4':'#5c666e';tonicBtnEl.style.boxShadow=on?'0 0 10px #39d98a88':'none';tonicVolEl.value=Math.round(pedalVolume/0.12*100);positionTonicControls();}}
/* ══════════ CAPA V11: CONSOLA + FLETXES + NOMS ══════════ */
const evLog=[];let lastConsoleAct=performance.now();
function logEv(txt){evLog.push((performance.now()/1000).toFixed(1)+'s '+txt);if(evLog.length>250)evLog.shift();lastConsoleAct=performance.now();}
window.addEventListener('error',e=>{logEv('💥 ERROR JS: '+e.message+' (línia '+e.lineno+')');});
setInterval(()=>{if(!dbg.classList.contains('visible'))return;
dbg.textContent='── HISTORIAL DE SESSIÓ ('+evLog.length+') ──\n'+evLog.join('\n');
dbg.scrollTop=dbg.scrollHeight;},400);
setInterval(()=>{const earModeEl=document.getElementById('ear-mode');
if(earModeEl.classList.contains('active')&&earModeType==='test'&&accuracyPanel.classList.contains('visible')&&dbg.classList.contains('visible')){
const scale=(typeof currentZoom==='number'?currentZoom:100)/100;
const r=accuracyPanel.getBoundingClientRect();
dbg.style.bottom=(((innerHeight-r.top)/scale)+8)+'px';
}else dbg.style.bottom='64px';},500);
const _pen=playEarNote;
playEarNote=function(){const r=_pen.apply(this,arguments);logEv('🎵 pregunta #'+earCurrentIndex+' grau='+getDegreeNumber(earCurrentTargetPitchClass==null?0:earCurrentTargetPitchClass));return r;};
const _set1=startEarTraining;
startEarTraining=function(){const r=_set1.apply(this,arguments);logEv('▶ INICI prova mode='+earModeType+' dif='+earDifficulty);return r;};
/* [PEGAT 1] Log del Battle amb atribució J1/J2 */
const _hmiLog=window.handleMIDIMessage;
window.handleMIDIMessage=function(ev){const d=ev.data||[],cmd=d[0]&0xf0;
const pending=(cmd===0x90&&d[2]>0&&earTrainingActive&&!earUserAlreadyAnswered&&earModeType!=='listen');
const bc=earCorrectNotes;const who=battleCurrentPlayer;
const r=_hmiLog(ev);
if(pending&&earUserAlreadyAnswered){logEv('🎹 J'+who+' resposta: grau='+getDegreeNumber(getTransposedIndex(d[1]%12))+' ok='+(earCorrectNotes>bc));}
return r;};
setInterval(()=>{if(!(battleMode&&earTrainingActive&&!isPaused))return;
const idle=(performance.now()-lastConsoleAct)/1000;
const lim=(parseInt($('ear-delay-input-full').value)||4)+18;
if(idle>lim){logEv('⚠️ BLOQUEIG detectat (inactiu '+idle.toFixed(0)+'s)');dbg.classList.add('visible');lastConsoleAct=performance.now();}},1000);
document.addEventListener('keydown',e=>{
if(e.key!=='ArrowUp'&&e.key!=='ArrowDown')return;
const el=document.activeElement;
if(el&&(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA'))return;
if($('sound-controls').style.display==='flex')return;
const inEar=document.getElementById('ear-mode').classList.contains('active');
const inMidiTonic=document.getElementById('midi-mode').classList.contains('active')&&exclusiveMode==='normal';
if(!inEar&&!inMidiTonic)return;
e.preventDefault();
/* [PEGAT 3] Llegeix l'estat i no el DOM: s'acaba el bucle 0→50→45→... */
const cur=Math.round(pedalVolume/0.12*100);
updatePedalVolumeDirect(Math.min(100,Math.max(0,cur+((e.key==='ArrowUp')?5:-5))));
},true);
['battle-player1-name','battle-player2-name'].forEach(id=>{const el=document.getElementById(id);if(el)el.setAttribute('maxlength','12');});
/* ══════════ INIT ══════════ */
updateLanguageUI();updateModeButtons();updateDifficultyButtons();updateManualButtonsVisibility();loadZoom();updatePedalVolumeDirect(50);initPasswordModal();
/* ═══ TREURE FADE-IN DE LA FRASE ═══ */
(function(){
const st=document.createElement('style');
st.textContent='#v10-quote{transition:none !important;}';
document.head.appendChild(st);
})();
/* ═══ PROTECCIÓ CONSOLA (Password: quake) ═══ */
(function(){
let consoleUnlocked=false;
const CONSOLE_PASSWORD='quake';
const dbg=document.getElementById('v10-debug');
const earModeEl=document.getElementById('ear-mode');
if(!dbg)return;
const modal=document.createElement('div');
modal.id='v10-console-modal';
modal.style.cssText='position:fixed;right:12px;bottom:64px;z-index:98000;background:rgba(10,10,16,0.97);border:1px solid #00ff41;border-radius:10px;padding:14px 16px;font-family:Consolas,Monaco,monospace;display:none;min-width:260px;box-shadow:0 0 20px rgba(0,255,65,0.3);';
modal.innerHTML='<div style="color:#00ff41;font-size:12px;margin-bottom:8px;">🔐 Console Password</div><input type="password" id="v10-console-pass" placeholder="Enter password" style="width:100%;padding:6px 8px;background:rgba(0,0,0,0.6);border:1px solid #00ff41;border-radius:6px;color:#00ff41;font-family:Consolas,monospace;font-size:13px;outline:none;" /><div style="display:flex;gap:6px;margin-top:8px;justify-content:flex-end;"><button id="v10-console-ok" style="padding:4px 12px;background:#00ff41;color:#000;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:12px;">OK</button><button id="v10-console-cancel" style="padding:4px 12px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;">Cancel</button></div><div id="v10-console-err" style="color:#ff0055;font-size:11px;margin-top:6px;display:none;"></div>';
document.body.appendChild(modal);
const passInput=document.getElementById('v10-console-pass');
const errDiv=document.getElementById('v10-console-err');
function openModal(){modal.style.display='block';passInput.value='';errDiv.style.display='none';setTimeout(()=>passInput.focus(),50);}
/* [PEGAT A] En tancar la consola: allibera el focus i neteja notes enganxades */
function closeModal(){modal.style.display='none';try{passInput.blur();}catch(e){}if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();Object.keys(numHeld).forEach(k=>{deactivateManualNote(numHeld[k]);delete numHeld[k];});}
function tryPassword(){if(passInput.value===CONSOLE_PASSWORD){consoleUnlocked=true;closeModal();dbg.classList.add('visible');}else{errDiv.textContent='❌ Incorrect password';errDiv.style.display='block';passInput.value='';passInput.focus();}}
document.getElementById('v10-console-ok').addEventListener('click',tryPassword);
document.getElementById('v10-console-cancel').addEventListener('click',closeModal);
passInput.addEventListener('keydown',e=>{if(e.key==='Enter')tryPassword();if(e.key==='Escape')closeModal();});
new MutationObserver(()=>{if(dbg.classList.contains('visible')&&!consoleUnlocked){dbg.classList.remove('visible');openModal();}}).observe(dbg,{attributes:true,attributeFilter:['class']});
if(earModeEl){new MutationObserver(()=>{if(!earModeEl.classList.contains('active')){dbg.classList.remove('visible');consoleUnlocked=false;closeModal();}}).observe(earModeEl,{attributes:true,attributeFilter:['class']});}
console.log('🔐 Console protected (Password: quake)');
})();
/* ══════════ BOTONS SORTIR (només executable/Electron) ══════════ */
translations.ca.exit_app="❌ SORTIR";translations.es.exit_app="❌ SALIR";translations.en.exit_app="❌ EXIT";
if(IS_ELECTRON){
const mkExit=(id,css)=>{const b=document.createElement('button');b.id=id;b.style.cssText=css;b.textContent=t('exit_app');b.addEventListener('click',()=>window.close());return b;};
startScreen.appendChild(mkExit('btn-exit-app','position:absolute;top:24px;right:24px;z-index:50001;background:rgba(255,0,85,0.15);color:#ff0055;border:1px solid rgba(255,0,85,0.4);border-radius:12px;padding:10px 22px;cursor:pointer;font-size:14px;font-weight:600;'));
document.querySelector('.password-box').appendChild(mkExit('btn-exit-pw','margin-top:14px;width:100%;background:rgba(255,0,85,0.15);color:#ff0055;border:1px solid rgba(255,0,85,0.4);border-radius:10px;padding:10px;cursor:pointer;font-size:13px;font-weight:600;'));
const _origUpdateLang=updateLanguageUI;
updateLanguageUI=function(){_origUpdateLang();const ea=$('btn-exit-app'),ep=$('btn-exit-pw');if(ea)ea.textContent=t('exit_app');if(ep)ep.textContent=t('exit_app');};
}
/* ═══════════════════════════════════════════════ */
/* TABLET SUPPORT - Pseudo-fullscreen per iPad     */
/* ═══════════════════════════════════════════════ */
(function tabletSupport(){
  var ua = navigator.userAgent;
  var isIOS = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroidTablet = /Android/.test(ua) && !/Mobile/.test(ua);
  var w = window.innerWidth;
  var isTablet = (isIOS || isAndroidTablet) && w >= 768 && w <= 1366;
  if (!isTablet) return;
  
  // Fix per al famós problema del 100vh a iOS
  function setVh(){
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', function(){ setTimeout(setVh, 100); });
  
  // Pseudo-fullscreen per iOS (que no suporta Fullscreen API)
  function pseudoFullscreen(){
    window.scrollTo(0, 1);
    try {
      if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function(){});
      }
    } catch(e){}
  }
  
  // Assignar pseudo-fullscreen als botons
  var btnMidi = document.getElementById('btn-fullscreen-midi');
  var btnEar = document.getElementById('btn-fullscreen-ear');
  if (btnMidi) btnMidi.addEventListener('click', pseudoFullscreen);
  if (btnEar) btnEar.addEventListener('click', pseudoFullscreen);
  
  console.log('📱 Tablet mode activated');
})();
/* ═══════════════════════════════════════════════ */
/* AVÍS MIDI - iOS/macOS (Safari) no suporten MIDI */
/* ═══════════════════════════════════════════════ */
(function midiSupportWarning(){
  var ua = navigator.userAgent;
  var isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isMac = /Macintosh/.test(ua) && navigator.maxTouchPoints === 0;
  var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  var noMidi = !navigator.requestMIDIAccess;
  var appleNoMidi = (isIPad || isMac) && (noMidi || isSafari);
  if (!appleNoMidi) return;
  
  var warn = document.createElement('div');
  warn.id = 'midi-warning';
  warn.style.cssText = 'display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:30001;background:rgba(255,170,0,0.97);color:#000;border:2px solid #ffaa00;border-radius:16px;padding:20px 28px;font-size:15px;font-weight:700;max-width:min(560px,92vw);text-align:center;box-shadow:0 0 30px rgba(255,170,0,0.55);cursor:pointer;line-height:1.5;';
  warn.title = 'Clic per tancar';
  var warnTO = null;
  function hideWarn(){ if (warnTO) { clearTimeout(warnTO); warnTO = null; } warn.style.display = 'none'; }
  warn.addEventListener('click', hideWarn);
  document.body.appendChild(warn);
  
  function warnText(){
    if (currentLang === 'es') return '⚠️ iOS/macOS (Safari) NO permite MIDI en el navegador. Usa el CONTROL MANUAL 🎛️ dins d\'aquesta app, o entra des d\'Android o PC per fer servir MIDI.';
    if (currentLang === 'en') return '⚠️ iOS/macOS (Safari) does NOT support MIDI in the browser. Use the MANUAL CONTROL 🎛️ inside this app, or open it from Android or PC to use MIDI.';
    return '⚠️ iOS/macOS (Safari) NO permet MIDI al navegador. Fes servir el CONTROL MANUAL 🎛️ dins d\'aquesta app, o entra des d\'Android o PC per fer servir MIDI.';
  }
  function syncWarn(){
    var active = midiMode.classList.contains('active') || earMode.classList.contains('active');
    if (active) {
      if (warn.style.display !== 'block') {
        warn.textContent = warnText();
        warn.style.display = 'block';
        if (warnTO) clearTimeout(warnTO);
        warnTO = setTimeout(hideWarn, 9000);
      }
    } else hideWarn();
  }
  new MutationObserver(syncWarn).observe(midiMode, {attributes:true, attributeFilter:['class']});
  new MutationObserver(syncWarn).observe(earMode, {attributes:true, attributeFilter:['class']});
  syncWarn();
})();

console.log('🎹 TONAL EMOTIONS: v13 net carregat (amb tots els pegats del registre).');