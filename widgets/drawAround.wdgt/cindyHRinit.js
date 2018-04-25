/*
 * Put <script src="cindyColor.js" data-scriptid="YOURINITSCRIPTID"></script> before your createCindy.
 */
function initProlog() {
	var rules = document.getElementById("rules").innerHTML;
	return initDatabaseRules(rules);
}

var predatabase=initProlog();
var database;
function appendProlog(rules) {
	database=appendToDatabase(predatabase,rules);
}

function queryProlog(query) {
	freeformQ(database,query)
}
function strokeToProlog(str,qq) {
	str=str.replace(/@/g,"\n");
	appendProlog(str);
	queryProlog(qq);
	Cindy.evokeCS('prologErg="'+phandle+'";');

}
    
(function(){
	
	function addScript(id, code) {
		var scriptId = id;
		
		var scriptElement = document.getElementById(scriptId);
		if (!scriptElement) {
			scriptElement = document.createElement("script");
			scriptElement.id = scriptId;
			scriptElement.type = "text/x-cindyscript";
			document.head.appendChild(scriptElement);
		}
		if (scriptElement.firstChild) {
			scriptElement.insertBefore(code, scriptElement.firstChild);
		} else {
			scriptElement.appendChild(code);
		}
	}

	var code = document.createTextNode(`
blocked=false;

block():=(blocked=true);
unblock():=(blocked=false);

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

eps=.1;
letters=["0","|","1","1a","2","3","4a","4b","5a","5b","5c","6","7a","8","9a","9b","9c"];


//Daten die gesammelt wurden:
//
//erg0: Analyse des gesamten strokes
//erg1a1: Analyse des ersten Teil Strokes, bei einmal aufbrechen
//erg1a2: Analyse des zweiten Teil Strokes, bei einmal aufbrechen
//erg1b1: Analyse des ersten Teil Strokes, bei einmal aufbrechen 2. Wahl
//erg1b2: Analyse des zweiten Teil Strokes, bei einmal aufbrechen 2. Wahl
//erg2a1: Analyse des ersten Teil Strokes, bei zweimal aufbrechen
//erg2a2: Analyse des zweiten Teil Strokes, bei zweimal aufbrechen
//erg2a2: Analyse des dritten Teil Strokes, bei zweimal aufbrechen
//Ok, das sind viel zu viele Daten.... :-)
//mainbreak: Hauptaufbrechpunkt
//mainstart: Startpunkt des Hauptstrokes
//mainend: Endpunkt des Hauptstrokes
//
//Ferner


//Hier werden die Eigenschaften festgelegt
/////////////
datstraight=[["|"],["0","1","1a","2","3","4a","4b","5a","5b","5c","6","7a","8","9a","9b","9c"]];
calcstraight():=(
    straigth=intervals(erg0_8,0.01,0.01);
);


/////////////
dattoptop=[["0","8"],["1","1a","2","3","4a","4b","5a","5b","5c","6","7a","9a","9b","9c"]];
calctoptop():=(
    toptop=if((erg0_1_2>0.2 & erg0_2_2>0.2),1,-1);
);



/////////////
datenddown=[["1","1a","7a","4b","9c"],["0","8"]];
calcenddown():=(
    enddown=intervals(erg0_2_2,-.8,-.8);
);

/////////////
datstartup=[["4a","5a","5b"],["4b"]];
calcstartup():=(
    startup=intervalg(erg0_1_2,0.8,0.8);
);

/////////////
datstartleft=[["1"],["4b","1a"]];
calcstartleft():=(
    startleft=intervals(erg0_1_1,-0.8,-0.8);
);

/////////////
datstartright=[["4b"],["1","2","3","5a","7a","9b"]];
calcstartright():=(
  startright=intervalg(erg0_1_1,0.8,0.8);
);

/////////////
datfullright=[["1","7a"],["1a","2","4a","4b","9b","5c"]];
calcfullright():=(
   fullright=intervalg(erg0_3,0.9,0.9);
);

/////////////
datfullleft= [["4a","4b","1a"],["1","3","5a","5b","7a","9a","9b","5c"]];
calcfullleft():=(
    fullleft=intervals(erg0_3,-0.9,-0.9);
);

/////////////
datsinglecolored= [["0","6","9b"],["8"]];
calcsinglecolored():=(
    singlecolored=intervalg(|erg0_5|,0.4,0.4);//mind 80% eine Farbe
);

/////////////
datred= [["6"],["2","3","5a","5b","8","9b","5c"]];
calcred():=(
    red=intervalg(erg0_5,0.8,0.8);
);

/////////////
datgreen= [["9b"],["6","8","9a","9c","5c"]];
calcgreen():=(
    green=intervals(erg0_5,-0.8,-0.8);
);

/////////////
dattwostrokes= [["1","1a"],["0","2","3","4b","5a","5b","6","9a","9b","9c"]];
calctwostrokes():=(
     if(nbr>0,
        ge1=erg1a1_8;
        ge2=erg1a2_8;
        twostrokes=if(ge1<0.02 & ge2<0.02,1,-1),
        twostrokes=0;
        );
);

/////////////
datsecondisstroke= [["1","7a","1a"],["5a"]];
calcsecondisstroke():=(
     if(nbr>0,
        ge2=erg1a2_8;
        secondisstroke=intervals(ge2,0.030,0.03),
        secondisstroke=0;
        );
);


/////////////
datfirstisgreen= [["9b","3"],["6","9a","9c"]];
calcfirstisgreen():=(
     if(nbr>0,
        firstisgreen=intervals(erg1a1_5,0,0),
        firstisgreen=0;
      );
);

/////////////
datendleft=[["3","5a","5b","5c"],["2","4a"]];
calcendleft():=(
     endleft=intervals(erg0_2_1,-.0,-.0);
);



/////////////
datbreakinleft= [["5a","5c"],["1","5b","7a"]];
calcbreakinleft():=(
     if(nbr>0,
        relbreak=relpos(mainbreak);
        breakinleft=intervals(relbreak_1,0.2,0.2),
        breakinleft=0;
    );
);

/////////////
datthreestrokes= [["4b"],["3","6","9a","9b","9c"]];
calcthreestrokes():=(
    if(nbr>1,
       ge1=erg2a1_8;
       ge2=erg2a2_8;
       ge3=erg2a3_8;
       threestrokes=if(ge1<0.02 & ge2<0.02& ge3<0.02,1,-1);
       ,
       threestrokes=0;
    );

);

/////////////
datlastpointsright= [["2","4a","9b"],["9b"]];
calclastpointsright():=(
    if(nbr>0,
       lastpointsright=if(mainend_1>lastbreak_1,1,-1),
       lastpointsright=0;
       );
);

/////////////
datfirsthorizontal= [["7a"],["1","4a"]];
calcfirsthorizontal():=(
    if(nbr>0,
       ddd=mainbreak-mainstart;
       ddd=ddd/|ddd|;
       firsthorizontal=if(ddd_1>.9 ,1,-1),
       firsthorizontal=0;
       );
);

/////////////
datfirstpointsright= [["7a"],["6","9a","9b","9c"]];
calcfirstpointsright():=(
    if(nbr>0,
       ddd=firstbreak-mainstart;
       ddd=ddd/|ddd|;
       firstpointsright=0;
       if(ddd_1>0 & |ddd_1|>|ddd_2| ,firstpointsright=1,firstpointsright=-1),
       firstpointsright=0;
       );

);

/////////////
datsolostart= [["6","4a","5a","5b","5c"],["9a","9c","9b"]];
calcsolostart():=(
    solostart=intervalg(erg0_6,0.3,0.3);
);


/////////////
datsoloend= [["9c","4a"],["6"]];
calcsoloend():=(
    soloend=intervalg(erg0_7,0.3,0.3);
);

/////////////
datmaxcount= [["3"],["1","1a","2","5a"]];
calcmaxcount():=(
    maxcount=intervalg(erg0_10,1.5,1.5);
);





createdata(st):=(
   calcstraight();
   calctoptop();
   calcenddown();
   calcstartup();
   calcstartleft();
   calcstartright();
   calcfullright();
   calcfullleft();
   calcsinglecolored();
   calcred();
   calcgreen();
   calctwostrokes();
   calcsecondisstroke();
   calcfirstisgreen();
   calcendleft();
   calcbreakinleft();
   calcthreestrokes();
   calclastpointsright();
   calcfirsthorizontal();
   calcfirstpointsright();
   calcsolostart();
   calcsoloend();
   calcmaxcount();
   
   fulldata=[
             straigth,toptop,enddown,startup,startleft,startright,fullright,fullleft,
             singlecolored,red,green,twostrokes,secondisstroke,firstisgreen,
             endleft,breakinleft,threestrokes,lastpointsright,firsthorizontal,
             firstpointsright,solostart,soloend,maxcount
             ];
   erg=findfitting(fulldata);

   if(erg!=[],
      
      if(erg_1_1=="|",
        dir=eigenanalyse(st)_2;
        //err(dir);
        li=[[(0,1),"|"],[(1,1)/sqrt(2),"/"],[(1,0),"-"],[(1,-1)/sqrt(2),"\"]];
        erg_1_1=sort(li,|dir*#_1|)_4_2;
      );
      if(|absdiff|<0.35,erg=["*"]);
      send=send+erg_1_1;
      send=send+"?"
      );
   
     erg;
   );
   
   


datall=[datstraight,dattoptop,datenddown,datstartup,datstartleft,datstartright,datfullright,datfullleft,datsinglecolored,datred,datgreen,dattwostrokes,datsecondisstroke,datfirstisgreen,datendleft,datbreakinleft,datthreestrokes,datlastpointsright,datfirsthorizontal,datfirstpointsright,datsolostart,datsoloend,datmaxcount
];


//Zuer Konvertierung der Eigenschaften in Matrix
ergdat=apply(letters,let,
  str="";
  apply(datall,d,
    p=".";
    if(select(d_1,#==let)!=[],p="+");
    if(select(d_2,#==let)!=[],p="-");
    str=str+p;
  );
//  err(let+" ==> "+str);
  [let,str];
);


data=ergdat;

//Convertieren der Eigenschaftenvectoren
convert(s):=apply(1..length(s),if(s_#=="+",1,if(s_#=="-",-1,0)));
dat=apply(data,[#_1,convert(#_2)]);


//Nicht getrennte Elemente heraussuchen
differnces():=(
  pairs=pairs(dat);
  forall(pairs,
     a=#_1_2;
     b=#_2_2;
     n=length(a);
     comp=apply(1..n,a_#*b_#);
     if((select(comp,#==-1)==[]),
       err(#_1_1+" "+#_2_1)
     );
  )
);

//differnces();



//Feststellen on ein Zeichen passt
fits(a,b):=(
  select(apply(1..length(a),i,a_i*b_i),#==-1)==[];
);

findfitting(feat):=(
  set=[];
  forall(dat,d,
     if(fits(feat,d_2),set=set++[d_1]);
  );
  set
);




//Ausgabe:
printfitting(feat):=(
  set=[];
  x=0;
  forall(dat,d,x=x+1;
     drawtext((x-3,8),d_1);
     forall(1..length(feat),y,

          te=(d_2_y)*(feat_y);
          t1=(d_2_y);
          drawtext((x-3,7.7-.7*y),te);
     );
  );
  set
);



////////////////
//Hilfsroutinen
////////////////


//Timing wegwerfen
filter(s):=apply(s,#_1);

//Bounding Box
box(s):=(min(s),max(s));

//Rechteck aus zwei Ecken
rect(l):=[l_1,((l_2).x,(l_1).y),l_2,((l_1).x,(l_2).y)];

//Interval
between(a,c,d):=(a>c)&(a<d);

//Split Intervall(links)
intervalg(x,a,b):=(if(x<a,-1,if(x>b,1,0)););

//Split Intervall(rechts)
intervals(x,a,b):=(-if(x<a,-1,if(x>b,1,0)););
                                      
//Relative Position zur Bounding Box
relpos(p):=
 (
  rel=p-abssum;
  (rel_1/absdiff_1,rel_2/absdiff_2);
  );

//Modulation für Breakpoint
sca(x,n):=
  (
   1/exp(-(((x-(n/2))/(.6*n))^2));
   1
   );
   

//Box Malen
annotate(box):=(
 drawpoly(rect(box),color->(1,1,1));
 mid=(box_1+box_2)/2;
 diff=(box_2-box_1)/2;
 box1=(mid-diff*.9,mid+diff*.9),
 drawpoly(rect(box1),color->(1,1,1));
 box1=(mid-diff*.4,mid+diff*.4),
 drawpoly(rect(box1),color->(1,1,1));
 
 );
 
//Krümmungskreise aus drei Punkten brechenen
circ(a,b,c):=
  (
   m1=(a+b)/2;
   m2=(b+c)/2;
   p1=perp(join(a,b),m1);
   p2=perp(join(b,c),m2);
   mid=meet(p1,p2);
   if(mid.homog_3==0,dist=10000000,dist=|mid.xy,a.xy|);
   (mid,dist);
   );
   
 //Glättung der Punkte
 glatt(st):=
   (
    st1=st;
    apply(2..(length(st)-1),
          st1_#=(st_(#-1)+st_(#)+st_(#+1))/3;
          );
    st1;
    );
    
    
//Hauptrichtungen Berechnen
eigenanalyse(pts):=
  (
   regional(n,mid,ev,ew);
   n=length(pts);
   mid=sum(pts)/n;
   pts=apply(pts,#-mid);
   m=transpose(pts)*pts;
   ev=transpose(eigenvectors(m));
   ew=eigenvalues(m);
   ew=ew/|ew|*10;
   ewbas=[ev_1,ev_2];
   if(|(0,1)*ewbas_1|<|(0,1)*ewbas_2|,ewbas=[ev_1,ev_2];);
   if(ewbas_1_1<0,ewbas_1=-ewbas_1);
   if(ewbas_2_2<0,ewbas_2=-ewbas_2);
   [ew_2/10,ev_2,ew_1/ew_2,ewbas,mid];
   );
   

//Analysefunktion
//Kenngrößen eines Substrokes berechnen
//
//Eingabe:
//st: der Strike
//kr: Die Krümmungdaten
//
//Ausgabevector:
// _1: Relative Position des Startpunkts
// _2: Relative Position des Endpunkts
// _3: Verhältnis Punkte Links und Rechts der Verbindung Start/End
// _4: Relative Summe Orientierter Krümmung zu Gesamtkrümmung
// _5: Verhältnis Rot zu Grün (Links, Rechts, Krümmung)
// _6: Entfernung des Starts zum nähesten Punkt des Strokes
// _7: Entfernung des Endes zum nähesten Punkt des Strokes
// _8: Geradheit des Strokes
// _9: Normiert richtung von Anfang zu Ende
//_10: #Maxima in x koodinate


analyzequali(st,kr):=
  (
   regional(box,diff,sum,nn,start,end,eps,dist,li);
   st=apply(kr,st_(#_1));
   eps=.1;
   box=box(st);
   diff=(box_2-box_1)/2;
   sum=(box_2+box_1)/2;
   nn=length(st);
   start=st_1;
   end=st_nn;
   direction=end-start;
   direction=direction/|direction|;
   
   startrel=start-sum;
   endrel=end-sum;
   
   //Relative Positions //OK
   startrel=(startrel_1/diff_1,startrel_2/diff_2);
   endrel=(endrel_1/diff_1,endrel_2/diff_2);
   
   
   //Left VS Right Points Only Those with a certain distance
   dist=|start-end|;
   li=select(2..nn-1,
             |det((start++[1],end++[1],(st_#)++[1]))|/dist>.2;
             );
   ratio=if(length(li)==0,0,
            length(select(li,det((start++[1],end++[1],(st_#)++[1]))>0))/(length(li))*2-1;
            );
   //Straigtness (kann man besser machen)
   ge=length(li)/(nn-2)*2-1;
   //z.B so:
   eig=eigenanalyse(st);
   ge=eig_3;
   
   //Relative sum of oriented curvatre
   bend=sum(kr,#_4)/sum(kr,|#_4|);
   
   //Red Vs Green //OK
   kr1=select(kr,|#_3|>eps);
   rg=if(length(kr1)==0,0,
         -1+2*length(select(kr1,#_3>eps))/length(kr1);
         );
   
   //Solo start
   st2=sort(1..nn,|start,st_#|);
   cts=0;
   flag=true;
   apply(1..nn, if((st2_#)==# & flag,cts=cts+1,flag=false));
   
   en2=sort(1..nn,|end,st_(nn-#+1)|);
   cte=0;
   flag=true;
   apply(1..nn, if((en2_#)==#& flag ,cte=cte+1,flag=false));
   
   pairs=pairs(st);
   pairs=sort(pairs,-|#_1,#_2|);
   diameter=|pairs_1_1,pairs_1_2|;
   
   diamst=|start,st_cts|/diameter;
   diamen=|end,st_(nn-cte+1)|/diameter;
   bas=eigenanalyse(st)_4;
   st1=apply(st,[#*bas_1,#*bas_2]);
   //st1=glatt(st);
   repeat(2,st1=glatt(st1));
   min=0;
   max=0;
   flagma=false;
   flagmi=false;
   apply(2..(n-1),i,
         if(st1_(i-1)_1<st1_(i)_1+0.001 & st1_(i+1)_1<st1_(i)_1+0.001,
            if(!flagma,max=max+1);
            flagma=true
            ,
            flagma=false;
            );
         if(st1_(i-1)_1>st1_(i)_1+0.001 & st1_(i+1)_1>st1_(i)_1+0.001,
            if(!flagmi,min=min+1);
            flagmi=true
            ,
            flagmi=false;                    );
         );
   [startrel,endrel,ratio,bend,rg,diamst,diamen,ge,direction,max];
   
   );
////ENDE Analysefunktion eines Sub-Strokes////////



//Analyse eines Eingabestrokes
//Hier werden die Daten berechnet, die dann später weitergereicht werden.
//Zuerst Krümmungen berechnen dann...
//Stroke wird an zwei Stellen aufgesplitted
//und für alle Substrokes werden Daten ermittelt
//Die Teildaten werden mit analyzequali(..) berechnet
analyze(stroke,info):=
  (
   eaten=false;
   kr=[];
   breaks=[];
   n=length(stroke);
   //Timestamps wegwerfen (kann man später noch reinnehmen)
   st=filter(stroke);
   //Glätten
   
   repeat(1,
          st=glatt(st);
          );
   
   //Startpunkt soll oben sein
   if(st_1_2<st_(length(st))_2,
      st=reverse(st);
      );
   
   //  annotate(box(st));
   
   
   absbox=box(st);
   absdiff=(absbox_2-absbox_1)/2;
   abssum=(absbox_2+absbox_1)/2;
   
   mainstart=st_1;
   mainend=st_(-1);
   
   
   w=1;
   //   err("***************");
   apply(1+w..(n-w),
         cir=circ(st_(#-w),st_(#),st_(#+w));
         dir1=st_(#)-st_(#-w);
         dir2=st_(#)-st_(#+w);
         nor=|dir1|+|dir2|;
         dir1=dir1/|dir1|;
         dir2=dir2/|dir2|;
         ar=det([st_(#-w)++[1],st_(#)++[1],st_(#+w)++[1]]);
         ar=-det((dir1,dir2));
         be=ar;
         ar=if(ar>0,1/|cir_2|,-1/|cir_2|);
         //  err(dir1*dir2);
         kr=kr++[[#,|ar|,ar,be,dir1*dir2]];
         
         );
   kr=[kr_1]++kr++[kr_(length(kr))];
   kr_1_1=1;
   kr_(-1)_1=n;
   n=length(kr);
   cut=round(n/8);
   apply(2+cut..(n-1-cut),
         if(((kr_(#-1))_5<(kr_(#))_5) & ((kr_(#+1))_5<(kr_(#))_5),
            if((kr_#)_5>-1,
               breaks=breaks++[kr_#];
               );
            );
         );
   lastbreak=st_(breaks_(-1)_1);
   firstbreak=st_(breaks_(1)_1);
   
   
   breaks=sort(breaks,-(#_5+1)*sca(#_1,n));
   //                 breaks=sort(breaks,1/#_2);
   
   variant0=[kr];
   nbr=length(breaks);
   eigenanalyse(st);
   if(nbr==0,
      erg0=analyzequali(st,kr);
      );
   
   if(nbr==1,
      mainbreak=st_(breaks_1_1);
      variant1=[kr_(1..breaks_1_1),
                kr_(breaks_1_1..n)];
      erg0=analyzequali(st,kr);
      erg1a1=analyzequali(st,variant1_1);
      erg1a2=analyzequali(st,variant1_2);
      
      );
   if(nbr>1,
      mainbreak=st_(breaks_1_1);
      erg0=analyzequali(st,kr);
      variant1=[kr_(1..breaks_1_1),
                kr_(breaks_1_1..n)];
      erg1a1=analyzequali(st,variant1_1);
      erg1a2=analyzequali(st,variant1_2);
      
      variant2=[kr_(1..breaks_2_1),
                kr_(breaks_2_1..n)];
      erg1b1=analyzequali(st,variant2_1);
      erg1b2=analyzequali(st,variant2_2);
      ind1=breaks_1_1;
      ind2=breaks_2_1;
      if(ind2<ind1,
         ind2=breaks_1_1;
         ind1=breaks_2_1;
         );
      variant3=[kr_(1..ind1),
                kr_(ind1..ind2),
                kr_(ind2..n)
                ];
      erg2a1=analyzequali(st,variant3_1);
      erg2a2=analyzequali(st,variant3_2);
      erg2a3=analyzequali(st,variant3_3);
      
      
      );
   
   
   );
   
   
are(a,b,c):=det(a++[1],b++[1],c++[1]);
intersectsSeg(a,b):=(
   are(a_1,a_2,b_1)*are(a_1,a_2,b_2)<=0
&
   are(b_1,b_2,a_1)*are(b_1,b_2,a_2)<=0

);
intersects(stroke,straight):=(
    inters=false;
    apply(1..(length(stroke)-1),i,
       if(intersectsSeg((stroke_i,stroke_(i+1)),(straight_1,straight_(-1))),
          inters=true;
       )
    );
);

ontop(stroke,straight):=(//TODO Das ist nur provisorisch
  top=(straight_1+straight_2)/2;
  top.y>stroke_2_2-1 & top.x<stroke_2_1+2 & top.x>stroke_1_1-2 ;
);

//Durch Alle strokes Durchgehen
analyzestrokes():=
  (
   strokedata=zerovector(length(strokes));
   //sortieren nach "Linksheit"
   strokes = sort(strokes, sum(#, #_1.x)/length(#));
   apply(1..length(strokes),
         analyze(strokes_#,true);
         char=createdata(st);
         strokedata_#=[st,kr,breaks,fulldata,box,char];
         
         );
   send="";
   send2="";
   send3="";
   apply(1..length(strokes),
     send=send+strokedata_#_6
   );
//   err(send);

   prointers="";
  nl="@";

  apply(1..(length(strokedata)-1),

  s1=strokedata_#;
  s2=strokedata_(#+1);
  inters=false;
  ontop1=false;
  ontop2=false;
  if(s1_4_1==1,
     if(intersects(s2_1,s1_1),inters=true);
     if(ontop(box(s2_1),box(s1_1)),ontop1=true);//TODO: Precompute
  );
  if(s2_4_1==1,
     if(intersects(s1_1,s2_1),inters=true);
     if(ontop(box(s1_1),box(s2_1)),ontop2=true);//TODO: Precompute
  );
  if(inters,prointers=prointers+"intersects(s"+#+",s"+(#+1)+")."+nl);
  if(ontop2,prointers=prointers+"ontop(s"+#+",s"+(#+1)+")."+nl);
  if(ontop1,prointers=prointers+"ontop(s"+(#+1)+",s"+(#)+")."+nl);


);

// letters=["0","|","1","2","3","4a","4b","5a","5b","5c","6","7a","8","9a","9b","9c"];
  pout="";
  qq="number([";
   apply(1..length(strokes),
     guess=strokedata_#_6;
     if(guess==[],guess=["?"]);
     qq=qq+"s"+#;
     if(#!=length(strokes),qq=qq+",");
     apply(guess,g,
        if(g=="0",pout=pout+"predigit(s"+#+",d0)."+nl);
        if(g=="1",pout=pout+"predigit(s"+#+",d1)."+nl);
        if(g=="1a",pout=pout+"predigit(s"+#+",d1a)."+nl);
        if(g=="2",pout=pout+"predigit(s"+#+",d2)."+nl);
        if(g=="3",pout=pout+"predigit(s"+#+",d3)."+nl);
        if(g=="4a",pout=pout+"predigit(s"+#+",d4a)."+nl);
        if(g=="4b",pout=pout+"predigit(s"+#+",d4b)."+nl);
        if(g=="5a",pout=pout+"predigit(s"+#+",d5a)."+nl);
        if(g=="5b",pout=pout+"predigit(s"+#+",d5b)."+nl);
        if(g=="5c",pout=pout+"predigit(s"+#+",d5c)."+nl);
        if(g=="6",pout=pout+"predigit(s"+#+",d6)."+nl);
        if(g=="7a",pout=pout+"predigit(s"+#+",d7a)."+nl);
        if(g=="8",pout=pout+"predigit(s"+#+",d8)."+nl);
        if(g=="9a",pout=pout+"predigit(s"+#+",d9a)."+nl);
        if(g=="9b",pout=pout+"predigit(s"+#+",d9b)."+nl);
        if(g=="*",pout=pout+"dot(s"+#+")."+nl);
        if(g=="-",pout=pout+"hor(s"+#+")."+nl);
        if(g=="|",pout=pout+"ver(s"+#+")."+nl);
        if(g=="/",pout=pout+"ne(s"+#+")."+nl);
        if(g=="\",pout=pout+"se(s"+#+")."+nl);
     );
   );
   qq=qq+"],X)?";
pout=pout+prointers;
      send2=send;
      errc(send2);
      errc(pout);
   
javascript("strokeToProlog('"+pout+"','"+qq+"');");
send=prologErg;

cc=unicode(22);
send=replace(send,[["X =",""],["[",""],["]",""],[",",""],[" ",""]
                  ,["t","*"],["p","+"],["m","-"],["d","/"],["f","?"]]);
                 // send=substring(send,1,length(send)-1);
//javascript("queryProlog('"+qq+"')");
   
   );
`);
addScript('csinit', code);
})();
