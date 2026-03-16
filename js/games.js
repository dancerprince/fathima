// ========================================
// MINI GAMES — Themed SVG version
// ========================================
function closeModal(id) { var modal = document.getElementById(id); if (modal) modal.classList.add('hidden'); }

function getThemeShape(name, size) {
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) return SVG.getShape(name, size, currentTheme);
    return '';
}
function getRandomThemeShape(size) {
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        var shapes = currentTheme.floatingShapes || ['heart'];
        var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
        var colors = currentTheme.particleColors || ['#FF4081'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        return SVG[shapeName] ? SVG[shapeName](size, color, currentTheme.secondary) : SVG.heart(size, color);
    }
    return '';
}

// 1. MEMORY MATCH
var memoryCards=[],memoryFlipped=[],memoryMatched=0,memoryMoves=0,memoryTimer=null,memorySeconds=0,memoryLocked=false;
function getMemoryShapes() {
    if (typeof SVG!=='undefined'&&typeof currentTheme!=='undefined'&&currentTheme) {
        var t=currentTheme,allShapes=['heart','rose','butterfly','sakura','leaf','daisy','shell','crown','gem','moon','sun','star-5','cherry','candy','blossom','sparkle'];
        var themeShapes=t.shapes.concat(t.floatingShapes),uniqueShapes=[],seen={};
        themeShapes.concat(allShapes).forEach(function(s){if(!seen[s]&&SVG[s]&&uniqueShapes.length<8){seen[s]=true;uniqueShapes.push(s);}});
        return uniqueShapes.map(function(s,i){var color=t.particleColors[i%t.particleColors.length];return SVG[s](36,color,t.secondary);});
    }
    return ['1','2','3','4','5','6','7','8'];
}
function startMemoryGame(){document.getElementById('memory-modal').classList.remove('hidden');resetMemoryGame();}
function resetMemoryGame(){
    memoryMatched=0;memoryMoves=0;memorySeconds=0;memoryLocked=false;memoryFlipped=[];
    document.getElementById('memory-moves').textContent='0';document.getElementById('memory-pairs').textContent='0';document.getElementById('memory-time').textContent='0:00';
    if(memoryTimer)clearInterval(memoryTimer);
    memoryTimer=setInterval(function(){memorySeconds++;var m=Math.floor(memorySeconds/60),s=memorySeconds%60;document.getElementById('memory-time').textContent=m+':'+(s<10?'0':'')+s;},1000);
    var svgs=getMemoryShapes(),pairs=svgs.concat(svgs.slice());
    memoryCards=pairs.sort(function(){return Math.random()-0.5;});
    var board=document.getElementById('memory-board');board.innerHTML='';
    var cardBack=getThemeShape(currentTheme?currentTheme.cursorShape:'heart',28);
    memoryCards.forEach(function(svg,i){
        var card=document.createElement('div');card.className='memory-card';card.dataset.index=i;
        card.innerHTML='<div class="card-face card-front">'+cardBack+'</div><div class="card-face card-back">'+svg+'</div>';
        card.addEventListener('click',function(){flipMemoryCard(card,i);});board.appendChild(card);
    });
}
function flipMemoryCard(card,index){
    if(memoryLocked||card.classList.contains('flipped')||card.classList.contains('matched'))return;
    if(memoryFlipped.length>=2)return;
    card.classList.add('flipped');memoryFlipped.push({card:card,index:index});
    if(memoryFlipped.length===2){
        memoryMoves++;document.getElementById('memory-moves').textContent=memoryMoves;memoryLocked=true;
        var f=memoryFlipped[0],s=memoryFlipped[1];
        if(memoryCards[f.index]===memoryCards[s.index]){
            f.card.classList.add('matched');s.card.classList.add('matched');memoryMatched++;
            document.getElementById('memory-pairs').textContent=memoryMatched;memoryFlipped=[];memoryLocked=false;
            if(memoryMatched===8){clearInterval(memoryTimer);setTimeout(function(){alert('All pairs in '+memoryMoves+' moves & '+memorySeconds+'s! Amazing, Fathima!');},500);}
        }else{setTimeout(function(){f.card.classList.remove('flipped');s.card.classList.remove('flipped');memoryFlipped=[];memoryLocked=false;},800);}
    }
}

// 2. LOVE QUIZ
var quizQuestions=[
    {q:"What is the most beautiful thing about love?",options:["Material gifts","Understanding each other's heart","Never arguing","Always agreeing"],correct:1,response:"True love is about understanding each other's heart!"},
    {q:"What makes a birthday truly special?",options:["Expensive gifts","Being with loved ones","A big party","Having a day off"],correct:1,response:"The presence of loved ones makes any day magical!"},
    {q:"What's the secret to a happy relationship?",options:["Never fighting","Trust, respect & communication","Buying expensive things","Always being perfect"],correct:1,response:"Trust, respect, and communication are the foundation!"},
    {q:"How do you know someone truly loves you?",options:["They say it all the time","They show it through actions","They buy gifts daily","They never get upset"],correct:1,response:"Actions speak louder than words in true love!"},
    {q:"What's the most romantic thing in the world?",options:["A candlelit dinner","Growing old together","Fancy vacations","Expensive jewelry"],correct:1,response:"Growing old together, hand in hand — ultimate romance!"}
];
var quizIndex=0,quizScore=0;
function startLoveQuiz(){document.getElementById('quiz-modal').classList.remove('hidden');quizIndex=0;quizScore=0;showQuizQuestion();}
function showQuizQuestion(){
    var c=document.getElementById('quiz-container');
    if(quizIndex>=quizQuestions.length){
        var rs=quizScore===quizQuestions.length?getThemeShape('sparkle',48):getThemeShape('heart',48);
        c.innerHTML='<div class="quiz-score-display">'+rs+' '+quizScore+'/'+quizQuestions.length+'</div><p class="quiz-result">'+(quizScore===quizQuestions.length?"Perfect score! You truly understand love!":"Beautiful effort! Love is about learning together!")+'</p><button class="btn btn-game" onclick="startLoveQuiz()" style="margin-top:20px;">'+getThemeShape('star-4',14)+' Play Again</button>';
        return;
    }
    var q=quizQuestions[quizIndex];
    c.innerHTML='<p class="quiz-progress">Question '+(quizIndex+1)+' of '+quizQuestions.length+'</p><p class="quiz-question">'+q.q+'</p><div class="quiz-options">'+q.options.map(function(opt,i){return '<button class="quiz-option" onclick="answerQuiz('+i+')">'+opt+'</button>';}).join('')+'</div>';
}
function answerQuiz(sel){
    var q=quizQuestions[quizIndex],opts=document.querySelectorAll('.quiz-option');
    opts.forEach(function(opt,i){opt.disabled=true;opt.style.pointerEvents='none';if(i===q.correct)opt.classList.add('correct');if(i===sel&&sel!==q.correct)opt.classList.add('wrong');});
    if(sel===q.correct)quizScore++;
    setTimeout(function(){quizIndex++;showQuizQuestion();},1200);
}

// 3. CATCH HEARTS
var catchScore=0,catchLives=3,catchTimeLeft=30,catchInterval=null,catchTimerInterval=null,catchRunning=false;
function getCatchLivesSVG(){var h='',ls=getThemeShape('heart',18);for(var i=0;i<Math.max(0,catchLives);i++)h+=ls;if(catchLives<=0)h='<span style="font-weight:bold;">Gone</span>';return h;}
function startCatchHearts(){
    document.getElementById('catch-modal').classList.remove('hidden');
    catchScore=0;catchLives=3;catchTimeLeft=30;catchRunning=true;
    document.getElementById('catch-score').textContent='0';document.getElementById('catch-time').textContent='30';
    document.getElementById('catch-lives').innerHTML=getCatchLivesSVG();document.getElementById('catch-area').innerHTML='';
    if(catchInterval)clearInterval(catchInterval);if(catchTimerInterval)clearInterval(catchTimerInterval);
    catchTimerInterval=setInterval(function(){catchTimeLeft--;document.getElementById('catch-time').textContent=catchTimeLeft;if(catchTimeLeft<=0){stopCatchGame();alert('Time up! Caught '+catchScore+' shapes!');}},1000);
    catchInterval=setInterval(function(){if(catchRunning)spawnFallingHeart();},600);
}
function spawnFallingHeart(){
    var area=document.getElementById('catch-area');if(!area)return;
    var rect=area.getBoundingClientRect(),heart=document.createElement('div');
    heart.className='falling-heart';heart.innerHTML=getRandomThemeShape(32);
    heart.style.left=Math.random()*(rect.width-40)+'px';heart.style.top='-30px';area.appendChild(heart);
    var posY=-30,speed=2+Math.random()*2;
    var fi=setInterval(function(){
        if(!catchRunning){clearInterval(fi);heart.remove();return;}
        posY+=speed;heart.style.top=posY+'px';
        if(posY>rect.height){clearInterval(fi);heart.remove();catchLives--;document.getElementById('catch-lives').innerHTML=getCatchLivesSVG();if(catchLives<=0){stopCatchGame();alert('Game Over! Caught '+catchScore+' shapes!');}}
    },30);
    heart.addEventListener('click',function(e){
        e.stopPropagation();clearInterval(fi);catchScore++;document.getElementById('catch-score').textContent=catchScore;
        var pop=document.createElement('div');pop.className='catch-pop';pop.innerHTML='+1 '+getThemeShape('sparkle',14);
        pop.style.left=heart.style.left;pop.style.top=heart.style.top;area.appendChild(pop);
        setTimeout(function(){pop.remove();},600);heart.remove();
    });
}
function stopCatchGame(){catchRunning=false;if(catchInterval)clearInterval(catchInterval);if(catchTimerInterval)clearInterval(catchTimerInterval);}

// 4. JIGSAW
var jigsawMessages=["You are the love of my life","Happy Birthday my beautiful Fathima","Every moment with you is magical","You make my world complete","My heart beats only for you","Forever and always my love","You are my greatest blessing"];
var currentJigsawWords=[],placedWords=[];
function startJigsaw(){document.getElementById('jigsaw-modal').classList.remove('hidden');resetJigsaw();}
function resetJigsaw(){
    var msg=jigsawMessages[Math.floor(Math.random()*jigsawMessages.length)];
    currentJigsawWords=msg.split(' ');placedWords=[];
    var shuffled=currentJigsawWords.slice().sort(function(){return Math.random()-0.5;});
    document.getElementById('jigsaw-target').innerHTML='';document.getElementById('jigsaw-result').textContent='';
    document.getElementById('jigsaw-result').className='jigsaw-result';
    var pc=document.getElementById('jigsaw-pieces');pc.innerHTML='';
    shuffled.forEach(function(word){
        var el=document.createElement('span');el.className='jigsaw-word';el.textContent=word;
        el.addEventListener('click',function(){placeJigsawWord(el,word);});pc.appendChild(el);
    });
}
function placeJigsawWord(el,word){
    if(el.classList.contains('placed'))return;el.classList.add('placed');placedWords.push(word);
    var target=document.getElementById('jigsaw-target'),placed=document.createElement('span');
    placed.className='jigsaw-word';placed.textContent=word;
    placed.style.background=currentTheme?'rgba(233,30,99,0.15)':'#FFD1DC';
    placed.addEventListener('click',function(){var idx=placedWords.lastIndexOf(word);if(idx>-1)placedWords.splice(idx,1);placed.remove();el.classList.remove('placed');});
    target.appendChild(placed);
}
function checkJigsaw(){
    var r=document.getElementById('jigsaw-result');
    if(placedWords.join(' ')===currentJigsawWords.join(' ')){
        r.innerHTML=getThemeShape('sparkle',20)+' Perfect! You got it right!';r.className='jigsaw-result success';
        if(typeof Confetti!=='undefined')Confetti.launch(3000);
    }else{r.innerHTML=getThemeShape('heart',18)+' Almost! Try again!';r.className='jigsaw-result fail';}
}

// 5. WISH JAR
var wishes=["May all your dreams come true this year!","Wishing you endless laughter and joy!","May every day bring you a new reason to smile!","You deserve all the happiness in the world!","May love surround you every moment!","Wishing you a year full of beautiful surprises!","May your heart always be as beautiful as it is today!","You are loved more than you will ever know!","May this year be your most magical yet!","Wishing you health, happiness, and endless blessings!","May you always find reasons to celebrate!","You are a blessing to everyone around you!","May your smile never fade and your heart never ache!","Wishing you a lifetime of love and laughter!","May every wish in this jar come true for you!"];
function startWishJar(){
    document.getElementById('jar-modal').classList.remove('hidden');
    document.getElementById('wish-display').classList.add('hidden');document.getElementById('jar-container').classList.remove('hidden');
    var jp=document.getElementById('jar-papers');jp.innerHTML='';
    var colors=currentTheme?currentTheme.particleColors:['#FF4081','#9C27B0','#FFD700'];
    for(var i=0;i<20;i++){var p=document.createElement('div');p.className='jar-paper-mini';p.style.background=colors[Math.floor(Math.random()*colors.length)];p.style.setProperty('--rot',(Math.random()*40-20)+'deg');jp.appendChild(p);}
}
function pickWish(){
    document.getElementById('jar-container').classList.add('hidden');document.getElementById('wish-display').classList.remove('hidden');
    document.getElementById('wish-text').textContent=wishes[Math.floor(Math.random()*wishes.length)];
}

// 6. LOVE WHEEL
function getWheelItems(){
    var colors=currentTheme?currentTheme.particleColors.concat([currentTheme.secondary,currentTheme.accent,currentTheme.gold]):['#FF4081','#9C27B0','#FFD700','#E1BEE7','#4FC3F7','#FFD700','#FF7043','#81C784'];
    return [{text:"A Sweet Compliment",color:colors[0]},{text:"A Virtual Hug",color:colors[1]},{text:"A Love Promise",color:colors[2]},{text:"A Special Wish",color:colors[3]},{text:"A Cute Message",color:colors[4]},{text:"A Heart Song",color:colors[5]},{text:"Infinite Love",color:colors[6]},{text:"A Sweet Surprise",color:colors[7]}];
}
var wheelResponses={"A Sweet Compliment":"You are the most beautiful person inside and out!","A Virtual Hug":"Sending you the biggest, warmest hug right now!","A Love Promise":"I promise to love you more every single day.","A Special Wish":"I wish for you to always be happy and surrounded by love!","A Cute Message":"Hey beautiful! You are absolutely amazing!","A Heart Song":"If my love were a song, it'd be the longest symphony!","Infinite Love":"My love for you is infinite, eternal, and grows stronger!","A Sweet Surprise":"Finding you was God's most beautiful gift to me!"};
var wheelAngle=0,wheelSpinning=false;
function startLoveWheel(){document.getElementById('wheel-modal').classList.remove('hidden');document.getElementById('wheel-result').classList.add('hidden');drawWheel();}
function drawWheel(){
    var canvas=document.getElementById('wheel-canvas');if(!canvas)return;
    var ctx=canvas.getContext('2d'),cx=canvas.width/2,cy=canvas.height/2,r=cx-10,items=getWheelItems();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var sa=(2*Math.PI)/items.length;
    items.forEach(function(item,i){
        var start=wheelAngle+sa*i,end=start+sa;
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.closePath();
        ctx.fillStyle=item.color;ctx.globalAlpha=0.8;ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=1;
        ctx.save();ctx.translate(cx,cy);ctx.rotate(start+sa/2);
        ctx.textAlign='right';ctx.fillStyle='#F3E5F5';ctx.font='11px Poppins,sans-serif';ctx.fillText(item.text,r-15,4);ctx.restore();
    });
    ctx.beginPath();ctx.arc(cx,cy,25,0,2*Math.PI);ctx.fillStyle='rgba(16,0,26,0.9)';ctx.fill();
    ctx.strokeStyle=currentTheme?currentTheme.primary:'#E91E63';ctx.lineWidth=3;ctx.stroke();
    // Heart in center
    ctx.fillStyle=currentTheme?currentTheme.accent:'#FF4081';
    ctx.beginPath();var hx=cx,hy=cy;ctx.moveTo(hx,hy+4);ctx.bezierCurveTo(hx,hy,hx-8,hy-2,hx-8,hy+4);ctx.bezierCurveTo(hx-8,hy+10,hx,hy+14,hx,hy+14);ctx.bezierCurveTo(hx,hy+14,hx+8,hy+10,hx+8,hy+4);ctx.bezierCurveTo(hx+8,hy-2,hx,hy,hx,hy+4);ctx.fill();
}
function spinWheel(){
    if(wheelSpinning)return;wheelSpinning=true;
    document.getElementById('spin-btn').disabled=true;document.getElementById('wheel-result').classList.add('hidden');
    var items=getWheelItems(),totalSpin=Math.PI*2*(5+Math.random()*5),duration=4000,startAngle=wheelAngle,startTime=Date.now();
    function anim(){
        var elapsed=Date.now()-startTime,progress=Math.min(elapsed/duration,1),eased=1-Math.pow(1-progress,3);
        wheelAngle=startAngle+totalSpin*eased;drawWheel();
        if(progress<1){requestAnimationFrame(anim);}
        else{
            wheelSpinning=false;document.getElementById('spin-btn').disabled=false;
            var sa=(2*Math.PI)/items.length,norm=((2*Math.PI)-(wheelAngle%(2*Math.PI)))%(2*Math.PI);
            var wi=Math.floor(norm/sa)%items.length,winner=items[wi];
            var rd=document.getElementById('wheel-result');rd.classList.remove('hidden');
            rd.innerHTML='<p><strong>'+winner.text+'</strong></p><p style="margin-top:10px;">'+(wheelResponses[winner.text]||'')+'</p>';
        }
    }
    anim();
}
