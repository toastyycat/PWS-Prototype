/* Illustrator ExtendScript: A4-artboards, een per deelnemer.
   Kies public/deelnemers.csv wanneer Illustrator daarom vraagt. */
#target illustrator
(function () {
  var csv = File.openDialog('Kies deelnemers.csv', '*.csv');
  if (!csv) return;
  csv.encoding = 'UTF-8';
  if (!csv.open('r')) { alert('CSV kon niet worden geopend.'); return; }
  var source = csv.read(); csv.close();
  var lines = source.replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
  var headers = lines.shift().split(';');
  if (headers.join(';') !== 'deelnemerscode;apparaat;volgorde;taak;soort;paar;design;opdracht') { alert('Onverwachte CSV-kolommen.'); return; }
  var people = {}, order = [], i, cells, code;
  for (i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;
    cells = lines[i].split(';'); code = cells[0];
    if (!people[code]) { people[code] = []; order.push(code); }
    people[code].push({ device: cells[1], number: Number(cells[2]), task: cells[3], kind: cells[4], pair: cells[5], variant: cells[6], content: cells[7] });
  }
  order.sort(function (a,b) { return Number(a.substr(1))-Number(b.substr(1)); });
  if (!order.length) { alert('Geen deelnemers in de CSV gevonden.'); return; }
  for (i = 0; i < order.length; i++) {
    var tasks = people[order[i]];
    if (tasks.length !== 15) { alert(order[i] + ' heeft geen 15 taken.'); return; }
    tasks.sort(function (a,b) { return a.number - b.number; });
    for (var j = 0; j < tasks.length; j++) if (tasks[j].number !== j + 1) { alert('Ongeldige volgorde voor ' + order[i]); return; }
  }

  var scenarios = {
    '1': {X:['Intake','2026-10-06','10.30'],Y:['Behandeling','2026-10-08','13.00'],Z:['Oefentherapie','2026-10-19','09.00'],W:['Manuele therapie','2026-10-28','14.30']},
    '2': {X:['Behandeling','2026-11-12','14.30'],Y:['Oefentherapie','2026-11-16','09.00'],Z:['Ergotherapie','2026-11-24','13.00'],W:['Sportfysiotherapie','2026-11-27','10.30']},
    '3': {X:['Oefentherapie','2026-12-22','13.00'],Y:['Intake','2026-12-24','10.30'],Z:['Manuele therapie','2026-12-07','09.00'],W:['Behandeling','2026-12-16','14.30']},
    '4': {X:['Intake','2027-01-28','09.00'],Y:['Behandeling','2027-01-26','14.30'],Z:['Ergotherapie','2027-01-08','10.30'],W:['Sportfysiotherapie','2027-01-20','13.00']},
    '5': {X:['Behandeling','2027-02-09','10.30'],Y:['Oefentherapie','2027-02-23','13.00'],Z:['Intake','2027-02-05','14.30'],W:['Manuele therapie','2027-02-18','09.00']},
    '6': {X:['Ergotherapie','2027-03-03','09.00'],Y:['Sportfysiotherapie','2027-03-11','13.00'],Z:['Oefentherapie','2027-03-19','10.30'],W:['Intake','2027-03-29','14.30']}
  };
  var info = {
    I1:'Zoek de pagina over energiemanagement. Vertel welke twee soorten momenten samen bekeken worden.',
    I2:'Zoek op de site welke voorbeeldlocatie van de praktijk wordt genoemd.',
    I3:'Zoek op de site of een afspraak in deze oefenomgeving echt is.',
    I4:'Zoek de pagina Bewegen in een groep en vertel voor wie de activiteit bedoeld is.',
    I5:'Log in op de oefensite met het fictieve e-mailadres dat de onderzoeker u geeft.\nOefenadres: alex.voorbeeld@example.invalid'
  };
  var pairNames = {'1':'Tekstgrootte','2':'Navigatie','3':'Contrast','4':'Animatie','5':'Volledig ontwerp','6':'Geduld bij laden'};
  var months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  var weekdays = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
  function dateText(iso) { var p=iso.split('-'), d=new Date(Number(p[0]),Number(p[1])-1,Number(p[2])); return weekdays[d.getDay()]+' '+Number(p[2])+' '+months[Number(p[1])-1]+' '+p[0]; }
  function prompt(t) { if(t.kind==='informatie') return info[t.content]; var s=scenarios[t.pair][t.content]; return 'Maak een afspraak voor '+s[0].toLowerCase()+' op '+dateText(s[1])+' om '+s[2]+' uur.'; }
  function rgb(hex) { var c=new RGBColor(); c.red=parseInt(hex.substr(1,2),16); c.green=parseInt(hex.substr(3,2),16); c.blue=parseInt(hex.substr(5,2),16); return c; }
  var cream=rgb('#FFF8F0'), ink=rgb('#493B32'), muted=rgb('#776F67'), line=rgb('#D9CFC4'), accent=rgb('#815B43'), soft=rgb('#F2E8DC');
  var W=595.276, H=841.89, gap=24, doc=app.documents.add(DocumentColorSpace.RGB,W,H);
  doc.artboards[0].artboardRect=[0,0,W,-H];
  function rect(left,top,width,height,fill,stroke,radius) { var p=radius ? doc.pathItems.roundedRectangle(top,left,width,height,radius,radius) : doc.pathItems.rectangle(top,left,width,height); p.filled=true;p.fillColor=fill;p.stroked=!!stroke;if(stroke){p.strokeColor=stroke;p.strokeWidth=0.8;}return p; }
  var regular, bold;
  try { regular=app.textFonts.getByName('NotoSans-Regular'); } catch(ignore1) { regular=app.textFonts.getByName('ArialMT'); }
  try { bold=app.textFonts.getByName('NotoSans-Bold'); } catch(ignore2) { bold=app.textFonts.getByName('Arial-BoldMT'); }
  function textFrame(value,left,top,size,color,isBold,width) {
    var t=doc.textFrames.add(); t.contents=value; t.position=[left,top];
    t.textRange.characterAttributes.textFont=isBold?bold:regular;
    t.textRange.characterAttributes.size=size; t.textRange.characterAttributes.fillColor=color;
    t.textRange.characterAttributes.leading=size*1.3;
    return t;
  }
  function wrap(value,limit) {
    var paragraphs=value.split('\n'), out=[];
    for(var p=0;p<paragraphs.length;p++) { var words=paragraphs[p].split(' '), row='';
      for(var k=0;k<words.length;k++) { if((row+' '+words[k]).length>limit && row){out.push(row);row=words[k];}else row+=(row?' ':'')+words[k]; }
      out.push(row);
    }
    return out.join('\r');
  }
  for(i=0;i<order.length;i++) {
    var gx=i%10, gy=Math.floor(i/10), x=gx*(W+gap), y=gy*(H+gap), pageTop=-y;
    if(i) doc.artboards.add([x,pageTop,x+W,pageTop-H]);
    rect(x,pageTop,W,H,cream,null,0);
    rect(x+28,pageTop-28,8,43,accent,null,4);
    textFrame('FYSIOTHERAPIE VALKENSWAARD  /  PWS',x+48,pageTop-38,9,accent,true);
    textFrame('Opdrachten  '+order[i],x+48,pageTop-62,25,ink,true);
    textFrame(people[order[i]][0].device+'  |  15 taken  |  Fictieve oefenomgeving',x+49,pageTop-80,10,muted,false);
    var cardW=255, cardH=83, startX=x+31, startY=pageTop-104;
    for(j=0;j<15;j++) {
      var t=people[order[i]][j], col=j%2, row=Math.floor(j/2), left=startX+col*(cardW+23), top=startY-row*89;
      rect(left,top,cardW,cardH,cream,line,10);
      rect(left+9,top-10,31,22,soft,null,6);
      textFrame(t.task,left+15,top-16,9,accent,true);
      var label=t.kind==='boeking' ? pairNames[t.pair]+' · '+t.variant+'/'+t.content : (t.content==='I5'?'Inloggen':'Siteopdracht')+' · '+t.content;
      textFrame(label,left+48,top-17,9,muted,true);
      textFrame(wrap(prompt(t),48),left+12,top-36,9.1,ink,false);
    }
    textFrame('Lees de opdracht voor. Laat deze kaart tijdens de taak bij het apparaat liggen.',x+31,pageTop-H+24,9,muted,false);
  }
  alert('Klaar: '+order.length+' A4-pagina\'s. Sla het Illustrator-document op als .ai of PDF.');
})();
