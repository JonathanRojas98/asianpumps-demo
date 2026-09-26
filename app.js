const productAssets = import.meta.glob('./assets/p-*', { eager: true, query: '?url', import: 'default' });
const products = [
  {id:'centrifuga',name:'Centrífugas',title:'Bombas centrífugas',image:'p-centrifuga.webp',mark:'CENTRÍFUGA',use:'Transferencia de fluidos',description:'Para mover agua y fluidos de baja viscosidad en los procesos de tu industria.'},
  {id:'diafragma',name:'Doble diafragma',title:'Bombas de doble diafragma',image:'p-diafragma.jpg',mark:'DIAFRAGMA',use:'Transferencia neumática',description:'Una familia versátil para aplicaciones con fluidos viscosos, abrasivos o químicos. Consulta materiales y configuración con nuestro equipo.'},
  {id:'vacio',name:'Vacío y aceite térmico',title:'Bombas de vacío y aceite térmico',image:'p-vacio.jpg',mark:'VACÍO',use:'Procesos industriales',description:'Equipos para requerimientos de vacío o circulación de aceite térmico. Cuéntanos las condiciones de tu proceso.'},
  {id:'engranes',name:'Engranes helicoidales',title:'Bombas de engranes helicoidales',image:'p-engranes.png',mark:'ENGRANES',use:'Transferencia de fluidos viscosos',description:'Alternativas para transferencia de aceites y otros fluidos viscosos. La selección depende del fluido y las condiciones de operación.'},
  {id:'dosificadora',name:'Dosificadoras',title:'Bombas dosificadoras',image:'p-dosificadora.png',mark:'DOSIFICACIÓN',use:'Control de dosificación',description:'Para incorporar cantidades controladas de un fluido a tu proceso. Revisamos contigo el caudal y la compatibilidad química.'},
  {id:'magnetico',name:'Cople magnético',title:'Bombas de cople magnético',image:'p-magnetico.jpg',mark:'MAGNÉTICO',use:'Transferencia de productos químicos',description:'Opciones de acoplamiento magnético para aplicaciones que requieren atención especial a la contención del fluido.'},
  {id:'sumergible',name:'Sumergibles',title:'Bombas sumergibles',image:'p-sumergible.jpg',mark:'SUMERGIBLE',use:'Bombeo bajo el agua',description:'Soluciones para agua limpia, drenaje y manejo de agua con sólidos, según el modelo y la aplicación.'},
  {id:'tornillo',name:'Doble tornillo',title:'Bombas de doble tornillo',image:'p-tornillo.jpg',mark:'DOBLE TORNILLO',use:'Transferencia en procesos sanitarios',description:'Equipos para productos de distintas viscosidades. Conversemos sobre las necesidades sanitarias y de transferencia de tu línea.'},
  {id:'peristaltica',name:'Peristálticas',title:'Bombas peristálticas',image:'p-peristaltica.jpg',mark:'PERISTÁLTICA',use:'Transferencia y dosificación',description:'El fluido se transporta dentro de una manguera. Una alternativa para dosificación y manejo de medios exigentes.'}
];
const industries = [
  ['Alimentos y bebidas','Procesos sanitarios','Desde ingredientes líquidos hasta productos viscosos. Equipos para transferencia y procesos sanitarios, seleccionados según tu producto.'],
  ['Tratamiento de aguas','Abastecimiento y tratamiento','Agua limpia, agua tratada o efluentes con sólidos. Revisamos las condiciones de bombeo para cada etapa del tratamiento.'],
  ['Minería','Fluidos abrasivos','Aplicaciones de transferencia con sólidos y medios abrasivos. Cuéntanos la composición del fluido y las condiciones de operación.'],
  ['Farmacéutica','Control del proceso','Soluciones para transferencia y dosificación. Revisamos contigo los materiales y requerimientos sanitarios de tu aplicación.'],
  ['Enología','Cuidado del producto','Equipos para trasvase, remontados y movimiento de mosto. Selección orientada a las necesidades de tu proceso de producción.'],
  ['Químicos','Compatibilidad de materiales','La selección empieza por el producto químico, su concentración y temperatura. Exploremos opciones de transferencia o dosificación.'],
  ['Gas','Aplicaciones especializadas','Revisamos las características del medio, la presión y los requerimientos de tu instalación para identificar las opciones de equipo.'],
  ['Automotriz','Fluidos de producción','Transferencia de solventes, aceites, aditivos y otros fluidos. Equipos seleccionados para las condiciones de tu línea.'],
  ['Cerámicos','Transferencia y dosificación','Desde el movimiento de fluidos hasta la dosificación de aditivos. Cuéntanos la viscosidad y la presencia de sólidos en tu proceso.']
];
const $ = (s) => document.querySelector(s);
const root = document.documentElement;
let preference;
try { preference = localStorage.getItem('asips-theme'); } catch {}
const colorScheme = matchMedia('(prefers-color-scheme: dark)');
function setTheme(value) { root.dataset.theme = value; $('.theme').setAttribute('aria-label',`Cambiar a modo ${value === 'dark' ? 'claro' : 'oscuro'}`); }
setTheme(preference || (colorScheme.matches ? 'dark' : 'light'));
$('.theme').addEventListener('click',()=>{preference=root.dataset.theme==='dark'?'light':'dark';setTheme(preference);try{localStorage.setItem('asips-theme',preference)}catch{}});
colorScheme.addEventListener('change', e=>{if(!preference)setTheme(e.matches?'dark':'light')});
$('.menu').addEventListener('click',()=>{const open=$('.menu').getAttribute('aria-expanded')!=='true';$('.menu').setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);$('.menu span').textContent=open?'−':'+'});
function closeMenu(){$('.menu').setAttribute('aria-expanded','false');$('#navigation').classList.remove('open');$('.menu span').textContent='+';}
$('#navigation').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#navigation').classList.contains('open')){closeMenu();$('.menu').focus()}});
let current = products[0];
const tabs = products.map((product,index)=>{
  const button=document.createElement('button');button.type='button';button.className='product-tab';button.id=`tab-${product.id}`;button.setAttribute('role','tab');button.setAttribute('aria-controls','product-panel');button.setAttribute('aria-selected',String(index===0));button.tabIndex=index===0?0:-1;
  const name=document.createElement('span');name.textContent=product.name;button.append(name);
  button.addEventListener('click',()=>{selectProduct(product);scrollToStep(index)});$('.product-list').append(button);
  const option=document.createElement('option');option.value=product.title;option.textContent=product.title;$('#quote-product').append(option);return button;
});
function selectProduct(product){if(product===current){return}current=product;const list=$('.product-list');tabs.forEach((tab,i)=>{const selected=products[i]===product;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected&&list.scrollWidth>list.clientWidth)list.scrollTo({left:tab.offsetLeft-22,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});$('#product-panel').setAttribute('aria-labelledby',`tab-${product.id}`);$('#product-img').src=productAssets[`./assets/${product.image}`];$('#product-img').alt=product.title;$('#stage-word').textContent=product.mark;$('#product-name').textContent=product.title;$('#product-description').textContent=product.description;for(const el of [$('.stage-media'),$('#stage-word')]){el.classList.remove('changing');requestAnimationFrame(()=>el.classList.add('changing'))}}
const steps=products.map((product,index)=>{const step=document.createElement('div');step.className='step';step.dataset.index=index;$('.scrolly-steps').append(step);return step});
function scrollToStep(index){steps[index].scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
if('IntersectionObserver' in window){const stepObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)selectProduct(products[Number(entry.target.dataset.index)])})},{rootMargin:'-45% 0px -45% 0px'});steps.forEach(step=>stepObserver.observe(step))}
$('.product-list').addEventListener('keydown',e=>{const index=tabs.indexOf(document.activeElement);if(index<0)return;let next;if(['ArrowDown','ArrowRight'].includes(e.key))next=(index+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=(index-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();tabs[next].focus();selectProduct(products[next]);scrollToStep(next)});
$('#product-quote').addEventListener('click',()=>{$('#quote-product').value=current.title});
document.querySelectorAll('[data-pick]').forEach(link=>link.addEventListener('click',()=>selectProduct(products.find(p=>p.id===link.dataset.pick))));
let selectedIndustry=industries[0];
industries.forEach((industry,i)=>{const button=document.createElement('button');button.type='button';button.textContent=industry[0];button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>{selectedIndustry=industry;$('#industry-options').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('#industry-title').textContent=industry[0];$('#industry-description').textContent=industry[2]});$('#industry-options').append(button)});
$('#industry-quote').addEventListener('click',()=>{const field=$('[name=mensaje]');if(!field.value)field.value=`Mi industria: ${selectedIndustry[0]}.\nNecesito apoyo con: `});
async function copyQuote(){try{await navigator.clipboard.writeText($('#quote-summary').value);$('#copy-status').textContent='Solicitud copiada. Puedes pegarla en el formulario de ASIPS.'}catch{$('#copy-status').textContent='Selecciona y copia el texto de arriba para compartir tu solicitud.';$('#quote-summary').focus();$('#quote-summary').select()}}
$('#quote-form').addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(e.currentTarget);$('#quote-summary').value=`Solicitud de cotización ASIPS\n\nNombre: ${data.get('nombre')}\nEmpresa: ${data.get('empresa')||'No indicada'}\nCorreo: ${data.get('correo')}\nTeléfono: ${data.get('telefono')}\nEquipo: ${data.get('equipo')}\n\nAplicación:\n${data.get('mensaje')}`;$('#form-result').hidden=false;await copyQuote();$('#form-result').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
$('#copy-quote').addEventListener('click',copyQuote);
$('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.industry-layout,.about-bottom,.contact-intro').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}


