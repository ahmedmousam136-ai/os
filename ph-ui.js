/* AuraScale pharmacy UI (new design) - built from the approved demo, wired to live data */
(function(){
'use strict';
var CSS=":host{--primary:#0A6B4B;--primary-2:#1BB880;--mint:#7CE6BC;--on-primary:#fff;--gold:#C9A14A;--on-gold:#1B1405;\n--bg:#F5F6F1;--surface:#FFFFFE;--surface-2:#F1F2EC;--surface-3:#E6E8E0;--border:#E2E4DC;--border-strong:#C9CDC1;\n--text:#14201B;--text-2:#3E4C45;--text-3:#68766F;--accent-soft:#E3F4EC;--accent-text:#0A6B4B;\n--ok:#12794F;--ok-bg:#E3F4EC;--warn:#94600B;--warn-bg:#FBF0DA;--danger:#B42318;--danger-bg:#FDECEA;--info:#1F5F95;--info-bg:#E5F0FA;--violet:#5A3AA0;--violet-bg:#EEE8FA;\n--side:#0B3B2D;--side-2:#0F4A39;--side-text:#CFE7DC;--side-3:#8DB7A6;--shadow:0 1px 2px rgba(10,30,20,.06),0 2px 8px rgba(10,30,20,.05);--shadow-lg:0 12px 40px rgba(8,25,18,.18);\n--r:14px;--font:\"Noto Sans Bengali\",\"IBM Plex Sans\",system-ui,sans-serif}\n:host([data-theme=dark]){--bg:#0D1412;--surface:#141E1A;--surface-2:#1A2622;--surface-3:#233330;--border:#25342F;--border-strong:#36483F;--text:#E7F0EB;--text-2:#BCCDC4;--text-3:#8DA299;\n--accent-soft:#163A2D;--accent-text:#7CE6BC;--ok:#6FD6A5;--ok-bg:#163A2D;--warn:#F0C26E;--warn-bg:#3A2E14;--danger:#FF9A8F;--danger-bg:#401C19;--info:#9CC9EE;--info-bg:#16304A;--violet:#C9B8F2;--violet-bg:#2A2145;\n--side:#08201A;--side-2:#0D2D23;--primary:#1BB880;--on-primary:#06231A;--shadow:none}\n*{box-sizing:border-box}\n:host,:host{margin:0}\n:host{font-family:var(--font);background:var(--bg);color:var(--text);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}\nbutton,input,select,textarea{font:inherit;color:inherit}\nbutton{cursor:pointer}\n.latin{font-family:\"IBM Plex Sans\",var(--font)}\n.vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n:focus-visible{outline:3px solid var(--primary-2);outline-offset:2px}\n.ic{width:20px;height:20px;flex:none;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n.app{display:grid;grid-template-columns:264px minmax(0,1fr);min-height:100vh}\n.side{background:var(--side);color:var(--side-text);position:sticky;top:0;height:100vh;display:flex;flex-direction:column;padding:16px 14px;overflow:auto}\n.brand{display:flex;gap:10px;align-items:center;padding:2px 6px 16px}\n.logo{width:40px;height:40px;border-radius:12px;background:var(--primary-2);display:grid;place-items:center;flex:none}\n.logo i{width:14px;height:14px;border-radius:50%;border:3.5px solid #fff;display:block}\n.wm b{display:block;font-family:\"IBM Plex Sans\";font-size:20px;color:#fff;line-height:1.1}\n.wm b span{color:var(--mint)}\n.wm small{font-size:12px;color:var(--side-3)}\n.cta{display:flex;align-items:center;justify-content:center;gap:8px;min-height:52px;border-radius:12px;border:0;background:var(--gold);color:var(--on-gold);font-weight:700;font-size:15.5px;margin-bottom:14px;box-shadow:0 2px 0 rgba(0,0,0,.15)}\n.cta:hover{filter:brightness(1.05)}\n.nav{display:flex;flex-direction:column;gap:3px}\n.nav .sec{font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--side-3);margin:12px 10px 4px;text-transform:uppercase}\n.ni{display:flex;align-items:center;gap:12px;min-height:46px;padding:0 12px;border-radius:10px;border:0;background:none;color:var(--side-text);text-align:left;font-size:15px;font-weight:500;width:100%}\n.ni:hover{background:var(--side-2);color:#fff}\n.ni .bd{margin-left:auto;background:#E5484D;color:#fff;border-radius:99px;font-size:11.5px;font-weight:700;min-width:22px;height:22px;display:grid;place-items:center;padding:0 6px}\n.ni.on,.ni.on:hover{background:var(--gold);color:var(--on-gold);font-weight:700}\n.ni.on .bd{background:var(--on-gold);color:var(--gold)}\n.sidefoot{margin-top:auto;padding-top:14px}\n.me{display:flex;gap:10px;align-items:center;padding:10px;border-radius:12px;background:var(--side-2)}\n.me b{display:block;color:#fff;font-size:14px}\n.me small{font-size:12px;color:var(--side-3)}\n.note{font-size:11.5px;color:var(--side-3);margin:10px 6px 0;line-height:1.45}\n.av{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:700;flex:none;background:var(--accent-soft);color:var(--accent-text);font-size:15px}\n.av.c1{background:#FCE7C8;color:#7A4A10}\n.av.c2{background:#E5F0FA;color:#1F5F95}\n.av.c3{background:#FCE7EF;color:#9B2453}\n.av.c4{background:#EEE8FA;color:#5A3AA0}\n.av.c5{background:#E3F4EC;color:#0A6B4B}\n:host([data-theme=dark]) .av{filter:saturate(.8) brightness(.9)}\n.main{min-width:0;display:flex;flex-direction:column}\n.bar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:12px 28px;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}\n.bar .ctx b{display:block;font-size:15.5px}\n.bar .ctx span{font-size:12.5px;color:var(--text-3)}\n.roles{display:flex;gap:4px;padding:4px;border-radius:12px;background:var(--surface-2);border:1px solid var(--border);margin:0 auto}\n.roles button{display:flex;gap:6px;align-items:center;min-height:40px;padding:0 14px;border:0;border-radius:9px;background:none;font-size:14px;font-weight:600;color:var(--text-2)}\n.roles button[aria-pressed=true]{background:var(--surface);color:var(--accent-text);box-shadow:var(--shadow)}\n.ibtn{width:44px;height:44px;border-radius:11px;border:1px solid var(--border);background:var(--surface);display:grid;place-items:center;color:var(--text-2);position:relative;font-weight:700;font-size:14px}\n.ibtn .dot{position:absolute;top:-5px;right:-5px;min-width:20px;height:20px;padding:0 5px;border-radius:99px;background:#E5484D;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;border:2px solid var(--bg)}\n.content{padding:24px 28px 110px;max-width:1400px;width:100%}\n.ph{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;padding-bottom:16px;margin-bottom:18px;border-bottom:1px solid var(--border)}\n.ph h1{font-size:26px;margin:0;line-height:1.25}\n.ph p{margin:4px 0 0;color:var(--text-3);font-size:14.5px}\n.acts{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\n.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow)}\n.card.pad{padding:18px}\n.flush{overflow:hidden}\n.ch{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--border)}\n.ch h2{font-size:16.5px;margin:0}\n.ch span{font-size:13px;color:var(--text-3)}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 16px;border-radius:11px;border:1.5px solid transparent;font-weight:600;font-size:14.5px;background:none;white-space:nowrap;text-decoration:none;color:inherit}\n.btn-p{background:var(--primary);color:var(--on-primary)}\n.btn-p:hover{filter:brightness(1.08)}\n.btn-s{background:var(--surface);border-color:var(--border-strong)}\n.btn-s:hover{background:var(--surface-2)}\n.btn-g{color:var(--accent-text)}\n.btn-g:hover{background:var(--accent-soft)}\n.btn-sm{min-height:38px;padding:0 12px;font-size:13.5px;border-radius:9px}\n.btn-lg{min-height:52px;font-size:16px}\n.btn-b{width:100%}\n.grow{flex:1}\n.btn-wa{background:#128C4A;color:#fff}\n.btn:disabled{opacity:.5;cursor:not-allowed}\n.st{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:99px;font-size:12.5px;font-weight:600;white-space:nowrap}\n.st::before{content:\"\";width:7px;height:7px;border-radius:2px;background:currentColor}\n.s-ok{background:var(--ok-bg);color:var(--ok)}\n.s-warn{background:var(--warn-bg);color:var(--warn)}\n.s-bad{background:var(--danger-bg);color:var(--danger)}\n.s-info{background:var(--info-bg);color:var(--info)}\n.s-vio{background:var(--violet-bg);color:var(--violet)}\n.s-dim{background:var(--surface-3);color:var(--text-2)}\n.input{width:100%;min-height:50px;padding:0 14px;border-radius:11px;border:1.5px solid var(--border-strong);background:var(--surface);font-size:15.5px}\n.input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--primary-2) 30%,transparent)}\n.input.bad{border-color:var(--danger)}\ntextarea.input{padding:12px 14px;min-height:80px;resize:vertical}\n.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}\n.field>label,.lab{font-size:13.5px;font-weight:600;color:var(--text-2)}\n.err{color:var(--danger);font-size:13px;margin:4px 0 0;display:flex;gap:6px;align-items:center}\n.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}\n.chips{display:flex;gap:6px;flex-wrap:wrap}\n.chip{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 14px;border-radius:99px;border:1.5px solid var(--border-strong);background:var(--surface);font-size:14px;font-weight:500}\n.chip[aria-pressed=true]{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.chip .n{font-size:12px;opacity:.8}\n.seg{display:inline-flex;padding:4px;border-radius:12px;background:var(--surface-3);gap:4px}\n.seg button{min-height:40px;padding:0 14px;border:0;border-radius:9px;background:none;font-weight:600;color:var(--text-2)}\n.seg button[aria-pressed=true]{background:var(--surface);color:var(--accent-text);box-shadow:var(--shadow)}\n.search{position:relative;display:flex;align-items:center;flex:1;min-width:220px;max-width:460px}\n.search .ic{position:absolute;left:14px;color:var(--text-3)}\n.search .input{padding-left:44px}\n.toolbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px}\n.mut{color:var(--text-3)}\n.due{color:var(--danger)}\n.okc{color:var(--ok)}\n.empty{padding:40px 16px;text-align:center;color:var(--text-3)}\n.empty .ic{width:38px;height:38px;margin-bottom:8px;color:var(--border-strong)}\n.eyebrow{font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--text-3)}\n.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}\n.kpi{display:flex;gap:14px;padding:18px}\n.kpi .ki{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-text);flex:none}\n.kpi span{display:block;font-size:13.5px;color:var(--text-3)}\n.kpi b{display:block;font-size:28px;line-height:1.2;font-weight:800}\n.kpi small{font-size:12.5px;color:var(--text-3)}\n.kpi.w .ki{background:var(--warn-bg);color:var(--warn)}\n.kpi.b .ki{background:var(--danger-bg);color:var(--danger)}\n.kpi.i .ki{background:var(--info-bg);color:var(--info)}\n.pipe{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;margin-bottom:18px;overflow:hidden}\n.pst{position:relative;padding:16px 18px;border:0;background:none;text-align:left;border-right:1px solid var(--border)}\n.pst:last-child{border-right:0}\n.pst:hover{background:var(--surface-2)}\n.pst b{display:block;font-size:30px;font-weight:800;line-height:1.1}\n.pst span{font-size:13px;color:var(--text-2);font-weight:600}\n.pst small{display:block;font-size:12px;color:var(--text-3)}\n.pst i{position:absolute;left:0;right:0;top:0;height:4px}\n.g2{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;margin-bottom:18px}\n.li{display:flex;align-items:center;gap:12px;padding:12px 18px;border-top:1px solid var(--border)}\n.ch+.li,.li:first-child{border-top:0}\n.li .tt{flex:1;min-width:0}\n.li b{display:block;font-weight:600;font-size:14.5px}\n.li .tt>span{display:block;font-size:12.5px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.amt{font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}\n.bars{display:flex;flex-direction:column;gap:12px;padding:16px 18px}\n.bars .r{display:flex;justify-content:space-between;font-size:14px}\n.bars .tr{height:9px;border-radius:99px;background:var(--surface-3);overflow:hidden;margin-top:5px}\n.bars .tr i{display:block;height:100%;border-radius:99px;background:var(--primary-2)}\n.wl{display:grid;grid-template-columns:150px minmax(0,1.5fr) minmax(0,1.6fr) 140px 130px auto;gap:12px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}\n.wl.h{border-top:0;background:var(--surface-2);font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.04em}\n.wl .pt{display:flex;gap:10px;align-items:center;min-width:0}\n.wl .pt b{display:block;font-weight:600}\n.wl .pt small{font-size:12.5px;color:var(--text-3)}\n.tg{display:inline-flex;font-size:12px;font-weight:600;padding:3px 8px;border-radius:6px;background:var(--surface-2);border:1px solid var(--border);margin:2px 4px 2px 0}\n.sid{font-family:\"IBM Plex Sans\";font-weight:600;font-size:13.5px}\n.sid small{display:block;font-weight:500;color:var(--text-3);font-size:12px}\n.tat{font-size:13px}\n.tat.late{color:var(--danger);font-weight:700}\n.wl .a{display:flex;gap:6px;justify-content:flex-end}\n.wl .lm{display:none}\n.scrim{position:fixed;inset:0;background:rgba(4,14,10,.5);z-index:60;display:none}\n.scrim.on{display:block}\n.modal{position:fixed;z-index:61;left:50%;top:50%;transform:translate(-50%,-50%);width:min(640px,calc(100vw - 32px));max-height:calc(100vh - 40px);display:none;flex-direction:column;background:var(--surface);border-radius:18px;box-shadow:var(--shadow-lg)}\n.modal.on{display:flex}\n.modal.wide{width:min(980px,calc(100vw - 32px))}\n.mh{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:18px 22px;border-bottom:1px solid var(--border)}\n.mh h2{margin:0;font-size:19px}\n.mh p{margin:3px 0 0;font-size:13.5px;color:var(--text-3)}\n.mb{padding:18px 22px;overflow:auto}\n.mf{display:flex;gap:10px;padding:14px 22px;border-top:1px solid var(--border)}\n.steps{display:flex;gap:6px;padding:12px 22px 0}\n.steps span{flex:1;height:5px;border-radius:99px;background:var(--surface-3)}\n.steps span.on{background:var(--primary-2)}\n.tpick{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:16px}\n.tl{max-height:360px;overflow:auto;border:1px solid var(--border);border-radius:12px}\n.trow{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:0;border-top:1px solid var(--border);background:var(--surface);text-align:left}\n.trow:first-child{border-top:0}\n.trow:hover{background:var(--surface-2)}\n.trow b{display:block;font-weight:600;font-size:14.5px}\n.trow small{font-size:12px;color:var(--text-3)}\n.trow .tt{flex:1;min-width:0}\n.ck{width:24px;height:24px;border-radius:7px;border:2px solid var(--border-strong);display:grid;place-items:center;flex:none;color:transparent}\n.trow[aria-pressed=true]{background:var(--accent-soft)}\n.trow[aria-pressed=true] .ck{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}\n.cart{border:1px solid var(--border);border-radius:12px;background:var(--surface-2);padding:12px;display:flex;flex-direction:column;gap:6px}\n.cart .r{display:flex;justify-content:space-between;gap:8px;font-size:14px}\n.cart .tot{border-top:1px dashed var(--border-strong);padding-top:8px;font-weight:800;font-size:17px}\n.pkg{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}\n.pm{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.pm button{min-height:56px;border-radius:12px;border:1.5px solid var(--border-strong);background:var(--surface);font-weight:600;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}\n.pm button[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);color:var(--accent-text)}\n.tgl{width:50px;height:30px;border-radius:99px;border:0;background:var(--surface-3);position:relative;padding:0;flex:none}\n.tgl i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .18s}\n.tgl[aria-checked=true]{background:var(--primary)}\n.tgl[aria-checked=true] i{transform:translateX(20px)}\n.tgrow{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:var(--surface-2);margin-bottom:12px;font-weight:600}\n.labels{display:flex;gap:10px;flex-wrap:wrap}\n.lbl{width:220px;border:1px dashed var(--border-strong);border-radius:8px;padding:8px 10px;background:#fff;color:#111;font-family:\"IBM Plex Sans\";font-size:11px}\n.lbl b{font-size:12px}\n.lbl svg{display:block;margin:4px 0}\n.okbig{text-align:center;padding:6px 0 10px}\n.okbig .c{width:72px;height:72px;border-radius:50%;background:var(--ok-bg);color:var(--ok);display:grid;place-items:center;margin:0 auto 8px}\n.okbig .c .ic{width:36px;height:36px}\n.okbig h3{margin:0;font-size:20px}\n.res{display:grid;grid-template-columns:minmax(0,1.6fr) 140px 110px minmax(0,1fr) 90px;gap:10px;align-items:center;padding:9px 0;border-bottom:1px dashed var(--border)}\n.res.h{font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;border-bottom:1px solid var(--border)}\n.res .input{min-height:44px}\n.res b{font-weight:600}\n.flag{font-weight:800;font-size:13px}\n.flag.H{color:var(--danger)}\n.flag.L{color:var(--info)}\n.flag.N{color:var(--ok)}\n.rtest{margin-bottom:18px}\n.rtest h3{font-size:15.5px;margin:0 0 4px;display:flex;gap:8px;align-items:center}\n.rpv{border:1px solid var(--border);border-radius:12px;overflow:hidden;background:#eee}\n.rpv iframe{width:100%;height:620px;border:0;display:block;background:#fff}\n.rowx{display:grid;grid-template-columns:minmax(0,2fr) 110px 120px 110px 120px;gap:12px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}\n.rowx.h{border-top:0;background:var(--surface-2);font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase}\n.rowx .r{text-align:right}\n.rowx b{font-weight:600}\n.pin{display:flex;align-items:center;gap:6px}\n.pin .input{min-height:40px;width:110px;text-align:right}\n.home{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}\n.hc{padding:16px;display:flex;flex-direction:column;gap:10px}\n.hc .top{display:flex;gap:12px;align-items:flex-start}\n.hc .top b{display:block;font-size:15.5px}\n.hc .top span{font-size:13px;color:var(--text-3)}\n.hc .slot{font-size:22px;font-weight:800;color:var(--accent-text)}\n.hc select{min-height:44px}\n.infonote{display:flex;gap:8px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:var(--info-bg);color:var(--info);font-size:13.5px;line-height:1.5;margin-bottom:14px}\n.toasts{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:90;display:flex;flex-direction:column;gap:8px;width:min(560px,calc(100vw - 24px))}\n.toast{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:#0F1D18;color:#fff;box-shadow:var(--shadow-lg);font-size:14.5px;animation:up .2s ease}\n.toast .i{width:30px;height:30px;border-radius:8px;background:#1BB880;display:grid;place-items:center;flex:none}\n.toast .ic{width:18px;height:18px}\n.toast span{flex:1}\n.toast button{border:0;background:none;color:var(--mint);font-weight:700}\n@keyframes up{from{transform:translateY(8px);opacity:0}}\n.bnav{display:none}\n.mbar{display:none}\n@media (max-width:1100px){.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}\n.pipe{grid-template-columns:repeat(3,minmax(0,1fr))}\n.pst:nth-child(3){border-right:0}\n.pst:nth-child(-n+3){border-bottom:1px solid var(--border)}\n.g2{grid-template-columns:minmax(0,1fr)}\n.wl.h{display:none}\n.wl{grid-template-columns:minmax(0,1fr) auto;gap:8px 12px}\n.wl .pt{grid-column:1/-1}\n.wl .lm{display:inline;font-size:12px;color:var(--text-3);margin-right:6px}\n.wl>.tests{grid-column:1/-1}\n.wl .a{grid-column:1/-1;justify-content:stretch}\n.wl .a .btn{flex:1}\n.rowx.h{display:none}\n.rowx{grid-template-columns:repeat(2,minmax(0,1fr))}\n.rowx>:first-child{grid-column:1/-1}\n.rowx .r{text-align:left}}\n@media (max-width:900px){.app{grid-template-columns:minmax(0,1fr)}\n.side{display:none}\n.bar{padding:10px 14px;flex-wrap:wrap}\n.bar .ctx{display:none}\n.roles{order:3;width:100%;margin:0;overflow-x:auto}\n.roles button{flex:1;padding:0 8px;font-size:13px}\n.roles button svg{display:none}\n.mbar{display:flex;align-items:center;gap:10px;margin-right:auto}\n.mbar b{font-family:\"IBM Plex Sans\";font-size:18px}\n.mbar b span{color:var(--primary-2)}\n.content{padding:16px 14px 120px}\n.ph h1{font-size:22px}\n.bnav{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--surface);border-top:1px solid var(--border);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}\n.bn{display:flex;flex-direction:column;align-items:center;gap:2px;border:0;background:none;font-size:11.5px;font-weight:600;color:var(--text-3);min-height:56px;justify-content:center;position:relative}\n.bn.on{color:var(--accent-text)}\n.bn.on .pp{background:var(--accent-soft)}\n.bn .pp{width:44px;height:30px;border-radius:99px;display:grid;place-items:center}\n.bn.fab .pp{width:54px;height:54px;border-radius:16px;background:var(--gold);color:var(--on-gold);margin-top:-22px;box-shadow:var(--shadow-lg)}\n.row2,.row3,.tpick{grid-template-columns:minmax(0,1fr)}\n.res{grid-template-columns:minmax(0,1fr) 110px 60px}\n.res .rr,.res.h{display:none}\n.modal{top:auto;bottom:0;transform:translateX(-50%);width:100%;border-radius:20px 20px 0 0;max-height:94vh}\n.modal.wide{width:100%}\n.mf{flex-wrap:wrap}}\n@media (max-width:520px){.kpi{padding:14px 12px;gap:10px}\n.kpi .ki{display:none}\n.kpi b{font-size:22px}\n.pipe{grid-template-columns:repeat(2,minmax(0,1fr))}\n.pst{border-right:1px solid var(--border)!important;border-bottom:1px solid var(--border)}\n.pm{grid-template-columns:1fr 1fr 1fr}}\n.sheet{position:fixed;inset:0;z-index:70;display:none}\n.sheet.on{display:block}\n.sheet .sc{position:absolute;inset:0;background:rgba(4,14,10,.5)}\n.sheet .sp{position:absolute;left:0;right:0;bottom:0;background:var(--surface);border-radius:20px 20px 0 0;padding:16px}\n.sheet .g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}\n.sheet .g button{min-height:92px;border-radius:14px;border:1px solid var(--border);background:var(--surface-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:13.5px}\n@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}\n.pos{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:18px;align-items:start}\n.sum{position:sticky;top:84px;padding:18px;display:flex;flex-direction:column;gap:12px}\n.sum .r{display:flex;justify-content:space-between;gap:10px;font-size:14.5px}\n.sum .r span:last-child{font-variant-numeric:tabular-nums;font-weight:600}\n.sum .r.s{font-size:13px;color:var(--text-3)}\n.sum .big{font-size:24px;font-weight:800;border-top:1px dashed var(--border-strong);padding-top:10px}\n.sum .big span:last-child{font-weight:800}\n.sum .tiny{font-size:12.5px;color:var(--text-3)}\n.pay4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}\n.pay4 button{min-height:48px;border-radius:11px;border:1.5px solid var(--border-strong);background:var(--surface);font-weight:600;font-size:14px}\n.pay4 button[aria-pressed=true]{border-color:var(--primary);background:var(--accent-soft);color:var(--accent-text)}\n.ddw{position:relative}\n.dd{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:40;background:var(--surface);border:1px solid var(--border-strong);border-radius:12px;box-shadow:var(--shadow-lg);max-height:380px;overflow:auto}\n.dd .it{display:flex;gap:10px;align-items:center;width:100%;padding:11px 14px;border:0;border-top:1px solid var(--border);background:none;text-align:left;font-size:14.5px}\n.dd .it:first-child{border-top:0}\n.dd .it.hl,.dd .it:hover{background:var(--accent-soft)}\n.dd .it .tt{flex:1;min-width:0}\n.dd .it b{display:block;font-weight:600}\n.dd .it small{display:block;font-size:12.5px;color:var(--text-3)}\n.dd .hd{padding:8px 14px;font-size:12px;color:var(--text-3);font-weight:600}\n.cartl{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr) 150px 90px 100px 44px;gap:10px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}\n.cartl.h{border-top:0;background:var(--surface-2);font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase}\n.cartl b{font-weight:600}\n.cartl small{display:block;font-size:12px;color:var(--text-3)}\n.cartl .r{text-align:right}\n.stp{display:flex;align-items:center;border:1.5px solid var(--border-strong);border-radius:11px;overflow:hidden;background:var(--surface);width:max-content}\n.stp button{width:40px;height:44px;border:0;background:var(--surface-2);font-size:20px;font-weight:700;color:var(--accent-text)}\n.stp input{width:56px;height:44px;border:0;text-align:center;font-weight:700;font-size:16px;background:none}\n.stp input:focus{outline:none;background:var(--accent-soft)}\n.mini{font-size:12px;color:var(--text-3)}\n.mini b{color:var(--text-2)}\n.box-w{padding:14px 16px;border-radius:12px;border:1.5px solid var(--warn);background:var(--warn-bg);margin-bottom:14px}\n.box-w>b{color:var(--warn);display:flex;gap:8px;align-items:center;margin-bottom:8px}\n.box-r{padding:12px 14px;border-radius:12px;border:1.5px solid var(--danger);background:var(--danger-bg);color:var(--danger);font-size:13.5px;margin:10px 0}\n.box-g{padding:12px 14px;border-radius:12px;background:var(--ok-bg);color:var(--ok);font-size:13.5px;margin:10px 0;font-weight:600}\n.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:16px}\n.tile{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:16px;border-radius:14px;border:1.5px solid var(--border);background:var(--surface);text-align:left;min-height:112px}\n.tile:hover{border-color:var(--primary-2);background:var(--accent-soft)}\n.tile .ti{width:42px;height:42px;border-radius:11px;background:var(--accent-soft);color:var(--accent-text);display:grid;place-items:center}\n.tile b{font-size:15px}\n.tile small{font-size:12.5px;color:var(--text-3)}\n.drop{border:2px dashed var(--border-strong);border-radius:14px;padding:22px;text-align:center;color:var(--text-3);background:var(--surface);margin-bottom:16px}\n.drop.on{border-color:var(--primary-2);background:var(--accent-soft);color:var(--accent-text)}\n.drop b{color:var(--text)}\n.gt{display:grid;grid-template-columns:var(--cols);gap:12px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}\n.gt.h{border-top:0;background:var(--surface-2);font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.03em}\n.gt b{font-weight:600}\n.gt small{display:block;font-size:12.5px;color:var(--text-3)}\n.gt .r{text-align:right}\n.gt .acts{justify-content:flex-end}\n.gt.click{cursor:pointer}\n.gt.click:hover{background:var(--surface-2)}\n.gt.sel{background:var(--accent-soft)}\n.tag{display:inline-flex;align-items:center;height:24px;padding:0 8px;border-radius:7px;font-size:12px;font-weight:700;margin:2px 4px 2px 0;white-space:nowrap}\n.t-r{background:var(--danger-bg);color:var(--danger)}\n.t-a{background:var(--warn-bg);color:var(--warn)}\n.t-g{background:var(--ok-bg);color:var(--ok)}\n.t-b{background:var(--info-bg);color:var(--info)}\n.t-d{background:var(--surface-3);color:var(--text-2)}\n.scanw{overflow-x:auto;border:1px solid var(--border);border-radius:12px}\n.scan{border-collapse:collapse;min-width:1120px;width:100%;font-size:13.5px}\n.scan th{background:var(--surface-2);font-size:11.5px;text-transform:uppercase;color:var(--text-3);text-align:left;padding:8px;white-space:nowrap}\n.scan td{padding:8px;border-top:1px solid var(--border);vertical-align:top}\n.scan .input{min-height:40px;font-size:14px;padding:0 8px}\n.scan .input.bad{border-color:var(--danger);background:var(--danger-bg)}\n.scan select.input{padding:0 4px}\n.hand{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}\ndetails.card>summary{cursor:pointer;padding:16px 18px;font-weight:700;list-style:none;display:flex;gap:10px;align-items:center}\ndetails.card>summary::-webkit-details-marker{display:none}\ndetails.card[open]>summary{border-bottom:1px solid var(--border)}\n.sup{margin-bottom:16px}\n.sup .ch b{font-size:16px}\n.docs{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}\n.doc{padding:14px;display:flex;flex-direction:column;gap:8px}\n.doc .th{height:120px;border-radius:10px;background:repeating-linear-gradient(0deg,var(--surface-2) 0 14px,var(--surface) 14px 15px);border:1px solid var(--border);display:grid;place-items:center;color:var(--text-3);overflow:hidden}\n.doc .th img{width:100%;height:100%;object-fit:cover}\n.help details{border-top:1px solid var(--border)}\n.help details:first-child{border-top:0}\n.help summary{cursor:pointer;padding:16px 18px;font-weight:600;display:flex;gap:12px;align-items:center;list-style:none;min-height:56px}\n.help summary::-webkit-details-marker{display:none}\n.help summary .n{width:30px;height:30px;border-radius:9px;background:var(--accent-soft);color:var(--accent-text);display:grid;place-items:center;font-weight:800;flex:none;font-size:14px}\n.help ol{margin:0;padding:0 22px 18px 64px;color:var(--text-2);line-height:1.75}\n.sigp{border:1px dashed var(--border-strong);border-radius:12px;padding:14px;background:#fff;display:flex;justify-content:flex-end;color:#14201b}\n.toast.warn .i{background:#E0A43B}\n.ok-anim .c{animation:pop .35s ease}\n@keyframes pop{0%{transform:scale(.6)}70%{transform:scale(1.1)}}\n.stkline{font-size:12.5px;color:var(--text-3)}\n.stkline b{color:var(--text)}\n.dname{display:flex;flex-direction:column;min-width:0}\n.sk{background:linear-gradient(90deg,var(--surface-2),var(--surface-3),var(--surface-2));background-size:200% 100%;animation:sh 1.1s linear infinite;border-radius:8px;height:16px;margin:8px 0}\n@keyframes sh{to{background-position:-200% 0}}\n@media (max-width:1180px){.pos{grid-template-columns:minmax(0,1fr)}\n.sum{position:static}\n.tiles{grid-template-columns:repeat(2,minmax(0,1fr))}\n.hand{grid-template-columns:repeat(2,minmax(0,1fr))}\n.gt.h{display:none}\n.gt{grid-template-columns:minmax(0,1fr) auto!important;gap:6px 12px}\n.gt>*{grid-column:auto}\n.gt>.full{grid-column:1/-1}\n.gt .r{text-align:left}\n.gt .acts{grid-column:1/-1;justify-content:flex-start}\n.gt .lm{display:inline;font-size:12px;color:var(--text-3);margin-right:4px}\n.cartl.h{display:none}\n.cartl{grid-template-columns:minmax(0,1fr) auto;gap:8px 12px}\n.cartl .bt{grid-column:1/-1}\n.cartl .r{text-align:left}}\n.gt .lm{display:none}\n@media (max-width:520px){.hand{grid-template-columns:minmax(0,1fr)}\n.pay4{grid-template-columns:repeat(2,1fr)}\n.tiles{gap:8px}\n.tile{padding:12px;min-height:100px}}";
var SKEL="\n<div class=\"app\">\n  <aside class=\"side\" id=\"side\"></aside>\n  <div class=\"main\">\n    <header class=\"bar\" id=\"bar\"></header>\n    <main class=\"content\" id=\"view\" tabindex=\"-1\"></main>\n  </div>\n</div>\n<nav class=\"bnav\" id=\"bnav\" aria-label=\"\u09ae\u09c7\u09a8\u09c1\"></nav>\n<div class=\"scrim\" id=\"scrim\" data-act=\"close\"></div>\n<div class=\"modal\" id=\"modal\" role=\"dialog\" aria-modal=\"true\"></div>\n<div class=\"sheet\" id=\"sheet\"></div>\n<div class=\"toasts\" id=\"toasts\" aria-live=\"polite\"></div>\n<input type=\"file\" id=\"fPhoto\" class=\"vh\" accept=\"image/*\" multiple>\n<input type=\"file\" id=\"fPdf\" class=\"vh\" accept=\"application/pdf\">\n<input type=\"file\" id=\"fSheet\" class=\"vh\" accept=\".csv,.xlsx\">\n<input type=\"file\" id=\"fSign\" class=\"vh\" accept=\"image/png,image/jpeg\">\n<input type=\"file\" id=\"fDoc\" class=\"vh\" accept=\"image/*,application/pdf\">\n<iframe id=\"pf\" title=\"print\" style=\"position:fixed;width:0;height:0;border:0;right:0;bottom:0\"></iframe>\n";
var AuraPH = window.AuraPH = window.AuraPH || {};
AuraPH.mounted = false;
(function () {
  if (document.getElementById('aura-ph-page-css')) return;
  var st = document.createElement('style'); st.id = 'aura-ph-page-css';
  st.textContent = 'body.aura-ph-on #app,body.aura-ph-on #loading{display:none!important}'
    + 'body.aura-ph-on{background:#f6f7f5;overflow:visible!important;overflow-x:clip!important;height:auto!important;min-height:100vh}'
    + 'html[data-theme=dark] body.aura-ph-on{background:#0c1511}'
    + '#aura-ph{display:block}'
    + 'body.aura-ph-on #nh-toast{z-index:100002!important}'
    + 'body.aura-ph-on .low-pop{display:none!important}'
    + 'body.aura-ph-on .modal-bg,body.aura-ph-on .ap-ov,body.aura-ph-on .adv{z-index:100001!important}'
    + '.aura-ph-back{position:fixed;right:14px;bottom:84px;z-index:90;border:0;border-radius:999px;padding:11px 16px;font:600 13px/1 system-ui,sans-serif;background:#0b4f3a;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.2);cursor:pointer}'
    + '@media(min-width:900px){.aura-ph-back{bottom:20px}}';
  (document.head || document.documentElement).appendChild(st);
  if (!document.getElementById('aura-ph-fonts')) {
    var l = document.createElement('link'); l.id = 'aura-ph-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }
})();
AuraPH.classic = function () { try { return sessionStorage.getItem('aura-ph-classic') === '1'; } catch (e) { return false; } };
AuraPH.unmount = function (classic) {
  var h = document.getElementById('aura-ph'); if (h) h.remove();
  document.body.classList.remove('aura-ph-on'); document.documentElement.style.overflow = '';
  AuraPH.mounted = false;
  if (classic) {
    try { sessionStorage.setItem('aura-ph-classic', '1'); } catch (e) {}
    try { if (typeof window.initClassic === 'function') window.initClassic(); else if (typeof window.deptStartTab === 'function') window.deptStartTab('pos'); } catch (e) {}
    if (!document.getElementById('aura-ph-back')) {
      var b = document.createElement('button'); b.id = 'aura-ph-back'; b.className = 'aura-ph-back'; b.type = 'button';
      b.textContent = '✨ ' + (((localStorage.getItem('aurascale_lang') || 'bn') === 'bn') ? 'নতুন ডিজাইনে ফিরুন' : 'Back to the new design');
      b.onclick = function () { try { sessionStorage.removeItem('aura-ph-classic'); } catch (e) {} b.remove(); AuraPH.mount(AuraPH.last); };
      document.body.appendChild(b);
    }
  }
};
AuraPH.mount = function (LIVE) {
  if (AuraPH.mounted) return true;
  AuraPH.last = LIVE || AuraPH.last || {};
  var ob = document.getElementById('aura-ph-back'); if (ob) ob.remove();
  if (!AuraPH.toastHooked && typeof window.showToast === 'function') {
    AuraPH.toastHooked = true; var _st = window.showToast;
    window.showToast = function (m) { if (AuraPH.mounted && AuraPH.toast) { try { AuraPH.toast(m); return; } catch (e) {} } return _st.apply(this, arguments); };
  }
  var host = document.createElement('div');
  host.id = 'aura-ph';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });
  var st = document.createElement('style'); st.textContent = CSS; root.appendChild(st);
  var app = document.createElement('div'); app.className = 'aui-root'; app.innerHTML = SKEL; root.appendChild(app);
  var BODY = {
    classList: {
      add: function (c) { host.classList.add(c); }, remove: function (c) { host.classList.remove(c); },
      contains: function (c) { return host.classList.contains(c); }, toggle: function (c, on) { return host.classList.toggle(c, on); }
    },
    insertAdjacentHTML: function (p, h) { app.insertAdjacentHTML(p, h); },
    appendChild: function (e) { return app.appendChild(e); }
  };
  document.body.classList.add('aura-ph-on');
  AuraPH.host = host; AuraPH.root = root;
  AuraPH.mounted = true;
  RUN(root, host, BODY, AuraPH.last);
  /* old windows (subscription, photo viewer) follow the new design's light / dark */
  var syncTh = function () { var th = host.dataset.theme === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', th); };
  new MutationObserver(syncTh).observe(host, { attributes: true, attributeFilter: ['data-theme'] }); syncTh();
  return true;
};

function RUN(ROOT, HOST, BODY, LIVE){

/* ============ AuraScale Pharmacy — prototype (all names, numbers and stock are fictional) ============ */
const S = {lang:'bn', role:'owner', view:'dash', modal:null, stF:'all', stQ:'', blR:1, blQ:'', dcF:'all', gstSel:null, gstOnly:''};
const $ = id => ROOT.getElementById(id);
const B = (b, e) => S.lang === 'bn' ? b : e;
const BND = '০১২৩৪৫৬৭৮৯';
const num = n => S.lang === 'bn' ? String(n).replace(/\d/g, d => BND[d]) : String(n);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const fmtN = (n, d) => new Intl.NumberFormat('en-IN', {minimumFractionDigits:d || 0, maximumFractionDigits:d || 0}).format(n);
const money = n => (n < 0 ? '−' : '') + '₹' + num(fmtN(Math.abs(Math.round(n))));
const money2 = n => (n < 0 ? '−' : '') + '₹' + num(fmtN(Math.abs(n), 2));
const r2 = n => Math.round(n * 100) / 100;
const loc = () => S.lang === 'bn' ? 'bn-IN' : 'en-IN';
const tm = d => d.toLocaleTimeString(loc(), {hour:'numeric', minute:'2-digit'});
const fd = (d, o) => d.toLocaleDateString(loc(), o || {day:'numeric', month:'short'});
const fph = p => p ? '+91 ' + p.slice(0, 5) + ' ' + p.slice(5) : '';
const NOW = new Date(); const DAY = 864e5;
const today0 = () => { const d = new Date(NOW); d.setHours(0, 0, 0, 0); return d; };
const ago = (days, h, m) => { const d = today0(); d.setDate(d.getDate() - days); d.setHours(h, m || 0, 0, 0); return d; };
const ym = off => { const d = new Date(NOW.getFullYear(), NOW.getMonth() + off, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
const expEnd = e => { const [y, m] = e.split('-').map(Number); return new Date(y, m, 0, 23, 59); };
const daysTo = e => Math.floor((expEnd(e) - NOW) / DAY);
const fexp = e => { const [y, m] = e.split('-'); return num(m + '/' + y.slice(2)); };
const isExp = e => daysTo(e) < 0;
const mobOk = p => /^[6-9]\d{9}$/.test(p);
const IC = {
  dash:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  bill:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>', box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6"/>', file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  img:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>', gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01"/>', search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', check:'<path d="m5 12 5 5 9-10"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>', moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', wa:'<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.3A8 8 0 1 1 20 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>', phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  rupee:'<path d="M6 4h12M6 9h12M14 20 7 13h2a4 4 0 0 0 0-9"/>', pill:'<path d="M10.5 20.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7z"/><path d="m8.5 8.5 7 7"/>', users:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
  bed:'<path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="2"/>', walk:'<circle cx="13" cy="4" r="2"/><path d="m9 21 3-7 3 3v5M8 12l2-4 4 1 3 4"/>', repeat:'<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4"/>', camera:'<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/>', sheet:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  csv:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h2M8 17h2M13 13h3M13 17h3"/>', down:'<path d="M12 4v12M6 10l6 6 6-6M4 20h16"/>', edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>', back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-2"/>',
  truck:'<path d="M2 6h12v10H2zM14 10h4l4 4v2h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>', more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>', chev:'<path d="m9 6 6 6-6 6"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  sign:'<path d="M3 17c3-4 5-9 7-9s-1 9 2 9 3-5 5-5 1 4 4 4"/><path d="M3 21h18"/>', shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>', trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', desk:'<path d="M3 10h18M5 10v10M19 10v10M8 6h8v4H8z"/>', key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>'
};
const ic = (n, s) => `<svg class="ic" viewBox="0 0 24 24" ${s ? `style="width:${s}px;height:${s}px"` : ''} aria-hidden="true">${IC[n] || ''}</svg>`;

/* ---------- master data (fictional) ---------- */
const UNITS = {strip:['স্ট্রিপ','strip'], tab:['ট্যাবলেট','tablet'], cap:['ক্যাপসুল','capsule'], bottle:['বোতল','bottle'], tube:['টিউব','tube'], sachet:['স্যাশে','sachet'], pcs:['পিস','piece'], vial:['ভায়াল','vial'], box:['বাক্স','box'], inhaler:['ইনহেলার','inhaler']};
const un = u => UNITS[u] ? UNITS[u][S.lang === 'bn' ? 0 : 1] : u;
const SUPS = [];
let bSeq = 1;
const M = (id, n, c, u, mrp, g, sch, bt, extra) => Object.assign({id, n, c, u, g, sch:sch || '', hsn:'3004', low:0, active:true, batches:bt.map(([b, e, q, sup, mm]) => ({id:'b' + (bSeq++), b, exp:e, mrp:mm || mrp, rate:r2((mm || mrp) * 0.68), q, sup:sup || 's1'}))}, extra || {});
const MEDS = [];
const MAP = {}; MEDS.forEach(m => MAP[m.id] = m);
let LOW = 10;
const bX = b => b.x != null ? b.x : isExp(b.exp);
const stockOf = m => m.batches.filter(b => !bX(b)).reduce((a, b) => a + b.q, 0);
const expQ = m => m.batches.filter(b => bX(b)).reduce((a, b) => a + b.q, 0);
const lowAt = m => m.lowAt > 0 || m.lowAt === 0 ? m.lowAt : (m.low > 0 ? m.low : LOW);
const sell = m => m.batches.filter(b => !bX(b) && b.q > 0).sort((a, b) => a.exp.localeCompare(b.exp));
const nearExp = m => { const s = sell(m); return s.length ? s[0].exp : null; };
const isLow = m => m.active && stockOf(m) <= lowAt(m);
const LV_LASTSUP = {};
const lastSup = m => LV_LASTSUP[m.id] || (m.batches.length ? m.batches[m.batches.length - 1].sup : '_none');
const subsFor = m => MEDS.filter(x => x.id !== m.id && x.active && x.c === m.c && stockOf(x) > 0);
const ADM = [];
const CUST = [];
const DOCTORS = [];
const SET = {name:'', phone:'', addr:'', mode:'none', gstin:'', dl:'', pharm:'', ownerWa:'', report:true, footer:'', sign:'', signer:''};
/* GSTIN check character (standard mod-36 method) */
const GCH = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function gstCheck(s14){ let sum = 0; for (let i = 0; i < 14; i++) { const p = GCH.indexOf(s14[i]) * (i % 2 ? 2 : 1); sum += Math.floor(p / 36) + p % 36; } return GCH[(36 - sum % 36) % 36]; }

function gstinProblem(g){ if (!g) return B('GSTIN লিখুন','Enter the GSTIN'); if (g.length !== 15) return B('GSTIN-এ ১৫টা অক্ষর হয়','A GSTIN has 15 characters'); if (!/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(g)) return B('গঠন ঠিক নয় (যেমন 19ABCDE1234F1Z5)','Format is wrong (e.g. 19ABCDE1234F1Z5)'); if (gstCheck(g.slice(0, 14)) !== g[14]) return B('শেষ অক্ষর মিলছে না — একটা অক্ষর ভুল টাইপ হয়েছে','The last character does not match — one character is mistyped'); return ''; }

/* ---------- sales history (seeded) ---------- */
let SALES = [], sSeq = 1, rnd = 7;
const R = n => { rnd = (rnd * 9301 + 49297) % 233280; return Math.floor(rnd / 233280 * n); };
const billNo = d => 'PH-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(sSeq++).padStart(4, '0');
function mkSale(at, kind, items, o){
  o = o || {}; const lines = [];
  items.forEach(([mid, q]) => { const m = MAP[mid], bt = m.batches[0] || {b:'—', exp:ym(6), mrp:30, rate:20}; lines.push({mid, name:m.n, sch:m.sch, b:bt.b, exp:bt.exp, q, mrp:bt.mrp, rate:bt.rate, g:m.g}); });
  return finish({no:billNo(at), at, kind, lines, discPct:o.disc || 0, pay:o.pay || 'cash', name:o.name || '', ph:o.ph || '', doc:o.doc || '', adm:o.adm || null, h1:o.h1 || null, refill:o.refill || 0, uhid:o.uhid || '', wa:!!o.ph, by:o.by || 'counter', cancelled:o.cancelled || null, paid:o.pay === 'credit' ? (o.paid || 0) : null});
}
function finish(s){
  const reg = s.kind === 'walkin' && SET.mode === 'regular'; let mrp = 0, disc = 0, amt = 0, gst = 0, cost = 0;
  s.lines.forEach(l => { const g = r2(l.q * l.mrp), d = r2(g * (s.kind === 'ipd' ? 0 : s.discPct) / 100), a = r2(g - d); l.disc = d; l.amt = a; l.tax = reg ? r2(a - a * 100 / (100 + l.g)) : 0; l.taxable = r2(a - l.tax); mrp += g; disc += d; amt += a; gst += l.tax; cost += l.q * l.rate; });
  s.mrpT = r2(mrp); s.disc = r2(disc); s.gst = r2(gst); s.cost = r2(cost); s.reg = reg; s.mode = s.kind === 'ipd' ? 'ipd' : SET.mode;
  s.total = s.kind === 'walkin' ? Math.round(amt) : r2(amt); s.round = r2(s.total - amt); return s;
}

const REFILL_DUE = s => s.refillDue || null;
let ORDER = [];
const DOCS = [];
const ACT = [];   /* simple activity list for undo */

/* ---------- roles & nav ---------- */
const ROLES = {owner:{k:['মালিক','Owner'], ic:'key', nav:['dash', 'pos', 'stock', 'receive', 'order', 'bills', 'docs', 'settings', 'help']}, counter:{k:['কাউন্টার','Counter'], ic:'desk', nav:['pos', 'stock', 'receive', 'order', 'bills', 'docs', 'help']}};
const NAV = {dash:['dash', ['আজকের অবস্থা','Today']], pos:['bill', ['বিক্রির কাউন্টার','Sales counter']], stock:['box', ['স্টক','Stock']], receive:['plus', ['স্টক যোগ','Add stock']], order:['cart', ['অর্ডার তালিকা','Re-order']], bills:['file', ['বিল ও বিক্রি','Bills & sales']], docs:['img', ['ছবি ও কাগজ','Photos & papers']], settings:['gear', ['সেটিংস','Settings']], help:['help', ['সাহায্য','Help']]};
const isOwner = () => S.role === 'owner';
function badge(v){ if (v === 'stock') return MEDS.filter(m => isLow(m) || expQ(m) > 0).length; if (v === 'order') return ORDER.filter(o => o.st === 'list').length; return 0; }
function renderSide(){
  const R0 = ROLES[S.role];
  $('side').innerHTML = `<div class="brand"><span class="logo"><i></i></span><div class="wm"><b>Aura<span>Scale</span></b><small>${B('ফার্মেসি','Pharmacy')}</small></div></div>
  <button class="cta" data-act="newBill">${ic('plus')}${B('নতুন বিল','New bill')}</button>
  <nav class="nav" aria-label="menu">${R0.nav.map(v => { const b = badge(v); return `<button class="ni ${S.view === v ? 'on' : ''}" data-act="go" data-v="${v}" ${S.view === v ? 'aria-current="page"' : ''}>${ic(NAV[v][0])}<span>${NAV[v][1][S.lang === 'bn' ? 0 : 1]}</span>${b ? `<span class="bd">${num(b)}</span>` : ''}</button>`; }).join('')}</nav>
  <div class="sidefoot"><button class="me" data-act="menu" style="width:100%;border:0;background:none;text-align:left;cursor:pointer;padding:0;font:inherit;color:inherit"><span class="av c5">${esc(Array.from(LV.name || '?')[0] || '?')}</span><div style="min-width:0"><b>${esc(LV.name || '')}</b><small>${ROLES[S.role].k[S.lang === 'bn' ? 0 : 1]} · ${esc(SET.name || '')}</small></div></button></div>`;
}
function alerts(){ const low = MEDS.filter(isLow), ex = MEDS.filter(m => expQ(m) > 0), e90 = MEDS.filter(m => { const e = nearExp(m); return e && daysTo(e) <= 90; }), cred = SALES.filter(s => !s.cancelled && s.pay === 'credit' && s.total - (s.paid || 0) > 0), rf = SALES.filter(s => { const d = REFILL_DUE(s); return d && !s.cancelled && Math.abs(d - NOW) < 2 * DAY && !s.reminded; }); return {low, ex, e90, cred, rf}; }
function renderBar(){
  const dark = HOST.dataset.theme === 'dark', A = alerts(), n = A.low.length + A.ex.length + A.rf.length;
  $('bar').innerHTML = `<div class="mbar"><span class="logo" style="width:34px;height:34px"><i></i></span><b>Aura<span>Scale</span></b></div>
  <div class="ctx"><b>${esc(SET.name)}</b><span>${B('ফার্মেসি','Pharmacy')}${SET.addr ? ' · ' + esc(SET.addr) : ''}</span></div>
  
  <button class="ibtn" data-act="notif" aria-label="${B('নোটিফিকেশন','Notifications')}">${ic('bell')}${n ? `<span class="dot">${num(n)}</span>` : ''}</button>
  <button class="ibtn latin" data-act="lang" aria-label="${B('English-এ দেখুন','View in Bengali')}">${S.lang === 'bn' ? 'EN' : 'বাং'}</button>
  <button class="ibtn" data-act="theme" aria-label="${B('থিম বদলান','Toggle theme')}">${ic(dark ? 'sun' : 'moon')}</button><button class="ibtn" data-act="menu" aria-label="${B('মেনু','Menu')}">${ic('more')}</button>`;
}
function renderBnav(){
  const pri = S.role === 'owner' ? ['dash', 'stock', 'bills'] : ['stock', 'bills', 'receive'], shown = pri.slice(0, 2), next = pri.slice(2), rest = ROLES[S.role].nav.filter(v => v !== 'pos' && !pri.includes(v));
  const bt = v => `<button class="bn ${S.view === v ? 'on' : ''}" data-act="go" data-v="${v}"><span class="pp">${ic(NAV[v][0])}</span>${NAV[v][1][S.lang === 'bn' ? 0 : 1].split(' ').slice(0, v === 'receive' ? 2 : 1).join(' ')}</button>`;
  const items = shown.map(bt).concat(`<button class="bn fab ${S.view === 'pos' ? 'on' : ''}" data-act="newBill"><span class="pp">${ic('plus', 26)}</span>${B('নতুন বিল','New bill')}</button>`).concat(next.map(bt)).concat(`<button class="bn ${rest.includes(S.view) ? 'on' : ''}" data-act="more"><span class="pp">${ic('more')}</span>${B('আরও','More')}</button>`);
  $('bnav').style.gridTemplateColumns = `repeat(${items.length},minmax(0,1fr))`; $('bnav').innerHTML = items.join('');
}
function render(){ lvSaveOrder(); HOST.lang = S.lang; renderSide(); renderBar(); renderBnav(); $('view').innerHTML = VIEWS[S.view](); if (VIEWS[S.view].after) VIEWS[S.view].after(); }
function go(v){ if (!ROLES[S.role].nav.includes(v)) v = ROLES[S.role].nav[0]; S.view = v; render(); window.scrollTo(0, 0); $('view').focus({preventScroll:true}); }
const ph = (title, sub, acts) => `<div class="ph"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${acts ? `<div class="acts">${acts}</div>` : ''}</div>`;
const hdr = (cols, cells) => `<div class="gt h" style="--cols:${cols}">${cells.map(c => `<span class="${c[1] || ''}">${c[0]}</span>`).join('')}</div>`;
const VIEWS = {};

/* ================= DASHBOARD ================= */
VIEWS.dash = () => {
  const t0 = today0(), td = SALES.filter(s => s.at >= t0 && !s.cancelled), walk = td.filter(s => s.kind === 'walkin'), ipd = td.filter(s => s.kind === 'ipd');
  const sum = a => a.reduce((x, s) => x + s.total, 0), A = alerts();
  const byP = {cash:0, upi:0, card:0, credit:0}; walk.forEach(s => byP[s.pay] += s.total); const mx = Math.max(1, ...Object.values(byP));
  const prof = walk.reduce((x, s) => x + s.total - s.cost, 0), credDue = A.cred.reduce((x, s) => x + s.total - (s.paid || 0), 0);
  const lowL = A.low.slice().sort((a, b) => stockOf(a) - stockOf(b)).slice(0, 6), expL = MEDS.filter(m => expQ(m) > 0 || (nearExp(m) && daysTo(nearExp(m)) <= 90)).slice(0, 6);
  return ph(B('আজকের অবস্থা','Today at a glance'), fd(NOW, {weekday:'long', day:'numeric', month:'long'}) + ' · ' + B('আজ কত বিক্রি হলো, কোন ওষুধ ফুরিয়ে আসছে, কার রিফিল বাকি','What sold today, what is running out, whose refill is due'), `<button class="btn btn-p btn-lg" data-act="newBill">${ic('plus')}${B('নতুন বিল','New bill')}</button>`)
  + `<div class="kpis">
    <div class="card kpi"><span class="ki">${ic('bill', 22)}</span><div><span>${B('আজ কাউন্টারে বিক্রি','Counter sales today')}</span><b>${money(sum(walk))}</b><small>${B(num(walk.length) + 'টি বিল', walk.length + ' bills')}${ipd.length ? ' · ' + B('ভর্তি রোগীকে ' + money(sum(ipd)), 'admitted ' + money(sum(ipd))) : ''}</small></div></div>
    ${isOwner() ? `<div class="card kpi i"><span class="ki">${ic('rupee', 22)}</span><div><span>${B('আজ লাভ (আনুমানিক)','Profit today (approx.)')}</span><b>${money(prof)}</b><small>${B('বিক্রি − কেনা দাম','Sale − purchase cost')}</small></div></div>` : `<div class="card kpi i"><span class="ki">${ic('rupee', 22)}</span><div><span>${B('আজ নগদ','Cash today')}</span><b>${money(byP.cash)}</b><small>UPI ${money(byP.upi)}</small></div></div>`}
    <div class="card kpi ${A.low.length ? 'b' : ''}"><span class="ki">${ic('box', 22)}</span><div><span>${B('স্টক কম বা শেষ','Low or out of stock')}</span><b>${num(A.low.length)}</b><small>${B('মেয়াদ পেরোনো স্টক ' + num(A.ex.length) + 'টি', A.ex.length + ' with expired stock')}</small></div></div>
    <div class="card kpi w"><span class="ki">${ic('clock', 22)}</span><div><span>${B('ধারে বাকি','Credit due')}</span><b>${money(credDue)}</b><small>${B(num(A.cred.length) + 'টি বিল', A.cred.length + ' bills')}</small></div></div>
  </div>
  <div class="g2">
    <section class="card flush"><div class="ch"><h2>${ic('alert', 18)} ${B('স্টক কম — এখনই অর্ডার করুন','Running low — order now')}</h2><button class="btn btn-g btn-sm" data-act="go" data-v="order">${B('অর্ডার তালিকা','Re-order list')}${ic('chev', 16)}</button></div>
      ${lowL.length ? lowL.map(m => `<div class="li"><span class="av c2">${ic('pill', 18)}</span><div class="tt"><b class="latin">${esc(m.n)}</b><span>${stockOf(m) ? B('বাকি ' + num(stockOf(m)) + ' ' + un(m.u), stockOf(m) + ' ' + un(m.u) + ' left') : `<span class="due">${B('স্টক শেষ','Out of stock')}</span>`}</span></div>${ORDER.find(o => o.mid === m.id) ? `<span class="tag t-g">${B('তালিকায় আছে','In list')}</span>` : `<button class="btn btn-s btn-sm" data-act="addOrder" data-id="${m.id}">${ic('cart', 16)}${B('তালিকায় যোগ','Add to list')}</button>`}</div>`).join('') : `<div class="empty">${ic('check')}<div>${B('সব ওষুধের স্টক ঠিক আছে','Every medicine is well stocked')}</div></div>`}</section>
    <section class="card flush"><div class="ch"><h2>${B('আজ কীভাবে টাকা এল','How money came in today')}</h2><span class="amt">${money(sum(walk))}</span></div><div class="bars">${[['cash', B('নগদ','Cash')], ['upi', 'UPI'], ['card', B('কার্ড','Card')], ['credit', B('ধারে','Credit')]].map(([k, l]) => `<div><div class="r"><span>${l}</span><b class="${k === 'credit' && byP[k] ? 'due' : ''}">${money(byP[k])}</b></div><div class="tr"><i style="width:${byP[k] / mx * 100}%;${k === 'credit' ? 'background:#E0A43B' : ''}"></i></div></div>`).join('')}</div></section>
  </div>
  <div class="g2">
    <section class="card flush"><div class="ch"><h2>${ic('clock', 18)} ${B('মেয়াদ শেষ হয়েছে বা ৯০ দিনের মধ্যে শেষ হবে','Expired or expiring within 90 days')}</h2><button class="btn btn-g btn-sm" data-act="stF" data-v="exp90">${B('সব দেখুন','See all')}${ic('chev', 16)}</button></div>
      ${expL.length ? expL.map(m => { const e = nearExp(m), x = expQ(m); return `<div class="li"><span class="av c1">${ic('pill', 18)}</span><div class="tt"><b class="latin">${esc(m.n)}</b><span>${x ? B('মেয়াদ পেরোনো ' + num(x) + ' ' + un(m.u) + ' — বিক্রি হবে না', x + ' ' + un(m.u) + ' expired — will not be sold') : B('মেয়াদ ' + fexp(e) + ' · ' + num(daysTo(e)) + ' দিন বাকি', 'Expires ' + fexp(e) + ' · ' + daysTo(e) + ' days')}</span></div><span class="tag ${x ? 't-r' : 't-a'}">${x ? B('মেয়াদ শেষ','Expired') : fexp(e)}</span></div>`; }).join('') : `<div class="empty">${ic('check')}<div>${B('কোনো ওষুধের মেয়াদ কাছাকাছি নেই','Nothing is close to expiry')}</div></div>`}</section>
    <section class="card flush"><div class="ch"><h2>${ic('repeat', 18)} ${B('আজ-কালের রিফিল রিমাইন্ডার','Refills due today or tomorrow')}</h2><span>${num(A.rf.length)}</span></div>
      ${A.rf.length ? A.rf.map(s => `<div class="li"><span class="av c3">${esc(Array.from(s.name)[0])}</span><div class="tt"><b>${esc(s.name)}</b><span>${s.lines.map(l => l.name).join(', ')} · ${B(num(s.refill) + ' দিন আগে কিনেছিলেন', 'bought ' + s.refill + ' days ago')}</span></div><button class="btn btn-wa btn-sm" data-act="remind" data-no="${s.no}">${ic('wa', 16)}${B('মনে করান','Remind')}</button></div>`).join('') : `<div class="empty">${ic('check')}<div>${B('আজ কারও রিফিল বাকি নেই','No refills due')}</div></div>`}</section>
  </div>`;
};

/* ================= POS ================= */
const newP = () => ({kind:'walkin', name:'', ph:'', doc:'', uhid:'', adm:'', paddr:'', daddr:'', dreg:'', cart:[], disc:0, pay:'cash', wa:true, refill:0, q:'', sel:0, err:'', bad:{}});
S.P = newP();
function alloc(m, q){ const out = []; let need = q; sell(m).forEach(b => { if (need <= 0) return; const t = Math.min(need, b.q); out.push({b, q:t}); need -= t; }); return out; }
function posCalc(){
  const P = S.P, reg = P.kind === 'walkin' && SET.mode === 'regular', disc = P.kind === 'ipd' ? 0 : Math.min(100, Math.max(0, +P.disc || 0));
  const t = {mrp:0, disc:0, amt:0, gst:0, cost:0, reg, pct:disc};
  P.cart.forEach(c => { const m = MAP[c.mid]; c.lines = alloc(m, c.q); c.amt = 0; c.lines.forEach(l => { const g = r2(l.q * l.b.mrp), d = r2(g * disc / 100), a = g - d; t.mrp += g; t.disc += d; t.amt += a; c.amt += a; t.cost += l.q * l.b.rate; if (reg) t.gst += a - r2(a * 100 / (100 + m.g)); }); });
  t.total = P.kind === 'walkin' ? Math.round(t.amt) : r2(t.amt); t.round = r2(t.total - t.amt); return t;
}
const h1In = () => { const s = new Set(); S.P.cart.forEach(c => { const x = MAP[c.mid].sch; if (c.q > 0 && (x === 'H1' || x === 'X')) s.add(x); }); return [...s]; };
VIEWS.pos = () => {
  const P = S.P, prev = P.ph.length === 10 ? SALES.filter(s => s.kind === 'walkin' && s.ph === P.ph && !s.cancelled).slice(-1)[0] : null;
  return ph(B('বিক্রির কাউন্টার','Sales counter'), B('ওষুধ খুঁজে যোগ করুন — মেয়াদ সবচেয়ে কাছের ব্যাচ আগে বিক্রি হবে, মেয়াদ পেরোনো ওষুধ কখনও নয়','Add medicines — the batch expiring first is sold first; expired stock never'))
  + `<div class="pos"><div style="min-width:0;display:flex;flex-direction:column;gap:16px">
    <section class="card pad">
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px"><div class="seg"><button data-act="kind" data-v="walkin" aria-pressed="${P.kind === 'walkin'}">${ic('walk', 17)} ${B('কাউন্টারের ক্রেতা','Walk-in customer')}</button>${ADM.length || P.kind === 'ipd' ? `<button data-act="kind" data-v="ipd" aria-pressed="${P.kind === 'ipd'}">${ic('bed', 17)} ${B('ভর্তি রোগী','Admitted patient')}</button>` : ''}</div><span class="mut" style="font-size:13px">${P.kind === 'walkin' ? B('কাউন্টারে বিক্রি, ফার্মেসির বিল হবে','Counter sale with a pharmacy bill') : B('রোগীর নার্সিং হোমের বিলে যোগ হবে','Added to the patient’s nursing-home bill')}</span></div>
      ${P.kind === 'walkin' ? `<div class="row2">
        <div class="field ddw"><label for="c-ph">${B('মোবাইল (হোয়াটসঅ্যাপে বিল যাবে)','Mobile (bill on WhatsApp)')}</label><input id="c-ph" class="input latin ${P.bad.ph ? 'bad' : ''}" inputmode="numeric" maxlength="10" data-in="ph" value="${esc(P.ph)}" placeholder="9000060101" autocomplete="off"><div id="custdd"></div></div>
        <div class="field"><label for="c-n">${B('ক্রেতার নাম','Customer name')} *</label><input id="c-n" class="input ${P.bad.name ? 'bad' : ''}" data-in="name" value="${esc(P.name)}" placeholder="${B('যেমন: রুমা সরকার','e.g. Ruma Sarkar')}" autocomplete="off"></div>
        <div class="field" style="margin:0"><label for="c-d">${B('ডাক্তারের নাম','Prescribed by')}</label><input id="c-d" class="input ${P.bad.doc ? 'bad' : ''}" data-in="doc" value="${esc(P.doc)}" placeholder="${B('ঐচ্ছিক','optional')}" list="docl"><datalist id="docl">${DOCTORS.map(d => `<option value="${d}">`).join('')}</datalist></div>
        <div class="field" style="margin:0"><label for="c-u">UHID (${B('ঐচ্ছিক','optional')})</label><input id="c-u" class="input latin" data-in="uhid" value="${esc(P.uhid)}" placeholder="ASH-0000"></div></div>
        <div id="rep">${prev ? repHtml(prev) : ''}</div>` : `<div class="field" style="margin:0"><label for="c-a">${B('ভর্তি রোগী','Admitted patient')}</label><select id="c-a" class="input ${P.bad.adm ? 'bad' : ''}" data-in="adm"><option value="">${B('বেছে নিন','Choose')}</option>${ADM.map(a => `<option value="${a.id}" ${P.adm === a.id ? 'selected' : ''}>${esc(a.n)} · ${a.bed} · ${a.uhid}</option>`).join('')}</select><small class="mut" style="margin-top:6px">${B('আলাদা ফার্মেসি বিল হবে না, GST লাগবে না (চিকিৎসার অংশ)। ওয়ার্ডের জন্য একটা ইস্যু স্লিপ প্রিন্ট হবে।','No separate pharmacy bill, no GST (part of treatment). An issue slip is printed for the ward.')}</small></div>`}
      <div id="h1box">${h1Html()}</div>
    </section>
    <section class="card flush">
      <div style="padding:16px 18px"><div class="ddw"><label class="search" style="max-width:none">${ic('search')}<span class="vh">${B('ওষুধ খুঁজুন','Search medicine')}</span><input class="input" id="mq" style="font-size:16px;min-height:54px" placeholder="${B('ওষুধ বা সল্টের নামের ২-৩টে অক্ষর লিখে Enter চাপুন…','Type 2–3 letters of the medicine or salt, then Enter…')}" autocomplete="off" value="${esc(P.q)}"></label><div id="mdd"></div></div></div>
      <div id="cart">${cartHtml()}</div>
    </section></div>
    <aside class="card sum" id="sum" aria-label="${B('বিলের মোট','Bill total')}">${sumHtml()}</aside></div>`;
};
VIEWS.pos.after = () => { const q = $('mq'); if (q && window.innerWidth > 900 && !S.modal) q.focus({preventScroll:true}); };
function repHtml(s){ return `<button class="btn btn-s" data-act="repeat" data-no="${s.no}" style="margin-top:12px;height:auto;padding:10px 14px;white-space:normal;text-align:left">${ic('repeat', 18)}<span><b>${B('আগের বিলটাই আবার','Repeat last bill')}</b> <small class="mut">· ${s.no} · ${fd(s.at)} · ${B(num(s.lines.length) + 'টি ওষুধ', s.lines.length + ' medicines')} · ${money(s.total)}</small></span></button>`; }
function h1Html(){
  const h = h1In(); if (!h.length || S.P.kind !== 'walkin') return ''; const P = S.P;
  return `<div class="box-w" style="margin:14px 0 0"><b>${ic('alert', 18)} ${B('বিলে শিডিউল ' + h.join(' / ') + ' ওষুধ আছে — H1 রেজিস্টারের জন্য দরকার','Schedule ' + h.join(' / ') + ' medicine in this bill — needed for the H1 register')}</b>
  <div class="row2"><div class="field"><label for="h-pa">${B('রোগীর ঠিকানা','Patient’s address')} *</label><input id="h-pa" class="input ${P.bad.paddr ? 'bad' : ''}" data-in="paddr" value="${esc(P.paddr)}" placeholder="${B('পাড়া, গ্রাম বা রাস্তা, শহর','Para, village or road, town')}"></div>
  <div class="field"><label for="h-da">${B('ডাক্তারের ঠিকানা / ক্লিনিক','Doctor’s address / clinic')} *</label><input id="h-da" class="input ${P.bad.daddr ? 'bad' : ''}" data-in="daddr" value="${esc(P.daddr)}"></div></div>
  <div class="field" style="margin:0;max-width:320px"><label for="h-dr">${B('ডাক্তারের রেজিস্ট্রেশন নং (ঐচ্ছিক)','Doctor’s reg. no. (optional)')}</label><input id="h-dr" class="input latin" data-in="dreg" value="${esc(P.dreg)}"></div>
  <p class="mini" style="margin:8px 0 0">${B('শুধু বৈধ প্রেসক্রিপশন দেখে বিক্রি করুন। ডাক্তারের নাম, দুটো ঠিকানা, ওষুধ, ব্যাচ আর পরিমাণ H1 রেজিস্টারে উঠবে (বিল ও বিক্রি → H1 রেজিস্টার)।','Sell only against a valid prescription. Doctor, both addresses, medicine, batch and quantity go into the H1 register (Bills → H1 register).')}</p></div>`;
}
function cartHtml(){
  const P = S.P; posCalc();
  if (!P.cart.length) return `<div class="empty" style="border-top:1px solid var(--border)">${ic('pill')}<div>${B('এখনও কোনো ওষুধ নেই। ওপরে খুঁজে যোগ করুন।','No medicines yet. Search above to add.')}</div></div>`;
  return `<div class="cartl h"><span>${B('ওষুধ','Medicine')}</span><span>${B('ব্যাচ / মেয়াদ','Batch / Exp')}</span><span>${B('পরিমাণ','Qty')}</span><span class="r">GST</span><span class="r">${B('টাকা','Amount')}</span><span></span></div>`
  + P.cart.map(c => { const m = MAP[c.mid], st = stockOf(m); return `<div class="cartl"><span class="dname"><b class="latin">${esc(m.n)}</b><small>${esc(m.c)}${m.sch ? ` · <span class="tag ${m.sch === 'H1' || m.sch === 'X' ? 't-a' : 't-d'}">Sch ${m.sch}</span>` : ''}</small></span>
    <span class="mini latin bt">${c.lines.map(l => `${esc(l.b.b)} · ${fexp(l.b.exp)} × ${num(l.q)} <span class="mut">@ ${money2(l.b.mrp)}</span>`).join('<br>')}</span>
    <span><span class="stp"><button data-act="qty" data-id="${c.mid}" data-d="-1" aria-label="${B('কমান','Less')}">−</button><input data-qty="${c.mid}" inputmode="numeric" value="${c.q}" aria-label="${B('পরিমাণ','Quantity')}"><button data-act="qty" data-id="${c.mid}" data-d="1" aria-label="${B('বাড়ান','More')}">+</button></span><small class="stkline" style="margin-top:4px;display:block">${un(m.u)} · ${B('স্টক','stock')} <b>${num(st)}</b> → <b class="${st - c.q <= lowAt(m) ? 'due' : ''}">${num(st - c.q)}</b></small></span>
    <span class="r mini">${m.g ? num(m.g) + '%' : B('ছাড়','Exempt')}</span><b class="r amt">${money2(c.amt)}</b><button class="ibtn" style="width:40px;height:40px" data-act="cartDel" data-id="${c.mid}" aria-label="${B('বাদ দিন','Remove')}">${ic('x', 18)}</button></div>`; }).join('');
}
function sumHtml(){
  const P = S.P, t = posCalc(), cg = r2(t.gst / 2);
  return `<div class="r"><span>${B('MRP মোট','MRP total')}</span><span>${money2(t.mrp)}</span></div>
  <div class="r"><span>${B('ছাড়','Discount')}${t.pct ? ' (' + num(t.pct) + '%)' : ''}</span><span class="okc">−${money2(t.disc)}</span></div>
  ${P.kind === 'walkin' ? (t.reg ? `<div class="r s"><span>${B('করযোগ্য মূল্য','Taxable value')}</span><span>${money2(t.amt - t.gst)}</span></div><div class="r s"><span>CGST</span><span>${money2(cg)}</span></div><div class="r s"><span>SGST</span><span>${money2(r2(t.gst - cg))}</span></div><div class="tiny" style="text-align:right">${B('GST দামের (MRP) ভেতরেই ধরা আছে','GST is inside the MRP')}</div>` : `<div class="tiny">${B('এই বিলে GST নেওয়া হচ্ছে না (সেটিংস → GST রেজিস্ট্রেশন)','GST not charged (Settings → GST registration)')}</div>`) : `<div class="tiny">${B('ভর্তি রোগী — ছাড় বা GST নেই','Admitted patient — no discount or GST')}</div>`}
  ${t.round ? `<div class="r s"><span>${B('রাউন্ড অফ','Round off')}</span><span>${t.round > 0 ? '+' : ''}${money2(t.round)}</span></div>` : ''}
  <div class="r big"><span>${B('দিতে হবে','To pay')}</span><span>${P.kind === 'walkin' ? money(t.total) : money2(t.total)}</span></div>
  ${P.kind === 'walkin' ? `<div><div class="lab" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><label for="c-disc">${B('ছাড় %','Discount %')}</label><button class="btn btn-g btn-sm" data-act="discOpen">${ic('calc', 16)}${B('ছাড়ের হিসেব','Calculator')}</button></div><input id="c-disc" class="input latin" inputmode="decimal" data-in="disc" value="${esc(P.disc || '')}" placeholder="0"></div>
  <div><span class="lab">${B('কীভাবে দিলেন','Paid by')}</span><div class="pay4" style="margin-top:6px">${[['cash', B('নগদ','Cash')], ['upi', 'UPI'], ['card', B('কার্ড','Card')], ['credit', B('ধারে','Credit')]].map(([k, l]) => `<button data-act="pay" data-v="${k}" aria-pressed="${P.pay === k}">${l}</button>`).join('')}</div>${P.pay === 'credit' ? `<p class="mini" style="margin:6px 0 0;color:var(--warn)">${B('পুরো টাকা বাকি থাকবে — বিল ও বিক্রি পাতা থেকে পরে নেওয়া যাবে।','Full amount stays due — collect later from Bills.')}</p>` : ''}</div>
  <label class="tgrow" style="margin:0;cursor:pointer"><span>${ic('wa', 18)} ${B('বিল হোয়াটসঅ্যাপে পাঠান','Send bill on WhatsApp')} <small class="mut">(${B('ক্রেতা রাজি','customer agreed')})</small></span><button class="tgl" role="switch" aria-checked="${P.wa}" data-act="wa"><i></i></button></label>
  <div><label class="lab" for="c-rf">${B('রিফিল মনে করানো (হোয়াটসঅ্যাপে)','Refill reminder (WhatsApp)')}</label><select id="c-rf" class="input" data-in="refill" style="margin-top:6px">${[0, 5, 7, 10, 15, 30, 60, 90].map(d => `<option value="${d}" ${+P.refill === d ? 'selected' : ''}>${d ? B(num(d) + ' দিন পরে', 'After ' + d + ' days') : B('মনে করাতে হবে না','No reminder')}</option>`).join('')}</select></div>` : ''}
  <button class="btn btn-p btn-lg btn-b" data-act="posSave" ${P.cart.length ? '' : 'disabled'}>${ic('check')}${P.kind === 'walkin' ? B('সেভ করে বিল তৈরি করুন','Save & make bill') : B('রোগীর বিলে যোগ করুন','Add to patient’s bill')}</button>
  ${P.err ? `<p class="err" role="alert">${ic('alert', 15)}${P.err}</p>` : ''}
  <p class="tiny" style="text-align:center;margin:0">${B('বিল সেভ হলে স্টক নিজে থেকেই কমে যাবে','Stock is updated automatically')}</p>`;
}
const refreshPos = () => { if (S.view !== 'pos') return; $('cart').innerHTML = cartHtml(); $('sum').innerHTML = sumHtml(); $('h1box').innerHTML = h1Html(); };
function medSearch(q, filter){ q = q.toLowerCase().trim(); const nq = q.replace(/[\s.\-]/g, ''); if (!q) return [];
  const sc = m => { const n = m.n.toLowerCase(), c = m.c.toLowerCase(), nn = n.replace(/[\s.\-]/g, ''); if (n.startsWith(q) || nn.startsWith(nq)) return 0; if ((' ' + n).includes(' ' + q)) return 1; if (q.split(/\s+/).length > 1 && q.split(/\s+/).every(w => n.includes(w) || c.includes(w))) return 2; if (c.startsWith(q) || (' ' + c).includes(' ' + q)) return 3; if (nn.includes(nq)) return 4; if (c.includes(q)) return 5; return 9; };
  return MEDS.filter(m => (!filter || filter(m)) && sc(m) < 9).sort((a, b) => sc(a) - sc(b) || (stockOf(b) > 0) - (stockOf(a) > 0) || a.n.localeCompare(b.n)).slice(0, 10); }
function drawMdd(){
  const P = S.P, dd = $('mdd'); if (!dd) return; const L = medSearch(P.q, m => m.active);
  if (!P.q.trim()) { dd.innerHTML = ''; return; }
  dd.innerHTML = `<div class="dd" role="listbox">${L.length ? L.map((m, i) => { const st = stockOf(m), e = nearExp(m), sub = st ? null : subsFor(m)[0]; return `<button class="it ${i === P.sel ? 'hl' : ''}" data-act="posAdd" data-id="${m.id}" role="option"><span class="tt"><b class="latin">${esc(m.n)}</b><small>${esc(m.c)} · ${st ? `<span class="okc" style="font-weight:700">${B('স্টকে ' + num(st) + ' ' + un(m.u), st + ' ' + un(m.u) + ' in stock')}</span>${e ? ' · ' + B('মেয়াদ', 'Exp') + ' ' + fexp(e) : ''}` : `<span class="due" style="font-weight:700">${B('স্টক নেই','Out of stock')}</span>`}</small>${sub ? `<small class="okc" style="font-weight:700">⇄ ${B('একই সল্ট স্টকে আছে:','Same salt in stock:')} <span class="latin">${esc(sub.n)}</span></small>` : ''}</span><span class="amt">${sell(m)[0] ? money2(sell(m)[0].mrp) + '/' + un(m.u) : ''}</span></button>`; }).join('') : `<div class="hd">${B('কোনো ওষুধ পাওয়া যায়নি। "স্টক যোগ" পাতা থেকে যোগ করুন।','No medicine found. Add it in “Add stock”.')}</div>`}</div>`;
}
function drawCust(){
  const P = S.P, dd = $('custdd'); if (!dd) return; const d = P.ph.replace(/\D/g, '');
  if (d.length < 3 || d.length === 10) { dd.innerHTML = ''; return; }
  const seen = {}, L = []; SALES.slice().reverse().forEach(s => { if (s.kind !== 'walkin' || !s.ph || !s.ph.includes(d)) return; const k = s.ph; if (seen[k]) { seen[k].n++; return; } seen[k] = {name:s.name, ph:s.ph, last:s.at, n:1}; L.push(seen[k]); });
  dd.innerHTML = L.length ? `<div class="dd"><div class="hd">${B('আগের ক্রেতা — ট্যাপ করে বসান','Earlier customers — tap to fill')}</div>${L.slice(0, 6).map(c => `<button class="it" data-act="custPick" data-ph="${c.ph}" data-n="${esc(c.name)}"><span class="tt"><b>${esc(c.name)}</b><small>${B(num(c.n) + 'টি বিল · শেষ ' + fd(c.last), c.n + ' bills · last ' + fd(c.last))}</small></span><span class="latin mut">${fph(c.ph)}</span></button>`).join('')}</div>` : '';
}
function posAdd(id){
  const m = MAP[id], P = S.P; P.q = ''; P.sel = 0; const q = $('mq'); if (q) q.value = ''; drawMdd();
  if (stockOf(m) <= 0) { const sub = subsFor(m)[0]; if (sub) openM({type:'subst', id, sub:sub.id}); else toast(B(m.n + ' স্টকে নেই (মেয়াদ পেরোনো ওষুধ বিক্রি হয় না)।', m.n + ' is out of stock (expired stock is never sold).'), null, 'warn'); return; }
  const ex = P.cart.find(c => c.mid === id); if (ex) ex.q = Math.min(ex.q + 1, stockOf(m)); else P.cart.push({mid:id, q:1}); P.err = '';
  refreshPos(); setTimeout(() => { const q2 = $('mq'); if (q2 && q2.value) return; const i = ROOT.querySelector(`[data-qty="${id}"]`); if (i) { i.focus(); i.select(); } }, 20);
}
function posSave_demo(){
  const P = S.P; P.bad = {}; P.err = ''; const items = P.cart.filter(c => c.q > 0);
  const fail = (msg, k, el) => { P.err = msg; if (k) P.bad[k] = 1; render(); const e = $(el); if (e) e.focus(); };
  if (!items.length) return fail(B('অন্তত একটা ওষুধ যোগ করুন।','Add at least one medicine.'), null, 'mq');
  if (P.kind === 'ipd') { if (!P.adm) return fail(B('ভর্তি রোগী বেছে নিন।','Choose the admitted patient.'), 'adm', 'c-a'); }
  else {
    if (!P.name.trim()) return fail(B('ক্রেতার নাম লিখুন।','Enter the customer’s name.'), 'name', 'c-n');
    if (P.ph && !mobOk(P.ph)) return fail(B('মোবাইল নম্বর ৬-৯ দিয়ে শুরু ১০ সংখ্যার হবে (বা ফাঁকা রাখুন)।','Mobile must be 10 digits starting with 6–9 (or leave it empty).'), 'ph', 'c-ph');
    if (+P.refill && !P.ph) return fail(B('রিফিল মনে করাতে ক্রেতার মোবাইল নম্বর লাগবে।','A refill reminder needs the customer’s mobile number.'), 'ph', 'c-ph');
    const h = h1In(); if (h.length) { const w = B('শিডিউল ' + h[0] + ' ওষুধ: ', 'Schedule ' + h[0] + ' medicine: ');
      if (!P.doc.trim()) return fail(w + B('প্রেসক্রিপশনের ডাক্তারের নাম লিখুন (H1 রেজিস্টারে লাগবে)।','write the prescribing doctor’s name (for the H1 register).'), 'doc', 'c-d');
      if (!P.paddr.trim()) return fail(w + B('রোগীর ঠিকানা লিখুন।','write the patient’s address.'), 'paddr', 'h-pa');
      if (!P.daddr.trim()) return fail(w + B('ডাক্তারের ঠিকানা বা ক্লিনিক লিখুন।','write the doctor’s address or clinic.'), 'daddr', 'h-da'); }
  }
  posCalc(); const before = {}; items.forEach(c => before[c.mid] = stockOf(MAP[c.mid]));
  const lines = []; items.forEach(c => { const m = MAP[c.mid]; c.lines.forEach(l => { l.b.q -= l.q; lines.push({mid:m.id, name:m.n, sch:m.sch, hsn:m.hsn, b:l.b.b, exp:l.b.exp, q:l.q, mrp:l.b.mrp, rate:l.b.rate, g:m.g}); }); });
  const adm = ADM.find(a => a.id === P.adm);
  const s = finish({no:billNo(NOW), at:new Date(), kind:P.kind, lines, discPct:P.kind === 'ipd' ? 0 : (+P.disc || 0), pay:P.kind === 'ipd' ? 'ipd' : P.pay, name:P.kind === 'ipd' ? adm.n : P.name.trim(), ph:P.ph, doc:P.doc.trim(), uhid:P.kind === 'ipd' ? adm.uhid : P.uhid, adm:P.adm || null, h1:h1In().length && P.kind === 'walkin' ? {paddr:P.paddr.trim(), daddr:P.daddr.trim(), dreg:P.dreg.trim()} : null, refill:P.ph ? +P.refill : 0, wa:P.kind === 'walkin' && !!P.ph && P.wa, by:S.role, paid:P.pay === 'credit' ? 0 : null, before});
  SALES.push(s); const fresh = items.map(c => MAP[c.mid]).filter(m => isLow(m) && before[m.id] > lowAt(m));
  S.P = newP(); render(); openM({type:'done', no:s.no, fresh:true});
  if (fresh.length) setTimeout(() => toast(B('স্টক কমে গেছে: ', 'Stock is low: ') + fresh.map(m => `${m.n} (${num(stockOf(m))})`).join(', '), null, 'warn'), 600);
}

/* ================= STOCK ================= */
function medTags(m){ const t = [], st = stockOf(m), e = nearExp(m), x = expQ(m);
  if (st <= 0) t.push(`<span class="tag t-r">${B('স্টক শেষ','Out of stock')}</span>`); else if (st <= lowAt(m)) t.push(`<span class="tag t-a">${B('কম','Low')}</span>`);
  if (e && daysTo(e) <= 90) t.push(`<span class="tag t-a">${B('মেয়াদ ','Exp ')}${fexp(e)}</span>`); if (x) t.push(`<span class="tag t-r">${B(num(x) + ' মেয়াদ শেষ', x + ' expired')}</span>`); if (!m.active) t.push(`<span class="tag t-d">${B('লুকানো','Hidden')}</span>`);
  return t.join('') || `<span class="tag t-g">${B('ঠিক আছে','OK')}</span>`; }
VIEWS.stock = () => {
  let vM = 0, vC = 0; MEDS.forEach(m => m.batches.forEach(b => { if (!bX(b)) { vM += b.q * b.mrp; vC += b.q * b.rate; } }));
  const A = alerts(), q = S.stQ, gs = S.gstSel;
  const F = {all:() => true, low:isLow, exp90:m => { const e = nearExp(m); return e && daysTo(e) <= 90; }, expired:m => expQ(m) > 0};
  const L = MEDS.filter(m => F[S.stF](m) && (!q || medSearch(q).includes(m) || m.n.toLowerCase().includes(q.toLowerCase())) && (!gs || S.gstOnly === '' || m.g === +S.gstOnly));
  const cols = gs ? '44px minmax(0,2fr) 110px 110px 90px' : 'minmax(0,2fr) 110px 110px 100px 80px minmax(0,1.3fr) 90px';
  return ph(B('স্টক','Stock'), B('কোন ওষুধ কত আছে, কোন ব্যাচের মেয়াদ কবে — মেয়াদ পেরোনো স্টক বিক্রিতে আসে না','How much of each medicine, which batch expires when — expired stock is never sold'),
    `<button class="btn btn-s" data-act="medEdit">${ic('plus')}${B('নতুন ওষুধ','New medicine')}</button>${isOwner() ? `<button class="btn btn-s" data-act="gstMode">%&nbsp;${B('অনেকের GST বদল','Change GST of many')}</button>` : ''}<button class="btn btn-s" data-act="retOpen">${ic('back')}${B('সাপ্লায়ারকে ফেরত','Return to supplier')}</button>`)
  + `<div class="kpis"><div class="card kpi"><span class="ki">${ic('pill', 22)}</span><div><span>${B('মোট ওষুধ','Medicines')}</span><b>${num(MEDS.length)}</b></div></div>
    <div class="card kpi i"><span class="ki">${ic('rupee', 22)}</span><div><span>${B('স্টকের দাম (MRP)','Stock value (MRP)')}</span><b>${money(vM)}</b>${isOwner() ? `<small>${B('কেনা দাম ','Cost ')}${money(vC)}</small>` : ''}</div></div>
    <div class="card kpi b"><span class="ki">${ic('alert', 22)}</span><div><span>${B('কম বা শেষ','Low / out')}</span><b>${num(A.low.length)}</b><small style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">${B('সতর্ক করবে','Alert at')} <input class="input latin" style="width:64px;min-height:34px;padding:0 8px;font-size:14px" inputmode="numeric" data-in="lowpk" value="${LOW}" aria-label="${B('কত প্যাকে সতর্ক করবে','Alert level in packs')}" ${isOwner() ? '' : 'disabled'}> ${B('প্যাকে','packs')}</small></div></div>
    <div class="card kpi w"><span class="ki">${ic('clock', 22)}</span><div><span>${B('৯০ দিনে মেয়াদ · পেরোনো','Expiring 90d · expired')}</span><b>${num(A.e90.length)} · ${num(A.ex.length)}</b></div></div></div>
  ${gs ? `<div class="box-w"><b>%&nbsp;${B('অনেক ওষুধের GST একসাথে বদলান','Change GST of many medicines')}</b><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
    <div class="field" style="margin:0"><label>${B('শুধু এই GST দেখান','Show only GST')}</label><select class="input" data-in="gstOnly" style="width:120px"><option value="">${B('সব','All')}</option>${[0, 5, 12, 18].map(g => `<option ${S.gstOnly === String(g) ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
    <button class="btn btn-s" data-act="gstAll" data-v="1">${B('দেখানো সব টিক','Tick all shown')}</button><button class="btn btn-s" data-act="gstAll" data-v="0">${B('সব টিক তুলুন','Untick all')}</button>
    <div class="field" style="margin:0"><label>${B('টিক দেওয়াগুলোর নতুন GST','New GST for ticked')}</label><select class="input" id="gstNew" style="width:110px">${[5, 0, 12, 18].map(g => `<option>${g}</option>`).join('')}</select></div>
    <button class="btn btn-p" data-act="gstApply">${ic('check')}${B('GST বদলান','Change GST')} (${num(Object.keys(gs).length)})</button><button class="btn btn-g" data-act="gstMode">${B('বন্ধ','Close')}</button></div>
    <p class="mini" style="margin:8px 0 0">${B('আগে তৈরি বিলের GST বদলাবে না, শুধু নতুন বিলে নতুন হার লাগবে। হার ঠিক কি না আপনার CA-কে জিজ্ঞেস করে নিন।','Bills already made keep their GST; only new bills use the new rate. Check the rate with your CA.')}</p></div>` : ''}
  <div class="toolbar"><label class="search">${ic('search')}<span class="vh">${B('ওষুধ বা সল্ট খুঁজুন','Search medicine or salt')}</span><input class="input" id="stq" type="search" value="${esc(q)}" placeholder="${B('ওষুধ বা সল্ট খুঁজুন…','Search medicine or salt…')}"></label>
  <div class="chips">${[['all', B('সব','All'), MEDS.length], ['low', B('কম / শেষ','Low / out'), A.low.length], ['exp90', B('৯০ দিনে মেয়াদ','Expiring ≤ 90 days'), A.e90.length], ['expired', B('মেয়াদ পেরোনো','Expired'), A.ex.length]].map(([k, l, n]) => `<button class="chip" data-act="stF" data-v="${k}" aria-pressed="${S.stF === k}">${l}<span class="n">${num(n)}</span></button>`).join('')}</div></div>
  <section class="card flush" id="stlist">${gs ? hdr(cols, [['', ''], [B('ওষুধ','Medicine')], [B('স্টক','Stock'), 'r'], ['MRP', 'r'], ['GST', 'r']]) : hdr(cols, [[B('ওষুধ','Medicine')], [B('স্টক','In stock'), 'r'], [B('কাছের মেয়াদ','Nearest expiry')], ['MRP', 'r'], ['GST', 'r'], [B('অবস্থা','Status')], ['']])}
  ${L.length ? L.map(m => { const st = stockOf(m), e = nearExp(m), mr = sell(m)[0];
    if (gs) return `<div class="gt click ${gs[m.id] ? 'sel' : ''}" style="--cols:${cols}" data-act="gstTick" data-id="${m.id}"><span class="ck" style="${gs[m.id] ? 'background:var(--primary);border-color:var(--primary);color:#fff' : ''}">${ic('check', 15)}</span><span class="dname"><b class="latin">${esc(m.n)}</b><small>${esc(m.c)}</small></span><span class="r"><b>${num(st)}</b> <small style="display:inline">${un(m.u)}</small></span><span class="r">${mr ? money2(mr.mrp) : '—'}</span><b class="r">${num(m.g)}%</b></div>`;
    return `<div class="gt click" style="--cols:${cols}" data-act="medOpen" data-id="${m.id}"><span class="dname full"><b class="latin">${esc(m.n)}</b><small>${esc(m.c)}${m.sch ? ' · Sch ' + m.sch : ''}</small></span><span class="r"><span class="lm">${B('স্টক','Stock')}</span><b class="${st <= lowAt(m) ? 'due' : ''}">${num(st)}</b> <small style="display:inline">${un(m.u)}</small></span><span><span class="lm">${B('মেয়াদ','Exp')}</span>${e ? fexp(e) : '—'}</span><span class="r"><span class="lm">MRP</span>${mr ? money2(mr.mrp) : '—'}</span><span class="r"><span class="lm">GST</span>${num(m.g)}%</span><span class="full">${medTags(m)}</span><span class="acts" style="display:flex;gap:6px">${isLow(m) ? (ORDER.find(o => o.mid === m.id) ? '' : `<button class="btn btn-g btn-sm" data-act="addOrder" data-id="${m.id}">${ic('cart', 16)}${B('অর্ডার','Order')}</button>`) : `<span class="btn btn-s btn-sm">${B('খুলুন','Open')}</span>`}</span></div>`; }).join('')
  : `<div class="empty">${ic('search')}<div>${B('কিছু মেলেনি','Nothing matches')}</div></div>`}</section>`;
};

/* ================= ADD STOCK ================= */
VIEWS.receive = () => ph(B('স্টক যোগ','Add stock'), B('প্রতিটি লাইনে লাগবে: ওষুধের নাম, ব্যাচ নং, মেয়াদ, MRP, GST % আর পরিমাণ। শুধু ওষুধের নামের তালিকা স্টক হিসেবে নেওয়া হয় না।','Every line needs: medicine name, batch no., expiry, MRP, GST % and quantity. A plain list of names is not accepted as stock.'), `<button class="btn btn-s" data-act="supOpen">${ic('truck')}${B('আপনার সাপ্লায়ার','Your suppliers')}</button>`)
  + `<div class="tiles">${[['photo', 'camera', B('বিলের ছবি','Bill photos'), B('একটা বিলের ১–১০টা ছবি','1–10 photos of one bill')], ['pdf', 'file', B('PDF বিল','PDF bill'), B('ডিস্ট্রিবিউটরের PDF বিল','Distributor’s bill as PDF')], ['xlsx', 'sheet', 'Excel', B('স্টকের তালিকা .xlsx','Stock list .xlsx')], ['csv', 'csv', 'CSV', B('স্টকের তালিকা .csv','Stock list .csv')]].map(([k, i, b, s]) => `<button class="tile" data-act="pick" data-v="${k}"><span class="ti">${ic(i, 22)}</span><b>${b}</b><small>${s}</small></button>`).join('')}</div>
  <div class="drop" data-drop="stock" id="dropz">${ic('down', 28)}<div><b>${B('ফাইল এখানে টেনে এনে ছাড়ুন','Drag and drop a file here')}</b></div><div style="font-size:13.5px">${B('বিলের ছবি, PDF, Excel বা CSV — নিজে থেকেই বুঝে নেবে','Bill photo, PDF, Excel or CSV — detected automatically')}</div></div>
  <div id="impPrev"></div>
  <section class="card pad" style="margin-bottom:16px;background:var(--accent-soft);border-color:transparent"><b>${ic('info', 18)} ${B('ডিস্ট্রিবিউটরের বিল — ছবি বা PDF','Distributor’s bill — photos or PDF')}</b><p class="mini" style="margin:4px 0 0;font-size:13.5px">${B('প্রতিটি লাইন (নাম, ব্যাচ, মেয়াদ, MRP, রেট, পরিমাণ, GST) পড়ে নেওয়া হবে। আপনি কাগজের বিলের সাথে মিলিয়ে দেখে এক ট্যাপে স্টকে যোগ করবেন। লম্বা বিল হলে ১০টা পর্যন্ত ছবি একসাথে দিন।','Every line (name, batch, expiry, MRP, rate, qty, GST) is read. You check it against the paper bill, then add to stock in one tap. For a long bill give up to 10 photos together.')}</p></section>
  <section class="card pad" style="margin-bottom:16px"><b>${ic('sheet', 18)} ${B('Excel / CSV স্টক তালিকা','Excel / CSV stock list')}</b><p class="mini" style="font-size:13.5px;margin:4px 0 10px">${B('পুরোনো সফটওয়্যার থেকে স্টক তালিকা বের করে দিন, বা আমাদের টেমপ্লেট ভরুন। লাগবে এই কলামগুলো: name, batch, expiry, mrp, gst, qty ("Item", "Batch No", "Exp", "M.R.P", "GST %", "Stock" নামও চলবে)। ঐচ্ছিক: composition, unit, rate, supplier।','Export the stock list from your old software, or fill our template. Needed columns: name, batch, expiry, mrp, gst, qty (also understood: "Item", "Batch No", "Exp", "M.R.P", "GST %", "Stock"). Optional: composition, unit, rate, supplier.')}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-s" data-act="pick" data-v="csv">${ic('down', 18)}${B('ফাইল বেছে নিন','Choose file')}</button><button class="btn btn-g" data-act="tpl">${ic('down', 18)}${B('টেমপ্লেট ডাউনলোড','Download template')}</button></div></section>
  <details class="card" id="hand"><summary>${ic('edit')} ${B('হাতে একটা লাইন লিখুন','Type one line by hand')}</summary><div style="padding:16px 18px">${handHtml()}</div></details>`;
S.H = {med:'', mid:'', batch:'', exp:'', mrp:'', pack:'1', qty:'', rate:'', sup:'', gst:'', comp:'', unit:'strip', sch:'', err:''};
function handHtml(){
  const H = S.H, m = H.mid ? MAP[H.mid] : null, isNew = H.med.trim() && !m, pack = Math.max(1, +H.pack || 1), q = +H.qty || 0, mrp = +H.mrp || 0, before = m ? stockOf(m) : 0;
  return `<div class="field ddw" style="max-width:520px"><label for="h-med">${B('ওষুধ','Medicine')}</label><input id="h-med" class="input latin" data-in="hmed" value="${esc(H.med)}" list="medl" placeholder="${B('ওষুধের নাম লিখুন…','Type the medicine name…')}"><datalist id="medl">${MEDS.map(x => `<option value="${esc(x.n)}">`).join('')}</datalist>${m ? `<small class="okc" style="margin-top:4px">${ic('check', 14)} ${B('বিক্রি হয় ' + un(m.u) + ' হিসেবে · GST ' + num(m.g) + '% · স্টকে ' + num(before), 'Sold per ' + un(m.u) + ' · GST ' + m.g + '% · in stock ' + before)}</small>` : ''}</div>
  ${isNew ? `<div class="box-w"><b>${ic('plus', 18)} ${B('নতুন ওষুধ:','New medicine:')} <span class="latin">${esc(H.med)}</span></b><div class="hand"><div class="field"><label>${B('সল্ট / উপাদান','Salt / composition')}</label><input class="input" data-in="hcomp" value="${esc(H.comp)}" placeholder="Paracetamol 650 mg"></div><div class="field"><label>GST %</label><select class="input ${H.bad === 'gst' ? 'bad' : ''}" data-in="hgst"><option value="">—</option>${[0, 5, 12, 18].map(g => `<option ${H.gst === String(g) ? 'selected' : ''}>${g}</option>`).join('')}</select></div><div class="field"><label>${B('কী হিসেবে বিক্রি','Sold as')}</label><select class="input" data-in="hunit">${Object.keys(UNITS).map(u => `<option value="${u}" ${H.unit === u ? 'selected' : ''}>${un(u)}</option>`).join('')}</select></div><div class="field"><label>${B('শিডিউল','Schedule')}</label><select class="input" data-in="hsch">${['', 'H', 'H1', 'X', 'G'].map(x => `<option value="${x}" ${H.sch === x ? 'selected' : ''}>${x || B('নেই / OTC','None / OTC')}</option>`).join('')}</select></div></div></div>` : ''}
  <div class="hand"><div class="field"><label for="h-b">${B('ব্যাচ নং','Batch no.')}</label><input id="h-b" class="input latin ${H.bad === 'batch' ? 'bad' : ''}" data-in="hbatch" value="${esc(H.batch)}" placeholder="DL2405"></div>
  <div class="field"><label for="h-e">${B('মেয়াদ (মাস)','Expiry (month)')}</label><input id="h-e" type="month" class="input latin ${H.bad === 'exp' ? 'bad' : ''}" data-in="hexp" value="${esc(H.exp)}"></div>
  <div class="field"><label for="h-m">${B('এক প্যাকের MRP ₹','MRP of one pack ₹')}</label><input id="h-m" class="input latin ${H.bad === 'mrp' ? 'bad' : ''}" inputmode="decimal" data-in="hmrp" value="${esc(H.mrp)}"></div>
  <div class="field"><label for="h-p">${B('এক প্যাকে কত','Units in one pack')}</label><input id="h-p" class="input latin" inputmode="numeric" data-in="hpack" value="${esc(H.pack)}"></div>
  <div class="field"><label for="h-q">${B('কত প্যাক এল','Packs received')}</label><input id="h-q" class="input latin ${H.bad === 'qty' ? 'bad' : ''}" inputmode="numeric" data-in="hqty" value="${esc(H.qty)}"></div>
  <div class="field"><label for="h-r">${B('কেনার রেট / প্যাক ₹','Purchase rate / pack ₹')}</label><input id="h-r" class="input latin" inputmode="decimal" data-in="hrate" value="${esc(H.rate)}" placeholder="${B('লাভ হিসেবের জন্য','for profit')}"></div>
  <div class="field"><label for="h-s">${B('সাপ্লায়ার','Supplier')}</label><select id="h-s" class="input" data-in="hsup"><option value="">—</option>${SUPS.filter(s => s.id !== '_none').map(s => `<option value="${s.id}" ${H.sup === s.id ? 'selected' : ''}>${esc(s.n)}</option>`).join('')}</select></div>
  <div class="field" style="justify-content:flex-end"><button class="btn btn-p btn-lg" data-act="handSave">${ic('check')}${B('স্টকে যোগ করুন','Add to stock')}</button></div></div>
  <p class="mini" id="hcalc" style="font-size:13.5px">${mrp > 0 && q > 0 ? B(`স্টক <b>${num(before)}</b> → <b>${num(before + q * pack)}</b> ${un(m ? m.u : H.unit)} · প্রতি ${un(m ? m.u : H.unit)} MRP <b>${money2(mrp / pack)}</b>`, `Stock <b>${before}</b> → <b>${before + q * pack}</b> ${un(m ? m.u : H.unit)} · MRP <b>${money2(mrp / pack)}</b> per ${un(m ? m.u : H.unit)}`) : ''}</p>
  ${H.err ? `<p class="err" role="alert">${ic('alert', 15)}${H.err}</p>` : ''}`;
}
function addBatch(m, b){ const ex = m.batches.find(x => x.b.toLowerCase() === b.b.toLowerCase() && x.exp === b.exp && Math.abs(x.mrp - b.mrp) < .01); if (ex) ex.q += b.q; else m.batches.push(Object.assign({id:'b' + (bSeq++)}, b)); }
function newMed(n, c, g, u, sch){ const id = 'm' + (MEDS.length + 100); const m = {id, n, c:c || '', g:+g, u:u || 'strip', sch:sch || '', hsn:'3004', low:0, active:true, batches:[]}; MEDS.push(m); MAP[id] = m; return m; }

/* ================= RE-ORDER ================= */
VIEWS.order = () => {
  MEDS.filter(isLow).forEach(m => { if (!m.skipOrder && !ORDER.find(o => o.mid === m.id)) ORDER.push({mid:m.id, q:Math.max(5, lowAt(m) * 2 - stockOf(m)), st:'list', auto:true}); });
  const by = {}; ORDER.forEach(o => { const s = lastSup(MAP[o.mid]); (by[s] = by[s] || []).push(o); });
  const cols = 'minmax(0,2fr) 110px 170px 120px 44px';
  return ph(B('অর্ডার তালিকা','Re-order list'), B('যেসব ওষুধ কম বা শেষ, নিজে থেকেই এখানে আসে। সাপ্লায়ার অনুযায়ী ভাগ করা — এক ট্যাপে হোয়াটসঅ্যাপে অর্ডার পাঠান।','Low and out-of-stock medicines come here by themselves, grouped by supplier — send the order on WhatsApp in one tap.'), `<button class="btn btn-s" data-act="supOpen">${ic('truck')}${B('সাপ্লায়ার','Suppliers')}</button>`)
  + `<div class="toolbar"><div class="ddw" style="flex:1;max-width:460px"><label class="search" style="max-width:none">${ic('search')}<span class="vh">${B('আরও ওষুধ যোগ করুন','Add another medicine')}</span><input class="input" id="oq" placeholder="${B('তালিকায় আরও ওষুধ যোগ করুন…','Add another medicine to the list…')}" autocomplete="off"></label><div id="odd"></div></div></div>`
  + (Object.keys(by).length ? Object.keys(by).map(sid => { const sp = SUPS.find(s => s.id === sid), L = by[sid], sent = L.every(o => o.st === 'sent');
    return `<section class="card flush sup"><div class="ch"><div><b>${esc(sp.n)}</b><span style="display:block" class="latin">${sp.ph ? fph(sp.ph) : B('হোয়াটসঅ্যাপ নম্বর নেই','No WhatsApp number')}</span></div><div class="acts">${sent ? `<span class="st s-ok">${B('অর্ডার পাঠানো হয়েছে','Order sent')}</span><button class="btn btn-p btn-sm" data-act="ordGot" data-v="${sid}">${ic('truck', 16)}${B('মাল এসেছে — স্টকে তুলুন','Goods arrived — add stock')}</button>` : `<button class="btn btn-wa btn-sm" data-act="ordSend" data-v="${sid}">${ic('wa', 16)}${B('হোয়াটসঅ্যাপে অর্ডার পাঠান','Send order on WhatsApp')}</button>`}</div></div>
    ${hdr(cols, [[B('ওষুধ','Medicine')], [B('এখন স্টক','In stock'), 'r'], [B('কত চাই','Order qty')], [B('আনুমানিক খরচ','Approx. cost'), 'r'], ['']])}
    ${L.map(o => { const m = MAP[o.mid], st = stockOf(m), rate = (m.batches.slice(-1)[0] || {rate:0}).rate; return `<div class="gt" style="--cols:${cols}"><span class="dname full"><b class="latin">${esc(m.n)}</b><small>${esc(m.c)}${o.auto ? ' · ' + B('নিজে থেকে যোগ হয়েছে','added automatically') : ''}</small></span><span class="r"><span class="lm">${B('স্টক','Stock')}</span><b class="${st ? '' : 'due'}">${num(st)}</b> <small style="display:inline">${un(m.u)}</small></span><span><span class="stp"><button data-act="oq" data-id="${o.mid}" data-d="-1">−</button><input data-oq="${o.mid}" inputmode="numeric" value="${o.q}" aria-label="${B('কত চাই','Order quantity')}"><button data-act="oq" data-id="${o.mid}" data-d="1">+</button></span></span><span class="r amt">${rate ? money(rate * o.q) : '—'}</span><button class="ibtn" style="width:40px;height:40px" data-act="ordDel" data-id="${o.mid}" aria-label="${B('বাদ দিন','Remove')}">${ic('x', 18)}</button></div>`; }).join('')}</section>`; }).join('')
  : `<div class="card empty">${ic('check')}<div>${B('অর্ডার তালিকা ফাঁকা — সব ওষুধের স্টক ঠিক আছে','The list is empty — everything is in stock')}</div></div>`);
};

/* ================= BILLS ================= */
VIEWS.bills = () => {
  const from = today0(); from.setDate(from.getDate() - (S.blR - 1)); const q = S.blQ.trim().toLowerCase();
  const inR = SALES.filter(s => s.at >= from), live = inR.filter(s => !s.cancelled), walk = live.filter(s => s.kind === 'walkin'), ipd = live.filter(s => s.kind === 'ipd');
  const sum = (a, f) => a.reduce((x, s) => x + f(s), 0), cash = sum(walk.filter(s => s.pay === 'cash'), s => s.total), dig = sum(walk.filter(s => s.pay === 'upi' || s.pay === 'card'), s => s.total), cred = sum(walk.filter(s => s.pay === 'credit'), s => s.total - (s.paid || 0));
  const L = inR.filter(s => !q || s.no.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || (s.ph || '').includes(q)).slice().reverse();
  const cols = '120px minmax(0,1.1fr) minmax(0,1.5fr) 110px 120px 200px';
  const payTag = s => s.cancelled ? `<span class="tag t-r">${B('বাতিল','Cancelled')}</span>` : s.kind === 'ipd' ? `<span class="tag t-b">${B('রোগীর বিলে','Patient bill')}</span>` : s.pay === 'credit' ? (s.total - (s.paid || 0) > 0 ? `<span class="tag t-a">${B('ধারে · বাকি ','Credit · due ')}${money(s.total - (s.paid || 0))}</span>` : `<span class="tag t-g">${B('ধার শোধ','Credit paid')}</span>`) : `<span class="tag t-g">${({cash:B('নগদ','Cash'), upi:'UPI', card:B('কার্ড','Card')})[s.pay]}</span>`;
  return ph(B('বিল ও বিক্রি','Bills & sales'), B('প্রতিটি বিল খুলুন, প্রিন্ট করুন, হোয়াটসঅ্যাপে পাঠান বা ধারের টাকা নিন','Open, print or WhatsApp any bill, or collect credit'), `<button class="btn btn-s" data-act="h1Open">${ic('shield')}${B('শিডিউল H1 রেজিস্টার','Schedule H1 register')}</button>`)
  + `<div class="toolbar"><div class="seg">${[[1, B('আজ','Today')], [7, B('৭ দিন','7 days')], [30, B('৩০ দিন','30 days')]].map(([d, l]) => `<button data-act="blR" data-v="${d}" aria-pressed="${S.blR === d}">${l}</button>`).join('')}</div><label class="search">${ic('search')}<span class="vh">${B('বিল নং, নাম বা মোবাইল','Bill no., name or mobile')}</span><input class="input" id="blq" type="search" value="${esc(S.blQ)}" placeholder="${B('বিল নং, নাম বা মোবাইল খুঁজুন…','Search bill no., name or mobile…')}"></label></div>
  <div class="kpis"><div class="card kpi"><span class="ki">${ic('bill', 22)}</span><div><span>${B('কাউন্টারে বিক্রি','Counter sales')} (${num(walk.length)})</span><b>${money(sum(walk, s => s.total))}</b><small>${B('নগদ','Cash')} ${money(cash)} · UPI/${B('কার্ড','card')} ${money(dig)}</small></div></div>
  <div class="card kpi w"><span class="ki">${ic('clock', 22)}</span><div><span>${B('ধারে বাকি','Credit due')}</span><b>${money(cred)}</b></div></div>
  <div class="card kpi i"><span class="ki">${ic('bed', 22)}</span><div><span>${B('ভর্তি রোগীকে দেওয়া','Issued to admitted')} (${num(ipd.length)})</span><b>${money(sum(ipd, s => s.total))}</b></div></div>
  ${isOwner() ? `<div class="card kpi"><span class="ki">${ic('rupee', 22)}</span><div><span>${B('কাউন্টারে লাভ (বিক্রি − কেনা)','Counter profit (sale − cost)')}</span><b class="okc">${money(sum(walk, s => s.total - s.cost))}</b></div></div>` : `<div class="card kpi"><span class="ki">${ic('rupee', 22)}</span><div><span>${B('মোট বিল','Bills')}</span><b>${num(live.length)}</b></div></div>`}</div>
  <section class="card flush" id="bllist">${hdr(cols, [[B('সময়','Time')], [B('বিল','Bill')], [B('ক্রেতা / রোগী','Customer / patient')], [B('টাকা','Amount'), 'r'], [B('কীভাবে','Paid by')], ['']])}
  ${L.length ? L.map(s => `<div class="gt" style="--cols:${cols};${s.cancelled ? 'opacity:.6' : ''}"><span class="mini">${fd(s.at)}<br>${tm(s.at)}</span><span class="latin"><b>${s.no}</b><small>${s.h1 ? '<span class="tag t-a">H1</span>' : ''}${s.lines.length} ${B('টি ওষুধ','items')}</small></span><span class="full dname"><b>${esc(s.name)}</b><small class="latin">${fph(s.ph)}${s.doc ? ' · ' + esc(s.doc) : ''}</small></span><b class="r amt">${s.kind === 'ipd' ? money2(s.total) : money(s.total)}</b><span>${payTag(s)}</span>
    <span class="acts" style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn btn-s btn-sm" data-act="billOpen" data-no="${s.no}">${ic('file', 16)}PDF</button>${s.ph ? `<button class="btn btn-s btn-sm" data-act="billWa" data-no="${s.no}" aria-label="WhatsApp">${ic('wa', 16)}</button>` : ''}${!s.cancelled && s.pay === 'credit' && s.total - (s.paid || 0) > 0 ? `<button class="btn btn-p btn-sm" data-act="credCol" data-no="${s.no}">${B('টাকা নিন','Collect')}</button>` : ''}${isOwner() && !s.cancelled ? `<button class="btn btn-g btn-sm" style="color:var(--danger)" data-act="cancelBill" data-no="${s.no}">${B('বাতিল','Cancel')}</button>` : ''}</span></div>`).join('')
  : `<div class="empty">${ic('file')}<div>${B('এই সময়ে কোনো বিল নেই','No bills in this period')}</div></div>`}</section>`;
};

/* ================= DOCS ================= */
const DK = {purchase:['কেনার বিল','Purchase bill', 'truck'], rx:['প্রেসক্রিপশন','Prescription', 'file'], return:['ফেরতের স্লিপ','Return slip', 'back'], other:['অন্য কাগজ','Other', 'img']};
VIEWS.docs = () => { const L = DOCS.filter(d => S.dcF === 'all' || d.kind === S.dcF).slice().sort((a, b) => b.at - a.at);
  return ph(B('ছবি ও কাগজ','Photos & papers'), B('স্টক তোলার সময়ের কেনার বিল, প্রেসক্রিপশন আর ফেরতের স্লিপ — সব এক জায়গায় রাখা থাকে','Purchase bills, prescriptions and return slips — all kept in one place'), `<button class="btn btn-p" data-act="pick" data-v="doc">${ic('camera')}${B('ছবি / PDF রাখুন','Save a photo / PDF')}</button>`)
  + `<div class="chips" style="margin-bottom:14px">${[['all', B('সব','All')]].concat(Object.keys(DK).map(k => [k, DK[k][S.lang === 'bn' ? 0 : 1]])).map(([k, l]) => `<button class="chip" data-act="dcF" data-v="${k}" aria-pressed="${S.dcF === k}">${l}<span class="n">${num(k === 'all' ? DOCS.length : DOCS.filter(d => d.kind === k).length)}</span></button>`).join('')}</div>
  <div class="drop" data-drop="doc">${ic('down', 26)}<div><b>${B('ছবি বা PDF এখানে টেনে এনে ছাড়ুন','Drag and drop a photo or PDF here')}</b></div></div>
  ${L.length ? '' : `<div class="card empty">${ic('img')}<div>${B('এখনও কিছু রাখা হয়নি','Nothing saved yet')}</div></div>`}<div class="docs">${L.map(d => `<section class="card doc" data-act="docOpen" data-id="${d.id}" style="cursor:pointer"><div class="th">${d.img ? `<img src="${d.img}" alt="">` : ic(DK[d.kind][2], 36)}</div><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div style="min-width:0"><b style="display:block">${esc(d.party)}</b><small class="mut latin">${esc(d.ref)}</small></div><span class="tag t-d">${DK[d.kind][S.lang === 'bn' ? 0 : 1]}</span></div><div class="mini">${fd(d.at, {day:'numeric', month:'short', year:'numeric'})} · ${B(num(d.pages) + ' পাতা', d.pages + ' page' + (d.pages > 1 ? 's' : ''))}${d.amt ? ' · ' + money(d.amt) : ''}</div></section>`).join('')}</div>`; };

/* ================= SETTINGS ================= */
S.F = null;
VIEWS.settings = () => { const F = S.F || (S.F = Object.assign({}, SET)), gp = F.mode === 'none' ? '' : gstinProblem(F.gstin), dlOk = /\d/.test(F.dl) && F.dl.trim().length >= 5;
  return ph(B('সেটিংস','Settings'), B('প্রতিটি বিলে যে তথ্য ছাপা হবে','Details printed on every bill'))
  + `<section class="card pad" style="margin-bottom:16px"><h2 style="font-size:17px;margin:0 0 4px">${B('ফার্মেসির তথ্য','Pharmacy details')}</h2><p class="mini" style="font-size:13.5px;margin:0 0 14px">${B('কাউন্টারে বিক্রি হওয়া ওষুধে GST লাগে। আপনার ফার্মেসি GST-তে কীভাবে রেজিস্টার্ড, সেটা বেছে নিন (নিশ্চিত না হলে CA-কে জিজ্ঞেস করুন)।','Counter sales of medicines are taxable. Choose how your pharmacy is registered for GST (ask your CA if unsure).')}</p>
  <div class="row2"><div class="field"><label for="s-n">${B('ফার্মেসির নাম','Pharmacy name')} *</label><input id="s-n" class="input" data-in="s.name" value="${esc(F.name)}"></div><div class="field"><label for="s-p">${B('ফোন','Phone')}</label><input id="s-p" class="input latin" inputmode="numeric" data-in="s.phone" value="${esc(F.phone)}"></div></div>
  <div class="field"><label for="s-a">${B('ঠিকানা','Address')}</label><input id="s-a" class="input" data-in="s.addr" value="${esc(F.addr)}"></div>
  <div class="row2"><div class="field"><label for="s-m">${B('GST রেজিস্ট্রেশন','GST registration')}</label><select id="s-m" class="input" data-in="s.mode">${[['regular', B('রেগুলার GST — ট্যাক্স ইনভয়েস (CGST + SGST)','Regular GST — TAX INVOICE (CGST + SGST)')], ['composition', B('কম্পোজিশন স্কিম — বিল অফ সাপ্লাই (ট্যাক্স দেখানো হয় না)','Composition — BILL OF SUPPLY (no tax shown)')], ['none', B('GSTIN নেই — ক্যাশ মেমো','No GSTIN — CASH MEMO')]].map(([v, l]) => `<option value="${v}" ${F.mode === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
  ${F.mode !== 'none' ? `<div class="field"><label for="s-g">${B('ফার্মেসির GSTIN','Pharmacy GSTIN')}</label><input id="s-g" class="input latin ${F.gstin && gp ? 'bad' : ''}" maxlength="15" data-in="s.gstin" value="${esc(F.gstin)}" style="text-transform:uppercase"><small id="gstst" class="${gp ? 'due' : 'okc'}" style="font-weight:600">${F.gstin ? (gp || '✓ ' + B('GSTIN ঠিক আছে','GSTIN is valid')) : ''}</small></div>` : '<div></div>'}</div>
  <div class="row2"><div class="field"><label for="s-dl">${B('ড্রাগ লাইসেন্স নং (ফর্ম ২০ / ২১)','Drug licence no(s). (Form 20 / 21)')} *</label><input id="s-dl" class="input latin" data-in="s.dl" value="${esc(F.dl)}"><small id="dlst" class="${dlOk ? 'okc' : 'due'}" style="font-weight:600">${F.dl ? (dlOk ? '✓ ' + B('লাইসেন্স নম্বর ঠিক দেখাচ্ছে','Looks like a valid licence number') : B('সার্টিফিকেটে যেমন লেখা, ঠিক তেমন লিখুন','Write it exactly as on the certificate')) : ''}</small></div>
  <div class="field"><label for="s-ph">${B('রেজিস্টার্ড ফার্মাসিস্ট','Registered pharmacist')}</label><input id="s-ph" class="input" data-in="s.pharm" value="${esc(F.pharm)}"></div></div>
  <div class="row2"><div class="field"><label for="s-w">${B('মালিকের হোয়াটসঅ্যাপ (রাত ৯টার রিপোর্ট)','Owner’s WhatsApp (9 PM report)')}</label><input id="s-w" class="input latin" inputmode="numeric" maxlength="10" data-in="s.ownerWa" value="${esc(F.ownerWa)}"><small class="mut">${B('প্রতি রাত ৯টায় দিনের বিক্রি, কম স্টক আর মেয়াদের রিপোর্ট এই নম্বরে যাবে। ফাঁকা রাখলে বন্ধ।','Every night at 9 PM the day’s sales, low stock and expiry report comes here. Leave empty to stop it.')}</small></div>
  <div class="field"><label for="s-f">${B('বিলের নিচের লাইন (ঐচ্ছিক)','Line at the bottom of bills (optional)')}</label><input id="s-f" class="input" data-in="s.footer" value="${esc(F.footer)}"></div></div>
  ${S.setErr ? `<p class="err" role="alert">${ic('alert', 15)}${S.setErr}</p>` : ''}<button class="btn btn-p btn-lg" data-act="setSave">${ic('check')}${B('তথ্য সেভ করুন','Save details')}</button></section>
  <section class="card pad"><h2 style="font-size:17px;margin:0 0 4px">${ic('sign', 18)} ${B('বিলে সই ও স্ট্যাম্প (মালিক)','Signature & stamp on bills (owner)')}</h2><p class="mini" style="font-size:13.5px;margin:0 0 14px">${B('সাদা কাগজে সই (আর স্ট্যাম্প) করে ভালো আলোয় ওপর থেকে ছবি তুলুন — সাদা কাগজ নিজে থেকেই সরে যাবে।','Sign (and stamp) on plain white paper, take a clear photo from above in good light — the white paper is removed by itself.')}</p>
  <div class="row2"><div class="field"><label for="s-sn">${B('যিনি সই করছেন (ঐচ্ছিক)','Name of the person who signs (optional)')}</label><input id="s-sn" class="input" data-in="s.signer" value="${esc(F.signer)}" placeholder="${B('যেমন: শুভজিৎ কর (মালিক)','e.g. Subhajit Kar (Proprietor)')}"></div><div class="field"><span class="lab">${B('সই বা স্ট্যাম্পের ছবি','Signature or stamp picture')}</span><button class="btn btn-s btn-lg" data-act="pick" data-v="sign" data-drop="sign">${ic('camera')}${B('ছবি বেছে নিন বা এখানে টেনে আনুন','Choose or drop a picture')}</button></div></div>
  <div class="lab" style="margin-bottom:6px">${B('বিলে যেমন দেখাবে','How it will look on the bill')}</div><div class="sigp"><div style="width:240px;text-align:center;font-size:12px">For ${esc(F.name)}${F.sign ? `<img src="${F.sign}" alt="" style="max-width:200px;max-height:70px;display:block;margin:6px auto 2px">` : `<div style="height:56px;display:grid;place-items:center;color:#999">${B('এখনও সই নেই','No signature yet')}</div>`}<div style="border-top:1px solid #14201b;padding-top:4px;font-weight:600">${F.pharm ? 'Registered Pharmacist' : 'Authorised Signatory'}</div>${F.signer ? `<div>${esc(F.signer)}</div>` : ''}</div></div>
  <div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-p" data-act="setSave">${ic('check')}${B('সই সেভ করুন','Save signature')}</button>${F.sign ? `<button class="btn btn-s" data-act="signDel">${B('সরিয়ে দিন','Remove')}</button>` : ''}</div></section>`; };

/* ================= HELP ================= */
const GUIDES = [
  [['কাউন্টারে বিল করবেন কীভাবে','How to make a counter bill'], [['বাঁদিকের সোনালি "নতুন বিল" চাপুন।','Tap the gold “New bill”.'], ['ক্রেতার মোবাইল লিখলে পুরোনো ক্রেতার নাম নিজেই আসবে।','Type the mobile — a returning customer’s name fills in.'], ['ওষুধের ২-৩টে অক্ষর লিখে Enter চাপুন, পরিমাণ − / + দিয়ে ঠিক করুন।','Type 2–3 letters, press Enter, set quantity with − / +.'], ['কীভাবে দিলেন বেছে "সেভ করে বিল তৈরি করুন" চাপুন।','Choose how they paid and tap “Save & make bill”.']]],
  [['ভর্তি রোগীকে ওষুধ দেওয়া','Medicines for an admitted patient'], [['উপরে "ভর্তি রোগী" বেছে রোগীকে বাছুন।','Choose “Admitted patient” and pick the patient.'], ['ওষুধ যোগ করুন — দাম রোগীর নার্সিং হোমের বিলে যাবে।','Add medicines — they go onto the nursing-home bill.'], ['ওয়ার্ডের জন্য ইস্যু স্লিপ প্রিন্ট করুন।','Print the issue slip for the ward.']]],
  [['শিডিউল H1 ওষুধ বিক্রি','Selling Schedule H1 medicines'], [['বিলে H1 ওষুধ যোগ হলে হলুদ বাক্স আসবে।','A yellow box appears when an H1 medicine is added.'], ['ডাক্তারের নাম, রোগীর আর ডাক্তারের ঠিকানা লিখুন।','Write the doctor’s name and both addresses.'], ['বিল ও বিক্রি → H1 রেজিস্টার থেকে রেজিস্টার প্রিন্ট করুন।','Print the register from Bills → H1 register.']]],
  [['ডিস্ট্রিবিউটরের বিলের ছবি থেকে স্টক তোলা','Adding stock from a bill photo'], [['স্টক যোগ → "বিলের ছবি" চাপুন বা ছবি টেনে আনুন।','Add stock → “Bill photos”, or drop the photo.'], ['পড়া লাইনগুলো কাগজের বিলের সাথে মিলিয়ে দেখুন — লাল ঘর ভরতেই হবে।','Check each line against the paper bill — red boxes must be filled.'], ['বিলের মোট টাকা লিখুন; মিললে সবুজ টিক আসবে।','Type the bill total; a green tick shows when it matches.'], ['"টিক দেওয়া লাইন স্টকে যোগ করুন" চাপুন।','Tap “Add ticked lines to stock”.']]],
  [['Excel বা CSV থেকে পুরোনো স্টক আনা','Importing old stock from Excel / CSV'], [['টেমপ্লেট ডাউনলোড করুন বা পুরোনো সফটওয়্যারের তালিকা নিন।','Download the template or export from your old software.'], ['name, batch, expiry, mrp, gst, qty কলাম থাকতেই হবে।','name, batch, expiry, mrp, gst, qty columns are required.'], ['ফাইল দিন — যেসব সারিতে তথ্য কম, সেগুলো বাদ যাবে আর কারণ দেখাবে।','Give the file — incomplete rows are skipped with the reason.']]],
  [['কম স্টক আর অর্ডার','Low stock and re-ordering'], [['স্টক সতর্কতার মাত্রা স্টক পাতায় বদলান।','Change the alert level on the Stock page.'], ['কম ওষুধ নিজে থেকেই অর্ডার তালিকায় আসে।','Low medicines come to the re-order list by themselves.'], ['সাপ্লায়ারের পাশে "হোয়াটসঅ্যাপে অর্ডার পাঠান" চাপুন।','Tap “Send order on WhatsApp” next to the supplier.'], ['মাল এলে "মাল এসেছে — স্টকে তুলুন" চাপুন।','When goods arrive, tap “Goods arrived — add stock”.']]],
  [['মেয়াদ পেরোনো ওষুধ','Expired medicines'], [['মেয়াদ পেরোনো ব্যাচ কখনও বিক্রিতে আসে না।','Expired batches are never sold.'], ['স্টক → "মেয়াদ পেরোনো" দিয়ে দেখুন।','See them in Stock → “Expired”.'], ['"সাপ্লায়ারকে ফেরত" দিয়ে ফেরত দিন — স্টক থেকে বাদ যাবে।','Use “Return to supplier” — it leaves stock.']]],
  [['ছাড় দেওয়া','Giving a discount'], [['"ছাড়ের হিসেব" চাপুন।','Tap “Calculator”.'], ['% ছাড়, টাকা ছাড়, "ক্রেতা দেবেন" বা প্রতি ওষুধে % — যেকোনোটা বেছে নিন।','Choose % off, ₹ off, “customer pays” or % per medicine.'], ['কেনা দামের নিচে গেলে লাল সতর্কতা দেখাবে।','A red warning shows if you go below cost.']]],
  [['বিল বাতিল বা ধার আদায়','Cancelling a bill or collecting credit'], [['বিল ও বিক্রি পাতায় বিলটা খুঁজুন।','Find the bill in Bills & sales.'], ['ধারের বিলে "টাকা নিন" চাপুন।','On a credit bill tap “Collect”.'], ['মালিক "বাতিল" চাপলে কারণ লিখতে হবে; ওষুধ স্টকে ফিরে যাবে।','Owner taps “Cancel” and writes a reason; stock comes back.']]],
  [['GST আর ড্রাগ লাইসেন্স','GST and drug licence'], [['সেটিংসে GST রেজিস্ট্রেশনের ধরন বেছে নিন।','Choose the GST type in Settings.'], ['GSTIN লিখলে সাথে সাথে ঠিক-ভুল দেখাবে।','The GSTIN is checked as you type.'], ['কোন ওষুধে কত GST, আপনার CA-র সাথে মিলিয়ে নিন।','Confirm each medicine’s GST rate with your CA.']]]
];
VIEWS.help = () => ph(B('সাহায্য','Help'), B('ফার্মেসির রোজকার কাজ ধাপে ধাপে','Everyday pharmacy tasks, step by step'), `<a class="btn btn-s" href="tel:+918017465987">${ic('phone')}${B('সাপোর্টে ফোন','Call support')}</a>`)
  + `<section class="card flush help">${GUIDES.map((g, i) => `<details ${i === 0 ? 'open' : ''}><summary><span class="n">${num(i + 1)}</span>${g[0][S.lang === 'bn' ? 0 : 1]}</summary><ol>${g[1].map(s => `<li>${s[S.lang === 'bn' ? 0 : 1]}</li>`).join('')}</ol></details>`).join('')}</section>`;

/* ================= MODALS ================= */
function openM(m){ S.modal = m; renderM(); $('scrim').classList.add('on'); $('modal').classList.add('on'); setTimeout(() => { const f = $('modal').querySelector('[autofocus],input:not([type=checkbox]),select'); if (f) f.focus(); }, 40); }
function closeM(){ S.modal = null; $('scrim').classList.remove('on'); $('modal').classList.remove('on'); $('modal').innerHTML = ''; }
function renderM(){ const m = S.modal; if (!m) return; const r = MODALS[m.type](m); $('modal').className = 'modal on' + (r.wide ? ' wide' : '');
  $('modal').innerHTML = `<div class="mh"><div><h2 id="mt">${r.title}</h2>${r.sub ? `<p>${r.sub}</p>` : ''}</div><button class="ibtn" data-act="close" aria-label="${B('বন্ধ করুন','Close')}">${ic('x')}</button></div><div class="mb">${r.body}</div>${r.foot ? `<div class="mf">${r.foot}</div>` : ''}`; $('modal').setAttribute('aria-labelledby', 'mt'); if (r.wide === 'xl') $('modal').style.width = 'min(1240px,calc(100vw - 32px))'; else $('modal').style.width = ''; }
const MODALS = {};
const findSale = no => SALES.find(s => s.no === no);
MODALS.done = m => { const s = findSale(m.no), t0 = today0(), td = SALES.filter(x => x.at >= t0 && !x.cancelled && x.kind === 'walkin');
  return {title:(s.kind === 'ipd' ? B('ইস্যু ','Issued ') : B('বিল ','Bill ')) + s.no, body:`<div class="okbig ok-anim"><div class="c">${ic('check')}</div><h3>${s.kind === 'ipd' ? money2(s.total) : money(s.total)}</h3><p class="mut" style="margin:4px 0 0">${esc(s.name)} · ${s.kind === 'ipd' ? B('নার্সিং হোমের বিলে যোগ হয়েছে','added to the nursing-home bill') : ({cash:B('নগদ','Cash'), upi:'UPI', card:B('কার্ড','Card'), credit:B('ধারে','Credit')})[s.pay]}</p><p class="mini" style="margin:6px 0 0">${B('আজ এখন পর্যন্ত ' + money(td.reduce((a, x) => a + x.total, 0)) + ' · ' + num(td.length) + 'টি বিল', 'Today so far ' + money(td.reduce((a, x) => a + x.total, 0)) + ' from ' + td.length + ' bills')}</p></div>
    ${s.before ? `<div class="card" style="padding:4px 0;margin-top:8px">${[...new Set(s.lines.map(l => l.mid))].filter(id => MAP[id] && s.before[id] != null).map(id => { const md = MAP[id]; return `<div class="li"><span class="tt"><b class="latin">${esc(md.n)}</b></span><span class="stkline">${B('স্টক','Stock')} <b>${num(s.before[id])}</b> → <b class="${isLow(md) ? 'due' : ''}">${num(stockOf(md))}</b> ${un(md.u)}</span></div>`; }).join('')}</div>` : ''}
    <div class="box-g" id="donePdf" style="margin-top:10px">${lvDoneMsg(s)}</div>`,
  foot:`<button class="btn btn-s btn-lg" data-act="billPrint" data-no="${s.no}">${ic('print')}${B('খুলুন / প্রিন্ট','Open / print')}</button>${s.ph ? `<button class="btn btn-wa btn-lg" data-act="billWa" data-no="${s.no}">${ic('wa')}WhatsApp</button>` : ''}<button class="btn btn-p btn-lg grow" data-act="newBill" autofocus>${ic('plus')}${B('নতুন বিল','New bill')}</button>`}; };
MODALS.subst = m => { const a = MAP[m.id], b = MAP[m.sub]; return {title:B('স্টক নেই','Out of stock'), body:`<p style="margin-top:0"><b class="latin">${esc(a.n)}</b> ${B('স্টকে নেই।','is out of stock.')}</p><div class="box-g" style="color:var(--text);font-weight:500">⇄ ${B('একই সল্টের ওষুধ স্টকে আছে:','Same salt in stock:')}<br><b class="latin">${esc(b.n)}</b> · ${esc(b.c)} · ${B('স্টকে ' + num(stockOf(b)), stockOf(b) + ' in stock')} · ${money2(sell(b)[0].mrp)}</div><p class="mini">${B('বদলে দেওয়ার আগে ক্রেতা বা ডাক্তারকে জানিয়ে নিন।','Tell the customer or doctor before substituting.')}</p>`,
  foot:`<button class="btn btn-s btn-lg" data-act="addOrder" data-id="${a.id}">${ic('cart')}${B('অর্ডার তালিকায়','To re-order list')}</button><button class="btn btn-p btn-lg grow" data-act="substGo" data-id="${b.id}">${ic('check')}${B('এটা যোগ করুন','Add this one')}</button>`}; };
MODALS.disc = m => { const P = S.P, base = discBase(), c = discCalc(m), prof = c.pay - base.cost;
  const tabs = [['pct', B('বিলে % ছাড়','% off bill')], ['rs', B('₹ ছাড়','₹ off')], ['pay', B('ক্রেতা দেবেন','Customer pays')], ['per', B('প্রতি ওষুধে %','% per medicine')]];
  return {title:B('ছাড়ের হিসেব','Discount calculator'), body:`<div class="seg" style="flex-wrap:wrap;margin-bottom:14px">${tabs.map(([k, l]) => `<button data-act="dMode" data-v="${k}" aria-pressed="${m.mode === k}">${l}</button>`).join('')}</div>
    ${m.mode === 'per' ? base.lines.map(l => `<div class="li" style="padding:10px 0"><span class="tt"><b class="latin">${esc(l.name)}</b><span>${money2(l.mrp)}</span></span><input class="input latin" style="width:90px;min-height:44px" inputmode="decimal" data-dper="${l.id}" value="${esc(m.per[l.id] || '')}" placeholder="0 %" aria-label="% ${esc(l.name)}"></div>`).join('') + `<p class="mini">${B('বিলে সব ওষুধের জন্য একটাই ছাড় % দেখাবে; মোট টাকা একই থাকবে।','The bill shows one discount % for all; the total is the same.')}</p>`
    : `<div class="field"><label for="dv">${m.mode === 'pct' ? B('পুরো বিলে ছাড় (%)','Discount on whole bill (%)') : m.mode === 'rs' ? B('পুরো বিল থেকে কত টাকা কম (₹)','Rupees off the whole bill (₹)') : B('ক্রেতা শেষে কত দেবেন (₹)','Customer will pay (₹, final)')}</label><input id="dv" class="input latin" inputmode="decimal" data-dv="1" value="${esc(m.v)}" placeholder="${m.mode === 'pay' ? Math.floor(base.mrp / 10) * 10 : m.mode === 'pct' ? '10' : '50'}"></div>`}
    <div class="cart" id="dres">${dresHtml(base, c, prof)}</div>`,
  foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="dApply">${ic('check')}${B('বিলে বসান','Apply to the bill')}</button>`}; };
function discBase(){ let mrp = 0, cost = 0; const lines = []; S.P.cart.forEach(c => { const m = MAP[c.mid]; let g = 0, k = 0; alloc(m, c.q).forEach(l => { g += l.q * l.b.mrp; k += l.q * l.b.rate; }); mrp += g; cost += k; lines.push({id:c.mid, name:m.n, mrp:r2(g), cost:k}); }); return {mrp:r2(mrp), cost:r2(cost), lines}; }
function discCalc(m){ const B0 = discBase(), v = +m.v || 0; let off = 0;
  if (m.mode === 'pct') off = B0.mrp * Math.min(100, Math.max(0, v)) / 100; if (m.mode === 'rs') off = Math.min(B0.mrp, Math.max(0, v)); if (m.mode === 'pay') off = m.v === '' ? 0 : Math.min(B0.mrp, Math.max(0, B0.mrp - v));
  if (m.mode === 'per') B0.lines.forEach(l => off += l.mrp * Math.min(100, Math.max(0, +m.per[l.id] || 0)) / 100);
  const pct = B0.mrp ? Math.round(off / B0.mrp * 10000) / 100 : 0; return {pct, off:B0.mrp * pct / 100, pay:B0.mrp - B0.mrp * pct / 100}; }
const dresHtml = (b, c, prof) => `<div class="r"><span>${B('MRP মোট','MRP total')}</span><span class="amt">${money2(b.mrp)}</span></div><div class="r okc"><span>${B('ছাড়','Discount')} (${num(c.pct)}%)</span><span class="amt">−${money2(c.off)}</span></div><div class="r tot"><span>${B('ক্রেতা দেবেন','Customer pays')}</span><span>${money(c.pay)}</span></div>${isOwner() ? `<div class="r mini"><span>${B('আপনার কেনা দাম','Your purchase cost')}</span><span>${money2(b.cost)}</span></div><div class="r mini"><span>${B('এই বিলে লাভ (আনুমানিক)','Profit on this bill (approx.)')}</span><b class="${prof < 0 ? 'due' : 'okc'}">${money(prof)}</b></div>` : ''}${prof < 0 ? `<div class="box-r" style="margin:6px 0 0">${ic('alert', 15)} ${B('এই ছাড় আপনার লাভের চেয়ে বেশি — কেনা দামের নিচে বিক্রি হবে।','This discount is more than your profit — you will sell below cost.')}</div>` : ''}`;
MODALS.med = m => { const md = MAP[m.id], cols = '110px 90px 90px 90px 80px minmax(0,1fr) 100px';
  return {title:`<span class="latin">${esc(md.n)}</span>`, sub:`${esc(md.c)} · GST ${num(md.g)}% · HSN ${md.hsn} · ${B('বিক্রি হয় ' + un(md.u) + ' হিসেবে · সতর্কতা ' + num(lowAt(md)) + ' ' + un(md.u) + '-এ', 'sold per ' + un(md.u) + ' · alert at ' + lowAt(md))}${md.sch ? ' · Schedule ' + md.sch : ''}`, wide:true,
  body:`<div class="card flush">${hdr(cols, [[B('ব্যাচ','Batch')], [B('মেয়াদ','Expiry')], ['MRP', 'r'], [B('রেট','Rate'), 'r'], [B('পরিমাণ','Qty'), 'r'], [B('সাপ্লায়ার','Supplier')], ['']])}${md.batches.length ? md.batches.slice().sort((a, b) => a.exp.localeCompare(b.exp)).map(b => `<div class="gt" style="--cols:${cols}"><b class="latin">${esc(b.b)}</b><span>${fexp(b.exp)} ${isExp(b.exp) ? `<span class="tag t-r">${B('শেষ','Expired')}</span>` : daysTo(b.exp) <= 90 ? `<span class="tag t-a">${B('শিগগির','Soon')}</span>` : ''}</span><span class="r">${money2(b.mrp)}</span><span class="r">${isOwner() ? money2(b.rate) : '—'}</span><b class="r">${num(b.q)}</b><small>${esc((SUPS.find(s => s.id === b.sup) || {}).n || '')}</small><span class="acts" style="display:flex">${isOwner() ? `<button class="btn btn-s btn-sm" data-act="corr" data-id="${md.id}" data-b="${b.id}">${B('সংশোধন','Correct')}</button>` : ''}</span></div>`).join('') : `<div class="empty">${B('স্টক নেই','No stock')}</div>`}</div>
    ${stockOf(md) <= 0 ? `<div class="box-w" style="margin-top:12px"><b>${ic('cart', 18)} ${B('স্টক শেষ','Out of stock')}</b>${B('অর্ডার তালিকায় যোগ করতে নিচের বোতাম চাপুন।','Tap the button below to add it to the re-order list.')}</div>` : ''}`,
  foot:`<button class="btn btn-s" data-act="medEdit" data-id="${md.id}">${ic('edit')}${B('ওষুধ বদলান','Edit medicine')}</button><button class="btn btn-s" data-act="addOrder" data-id="${md.id}">${ic('cart')}${B('অর্ডার তালিকায়','To re-order list')}</button><button class="btn btn-p grow" data-act="toHand" data-id="${md.id}">${ic('plus')}${B('স্টক যোগ','Add stock')}</button>`}; };
MODALS.corr = m => { const md = MAP[m.id], b = md.batches.find(x => x.id === m.b); return {title:B('স্টক সংশোধন','Correct stock'), sub:`<span class="latin">${esc(md.n)} · ${esc(b.b)}</span> · ${B('এখন','now')} ${num(b.q)}`, body:`<div class="field"><label for="cq">${B('তাকে গুনে যা পেলেন','Counted on the shelf')}</label><input id="cq" class="input latin ${m.err === 'q' ? 'bad' : ''}" inputmode="numeric" data-mf="q" value="${esc(m.q)}"></div><div class="field"><label for="cr">${B('কারণ','Reason')} *</label><input id="cr" class="input ${m.err === 'r' ? 'bad' : ''}" data-mf="r" value="${esc(m.r)}" placeholder="${B('যেমন: ভাঙা, ভুল গোনা','e.g. broken, counted wrong')}"></div>${m.err ? `<p class="err">${m.err === 'q' ? B('সঠিক সংখ্যা লিখুন','Enter a valid number') : B('কারণ লিখুন','Write the reason')}</p>` : ''}`, foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="corrSave">${ic('check')}${B('সংশোধন করুন','Correct')}</button>`}; };
MODALS.medEdit = m => { const f = m.f; return {title:m.id ? B('ওষুধ বদলান','Edit medicine') : B('নতুন ওষুধ','New medicine'), body:`<div class="row2"><div class="field"><label for="me-n">${B('নাম','Name')} *</label><input id="me-n" class="input latin ${m.err ? 'bad' : ''}" data-mf="n" value="${esc(f.n)}"></div><div class="field"><label for="me-c">${B('সল্ট / উপাদান','Salt / composition')}</label><input id="me-c" class="input" data-mf="c" value="${esc(f.c)}"></div>
  <div class="field"><label>GST %</label><select class="input" data-mf="g">${[0, 5, 12, 18].map(g => `<option ${+f.g === g ? 'selected' : ''}>${g}</option>`).join('')}</select></div><div class="field"><label>HSN</label><input class="input latin" data-mf="hsn" value="${esc(f.hsn)}"></div>
  <div class="field"><label>${B('কী হিসেবে বিক্রি','Sold per')}</label><select class="input" data-mf="u">${Object.keys(UNITS).map(u => `<option value="${u}" ${f.u === u ? 'selected' : ''}>${un(u)}</option>`).join('')}</select></div><div class="field"><label>${B('কতয় নামলে সতর্ক করবে','Warn when stock falls to')}</label><input class="input latin" inputmode="numeric" data-mf="low" value="${esc(f.low)}"><small class="mut">${B('০ = দোকানের মাত্রা (' + num(LOW) + ')', '0 = shop level (' + LOW + ')')}</small></div>
  <div class="field"><label>${B('শিডিউল','Schedule')}</label><select class="input" data-mf="sch">${['', 'H', 'H1', 'X', 'G'].map(x => `<option value="${x}" ${f.sch === x ? 'selected' : ''}>${x || B('নেই / OTC','None / OTC')}</option>`).join('')}</select></div>${m.id ? `<div class="field"><label>${B('বিক্রিতে দেখাবে','Show in billing')}</label><select class="input" data-mf="active"><option value="1" ${f.active ? 'selected' : ''}>${B('হ্যাঁ','Yes')}</option><option value="0" ${!f.active ? 'selected' : ''}>${B('না (লুকানো)','No (hidden)')}</option></select></div>` : ''}</div>${m.err ? `<p class="err">${B('নাম লিখুন','Enter the name')}</p>` : ''}`,
  foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="medSave">${ic('check')}${B('সেভ করুন','Save')}</button>`}; };
MODALS.ret = m => { const opts = []; MEDS.forEach(md => md.batches.forEach(b => { if (b.q > 0) opts.push([md, b]); })); opts.sort((a, b) => isExp(b[1].exp) - isExp(a[1].exp) || a[1].exp.localeCompare(b[1].exp)); const cur = opts.find(o => o[1].id === m.b);
  return {title:B('সাপ্লায়ারকে ফেরত','Return to supplier'), sub:B('মেয়াদ পেরোনো, ভাঙা বা ভুল আসা ওষুধ ফেরত দিন — স্টক থেকে বাদ যাবে আর একটা ফেরতের স্লিপ রাখা থাকবে','Return expired, damaged or wrongly supplied medicines — they leave stock and a return slip is kept'),
  body:`<div class="field"><label for="rb">${B('কোন ব্যাচ','Which batch')}</label><select id="rb" class="input" data-mf="b"><option value="">${B('বেছে নিন','Choose')}</option>${opts.map(([md, b]) => `<option value="${b.id}" ${m.b === b.id ? 'selected' : ''}>${esc(md.n)} · ${esc(b.b)} · ${fexp(b.exp)}${isExp(b.exp) ? ' · ' + B('মেয়াদ শেষ','EXPIRED') : ''} · ${b.q}</option>`).join('')}</select></div>
  <div class="row2"><div class="field"><label for="rq">${B('কত ফেরত','Quantity')}</label><input id="rq" class="input latin" inputmode="numeric" data-mf="q" value="${esc(m.q)}">${cur ? `<small class="mut">${B('এই ব্যাচে আছে ' + num(cur[1].q), cur[1].q + ' in this batch')}</small>` : ''}</div><div class="field"><label for="rr">${B('কারণ','Reason')}</label><select id="rr" class="input" data-mf="r">${[B('মেয়াদ শেষ','Expired'), B('ভাঙা / নষ্ট','Damaged'), B('ভুল ওষুধ এসেছে','Wrong item supplied'), B('অন্য','Other')].map(x => `<option ${m.r === x ? 'selected' : ''}>${x}</option>`).join('')}</select></div></div>${m.err ? `<p class="err">${m.err}</p>` : ''}`,
  foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="retSave">${ic('back')}${B('ফেরত দিন','Return')}</button>`}; };
MODALS.sup = m => ({title:B('আপনার সাপ্লায়ার','Your suppliers'), sub:B('অর্ডার এই হোয়াটসঅ্যাপ নম্বরে যাবে','Orders go to these WhatsApp numbers'), body:SUPS.filter(s => s.id !== '_none').map(s => `<div class="row2" style="align-items:end"><div class="field"><label>${B('নাম','Name')}</label><input class="input" data-sup="${s.id}|n" value="${esc(s.n)}"></div><div class="field"><label>${B('হোয়াটসঅ্যাপ','WhatsApp')}</label><input class="input latin" inputmode="numeric" maxlength="10" data-sup="${s.id}|ph" value="${esc(s.ph)}"></div></div>`).join('') + `<button class="btn btn-g" data-act="supAdd">${ic('plus')}${B('আরেকজন সাপ্লায়ার','Another supplier')}</button>`, foot:`<button class="btn btn-p btn-lg grow" data-act="supSave">${ic('check')}${B('সেভ করুন','Save')}</button>`});
MODALS.ordSend = m => { const sp = SUPS.find(s => s.id === m.sid), L = ORDER.filter(o => lastSup(MAP[o.mid]) === m.sid), txt = `${SET.name}\n${B('অর্ডার','Order')} · ${fd(NOW, {day:'numeric', month:'short', year:'numeric'})}\n\n` + L.map((o, i) => `${i + 1}. ${MAP[o.mid].n} — ${o.q} ${un(MAP[o.mid].u)}`).join('\n') + `\n\n${B('দয়া করে আজ বা কাল পাঠান। ধন্যবাদ।','Please send today or tomorrow. Thank you.')}`;
  return {title:B('হোয়াটসঅ্যাপে অর্ডার','Order on WhatsApp'), sub:esc(sp.n) + ' · ' + fph(sp.ph), body:`<div class="field"><label for="ot">${B('মেসেজ (বদলাতে পারেন)','Message (you can edit)')}</label><textarea id="ot" class="input" rows="9" style="min-height:220px;font-family:inherit">${esc(txt)}</textarea></div>${sp.ph ? '' : `<p class="mini">${B('এই সাপ্লায়ারের হোয়াটসঅ্যাপ নম্বর সেভ করা নেই — পাঠালে হোয়াটসঅ্যাপে কাকে পাঠাবেন বেছে নিন। নম্বর সেভ করতে “সাপ্লায়ার” খুলুন।','No WhatsApp number saved for this supplier — WhatsApp will ask whom to send to. Save the number in “Suppliers”.')}</p>`}`,
  foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-wa btn-lg grow" data-act="ordSendGo" data-v="${m.sid}">${ic('wa')}${B('পাঠান','Send')}</button>`}; };
MODALS.cancel = m => { const s = findSale(m.no); return {title:B('বিল বাতিল','Cancel bill') + ' ' + s.no, sub:money(s.total) + ' · ' + esc(s.name), body:`<p style="margin-top:0">${B('ওষুধগুলো আবার স্টকে ফিরে যাবে' + (s.kind === 'ipd' ? ' আর রোগীর বিল থেকে টাকা বাদ যাবে' : '') + '। বিল নম্বরটা "বাতিল" হিসেবে রেকর্ডে থেকে যাবে।', 'The medicines go back into stock' + (s.kind === 'ipd' ? ' and the charges leave the patient’s bill' : '') + '. The bill number stays on record as cancelled.')}</p><div class="field"><label for="cw">${B('কারণ','Reason')} *</label><input id="cw" class="input ${m.err ? 'bad' : ''}" data-mf="why" value="${esc(m.why)}" placeholder="${B('যেমন: ভুল ওষুধ লেখা হয়েছিল','e.g. wrong medicine entered')}">${m.err ? `<p class="err">${B('কারণ লিখুন','Write the reason')}</p>` : ''}</div>`, foot:`<button class="btn btn-s btn-lg" data-act="close">${B('থাক','Keep bill')}</button><button class="btn btn-lg grow" style="background:var(--danger);color:#fff" data-act="cancelGo">${B('বিল বাতিল করুন','Cancel bill')}</button>`}; };
MODALS.cred = m => { const s = findSale(m.no), due = s.total - (s.paid || 0); return {title:B('ধারের টাকা নিন','Collect credit'), sub:`${s.no} · ${esc(s.name)} · ${B('বাকি','due')} ${money(due)}`, body:`<div class="field"><label for="ca">${B('টাকা (₹)','Amount (₹)')}</label><input id="ca" class="input latin ${m.err ? 'bad' : ''}" inputmode="numeric" data-mf="a" value="${esc(m.a)}">${m.err ? `<p class="err">${B('সঠিক টাকা লিখুন (বাকির বেশি নয়)','Enter a valid amount (not more than due)')}</p>` : ''}</div><div class="pm">${[['cash', B('নগদ','Cash')], ['upi', 'UPI'], ['card', B('কার্ড','Card')]].map(([k, l]) => `<button data-act="credM" data-v="${k}" aria-pressed="${m.m === k}">${l}</button>`).join('')}</div>`, foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="credGo">${ic('check')}${B('টাকা জমা','Record payment')}</button>`}; };
MODALS.h1 = () => { const L = (LV.h1 || SALES).filter(s => s.h1 && !s.cancelled).slice().reverse(), rows = []; L.forEach(s => s.lines.filter(l => l.sch === 'H1' || l.sch === 'X').forEach(l => rows.push([s, l]))); const cols = '90px 120px minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1.3fr) 80px';
  return {title:B('শিডিউল H1 রেজিস্টার','Schedule H1 register'), sub:B('প্রতিটি H1 / X ওষুধ বিক্রির হিসেব — পরিদর্শনের সময় দেখাতে হয়','Every H1 / X sale — shown during inspection'), wide:true, body:`<div class="card flush">${hdr(cols, [[B('তারিখ','Date')], [B('বিল','Bill')], [B('রোগী ও ঠিকানা','Patient & address')], [B('ডাক্তার ও ঠিকানা','Doctor & address')], [B('ওষুধ · ব্যাচ','Medicine · batch')], [B('পরিমাণ','Qty'), 'r']])}${rows.length ? rows.map(([s, l]) => `<div class="gt" style="--cols:${cols}"><span class="mini">${fd(s.at)}</span><b class="latin">${s.no}</b><span class="dname"><b>${esc(s.name)}</b><small>${esc(s.h1.paddr)}</small></span><span class="dname"><b>${esc(s.doc)}</b><small>${esc(s.h1.daddr)}${s.h1.dreg ? ' · ' + esc(s.h1.dreg) : ''}</small></span><span class="dname latin"><b>${esc(l.name)}</b><small>${esc(l.b)} · ${fexp(l.exp)}</small></span><b class="r">${num(l.q)}</b></div>`).join('') : `<div class="empty">${B('এখনও কোনো H1 বিক্রি নেই','No H1 sales yet')}</div>`}</div>`, foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বন্ধ','Close')}</button><button class="btn btn-p btn-lg grow" data-act="h1Print">${ic('print')}${B('রেজিস্টার প্রিন্ট','Print register')}</button>`}; };
MODALS.notif = () => { const A = alerts(), it = (icn, tone, t, s, act, v) => `<button class="li" style="width:100%;border:0;background:none;text-align:left;border-top:1px solid var(--border)" data-act="${act}" data-v="${v || ''}"><span class="av ${tone}">${ic(icn, 18)}</span><span class="tt"><b>${t}</b><span>${s}</span></span>${ic('chev', 18)}</button>`;
  const L = [];
  if (A.low.length) L.push(it('box', 'c3', B(num(A.low.length) + 'টি ওষুধের স্টক কম বা শেষ', A.low.length + ' medicines low or out'), A.low.slice(0, 4).map(m => m.n).join(', '), 'stF', 'low'));
  if (A.ex.length) L.push(it('alert', 'c3', B(num(A.ex.length) + 'টি ওষুধে মেয়াদ পেরোনো স্টক', A.ex.length + ' medicines with expired stock'), B('ফেরত দিন বা সরিয়ে রাখুন','Return or remove them'), 'stF', 'expired'));
  if (A.e90.length) L.push(it('clock', 'c1', B(num(A.e90.length) + 'টির মেয়াদ ৯০ দিনের মধ্যে', A.e90.length + ' expiring within 90 days'), B('আগে বিক্রি করুন','Sell these first'), 'stF', 'exp90'));
  if (A.rf.length) L.push(it('repeat', 'c2', B(num(A.rf.length) + 'জনের রিফিল বাকি', A.rf.length + ' refills due'), A.rf.map(s => s.name).join(', '), 'go', isOwner() ? 'dash' : 'bills'));
  if (A.cred.length) L.push(it('rupee', 'c1', B(num(A.cred.length) + 'টি বিলে ধার বাকি', A.cred.length + ' bills on credit'), money(A.cred.reduce((a, s) => a + s.total - (s.paid || 0), 0)), 'go', 'bills'));
  return {title:B('নোটিফিকেশন','Notifications'), body:L.length ? `<div class="card flush" style="padding:0">${L.join('')}</div>` : `<div class="empty">${ic('check')}<div>${B('সব ঠিক আছে','All clear')}</div></div>`}; };
MODALS.scan = m => { const cols = [['#', ''], [B('ওষুধ (আপনার তালিকার সাথে মেলান)','Medicine (match to your list)'), ''], [B('ব্যাচ','Batch'), ''], [B('মেয়াদ','Exp'), ''], [B('প্যাক','Packs'), ''], [B('ফ্রি','Free'), ''], ['MRP', ''], [B('রেট','Rate'), ''], [B('ছাড় %','Disc %'), ''], ['GST %', ''], [B('শিডিউল','Sch'), '']];
  const lt = scanTotal(m), bt = +m.total || 0, ok = !(bt > 0) || Math.abs(lt - bt) <= Math.max(2, bt * 0.002);
  return {title:B('বিল থেকে পড়া লাইন মিলিয়ে দেখুন','Check the lines read from the bill'), sub:lvScanSub(m), wide:'xl', body:`<div class="box-w"><b>${ic('alert', 18)} ${B('পড়ায় ভুল হতে পারে','Reading can be wrong')}</b>${B('প্রতিটি লাইন কাগজের বিলের সাথে মিলিয়ে নিন (বিশেষ করে ব্যাচ, মেয়াদ আর MRP)। লাল ঘর ভরতেই হবে।','Check every line against the paper bill (especially batch, expiry and MRP). Red boxes must be filled.')}</div>
  <div class="row3"><div class="field"><label>${B('সাপ্লায়ার','Supplier')} *</label><input class="input ${m.err && !String(m.supName || '').trim() ? 'bad' : ''}" data-sc="supName" list="supl" value="${esc(m.supName || '')}" autocomplete="off"><datalist id="supl">${SUPS.filter(s => s.id !== '_none').map(s => `<option value="${esc(s.n)}">`).join('')}</datalist></div><div class="field"><label>${B('বিল নং','Bill no.')}</label><input class="input latin" data-sc="billno" value="${esc(m.billno)}"></div><div class="field"><label>${B('বিলের মোট টাকা ₹','Grand total on the bill ₹')}</label><input class="input latin" inputmode="decimal" data-sc="total" value="${esc(m.total)}"></div></div>
  <div class="scanw"><table class="scan"><thead><tr>${cols.map(c => `<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${m.lines.map((x, i) => { const bad = k => x.inc && scanBad(x, k) ? 'bad' : '', inp = (k, w, nm) => `<input class="input latin ${bad(k)}" style="width:${w}px" ${nm ? 'inputmode="decimal"' : ''} data-sl="${i}|${k}" value="${esc(x[k])}" aria-label="${k} ${i + 1}">`, old = x.mid ? MAP[x.mid] : null;
    return `<tr style="${x.inc ? '' : 'opacity:.5'}"><td><b style="color:var(--accent-text)">${num(i + 1)}</b><br><input type="checkbox" ${x.inc ? 'checked' : ''} data-sl="${i}|inc" style="width:20px;height:20px;margin-top:6px" aria-label="${B('এই লাইন নিন','Include line')} ${i + 1}"></td>
    <td style="min-width:240px"><small class="mut">${B('পড়া হয়েছে:','Read:')} <span class="latin">${esc(x.read)}</span></small><select class="input" data-sl="${i}|mid" style="margin-top:4px;width:240px"><option value="">+ ${B('নতুন:','New:')} ${esc(x.read)}</option>${(x.cands ? x.cands.map(id => MAP[id]).filter(Boolean) : MEDS.filter(md => md.n.toLowerCase().split(' ')[0] === x.read.toLowerCase().split(' ')[0])).map(md => `<option value="${md.id}" ${x.mid === md.id ? 'selected' : ''}>${esc(md.n)}</option>`).join('')}</select>${x.mid ? '' : `<input class="input latin ${x.inc && !String(x.read || '').trim() ? 'bad' : ''}" style="width:240px;margin-top:4px" data-sl="${i}|read" value="${esc(x.read)}" placeholder="${B('নতুন ওষুধের নাম','New medicine name')}" aria-label="${B('নতুন ওষুধের নাম','New medicine name')} ${i + 1}">`}${lvLoose(x)}
      ${x.fix ? `<small style="color:var(--warn);font-weight:700;display:block;margin-top:4px">⚠ ${x.fix}</small>` : ''}${old && x.gst !== '' && +x.gst !== old.g ? `<small style="color:var(--warn);font-weight:700;display:block">${B('সেভ করা GST ' + num(old.g) + '%, বিলে ' + num(x.gst) + '% — সেভ করলে বদলে যাবে', 'Saved GST ' + old.g + '%, bill says ' + x.gst + '% — will be updated')}</small>` : ''}${x.inc && +x.rate && +x.mrp && +x.rate * (1 + (+x.gst || 0) / 100) > +x.mrp + .01 ? `<small class="due" style="font-weight:700;display:block">${B('রেট + GST, MRP-র চেয়ে বেশি — ভুল পড়া','Rate + GST above MRP — misread')}</small>` : ''}</td>
    <td>${inp('batch', 90)}</td><td>${inp('exp', 76)}</td><td>${inp('qty', 60, 1)}</td><td>${inp('free', 52, 1)}</td><td>${inp('mrp', 76, 1)}</td><td>${inp('rate', 76, 1)}</td><td>${inp('disc', 56, 1)}</td>
    <td><select class="input ${bad('gst')}" data-sl="${i}|gst" style="width:68px"><option value="">?</option>${[0, 5, 12, 18].map(g => `<option ${String(x.gst) === String(g) ? 'selected' : ''}>${g}</option>`).join('')}</select></td>
    <td><select class="input" data-sl="${i}|sch" style="width:86px;${x.sch === 'H1' ? 'border-color:var(--warn)' : ''}">${['', 'H', 'H1', 'X', 'G'].map(v => `<option value="${v}" ${x.sch === v ? 'selected' : ''}>${v || 'OTC'}</option>`).join('')}</select>${x.h1g ? `<small style="color:var(--warn);font-weight:700;display:block">H1? ${B('দেখে নিন','check')}</small>` : ''}</td></tr>`; }).join('')}</tbody></table></div>
  <div class="tgrow" style="margin-top:12px;flex-wrap:wrap"><span>${B('লাইনের মোট (ছাড় + GST সহ)','Lines total (with discount + GST)')}: <b class="amt">${money2(lt)}</b></span>${bt > 0 ? (ok ? `<span class="okc">${ic('check', 16)} ${B('বিলের মোটের সাথে মিলেছে','Matches the bill total')}</span>` : `<span class="due">${B('বিলের মোট থেকে ' + money2(Math.abs(lt - bt)) + ' আলাদা', 'Differs from the bill by ' + money2(Math.abs(lt - bt)))}</span>`) : `<span class="mini">${B('মেলাতে বিলের মোট টাকা লিখুন','Type the bill total to check')}</span>`}</div>
  ${!ok ? `<div class="field"><label>${B('মোট মিলছে না কেন? (না লিখলে এগোনো যাবে না)','Why don’t the totals match? (needed to continue)')}</label><input class="input" data-sc="why" value="${esc(m.why)}" placeholder="${B('যেমন: বিলে ক্যাশ ডিসকাউন্ট আছে','e.g. bill has a cash discount')}"></div>` : ''}
  ${m.err ? `<p class="err" role="alert">${ic('alert', 15)}${m.err}</p>` : ''}`,
  foot:`<button class="btn btn-s btn-lg" data-act="close">${B('বাতিল','Cancel')}</button><button class="btn btn-p btn-lg grow" data-act="scanSave">${ic('check')}${B('টিক দেওয়া লাইন স্টকে যোগ করুন','Add ticked lines to stock')} (${num(m.lines.filter(x => x.inc).length)})</button>`}; };
function scanBad(x, k){ const v = x[k]; if (k === 'batch') return !String(v).trim(); if (k === 'exp') { const e = normExp(v); return !e || isExp(e); } if (k === 'qty') return !((+x.qty || 0) + (+x.free || 0) > 0); if (k === 'mrp') return !(+v > 0); if (k === 'gst') return v === '' || v == null; if (k === 'rate') return v === '' || (+x.rate * (1 + (+x.gst || 0) / 100) > +x.mrp + .01 && +x.mrp > 0); return false; }
function scanTotal(m){ return r2(m.lines.filter(x => x.inc).reduce((t, x) => t + (+x.qty || 0) * (+x.rate || 0) * (1 - (+x.disc || 0) / 100) * (1 + (+x.gst || 0) / 100), 0)); }
function normExp(v){ v = String(v || '').trim(); let m; if ((m = v.match(/^(\d{4})-(\d{1,2})/))) return m[1] + '-' + m[2].padStart(2, '0'); if ((m = v.match(/^(\d{1,2})[\/\-.](\d{2,4})$/))) return (m[2].length === 2 ? '20' + m[2] : m[2]) + '-' + m[1].padStart(2, '0'); if ((m = v.match(/^\d{1,2}[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/))) return (m[2].length === 2 ? '20' + m[2] : m[2]) + '-' + m[1].padStart(2, '0'); if (/^\d{5}$/.test(v) && +v > 36000) { const d = new Date(Math.round((+v - 25569) * DAY)); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); } const mon = {jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12}; if ((m = v.toLowerCase().match(/^([a-z]{3})[a-z]*[\s\-\/.]*(\d{2,4})$/)) && mon[m[1]]) return (m[2].length === 2 ? '20' + m[2] : m[2]) + '-' + String(mon[m[1]]).padStart(2, '0'); return ''; }
const yy = off => { const e = ym(off); return e.slice(5) + '/' + e.slice(2, 4); };
function fakeScan(){ return {type:'scan', sup:'s2', billno:'SMA-' + (78000 + R(900)), total:'', why:'', err:'', lines:[
  {read:'Pantoprazole 40 mg tab', mid:'m2', batch:'PN131', exp:yy(18), qty:'10', free:'1', mrp:'145', rate:'92.4', disc:'0', gst:'5', sch:'H', inc:true},
  {read:'Amoxicillin 500 mg cap', mid:'m3', batch:'AX602', exp:yy(14), qty:'15', free:'0', mrp:'105', rate:'68.5', disc:'2', gst:'5', sch:'H', inc:true},
  {read:'Amlodipine 5 mg tab', mid:'m7', batch:'AM518', exp:yy(20), qty:'20', free:'2', mrp:'28', rate:'17.9', disc:'0', gst:'5', sch:'H', inc:true, fix:B('MRP আর রেট উল্টো ছিল — ঠিক জায়গায় বসানো হয়েছে, দেখে নিন','MRP and rate were swapped — put right, please check')},
  {read:'Tramadol 50 mg cap', mid:'m14', batch:'TR266', exp:yy(16), qty:'5', free:'0', mrp:'60', rate:'38.2', disc:'0', gst:'5', sch:'H1', inc:true},
  {read:'Levocetirizine 5 mg tab', mid:'', batch:'LC104', exp:yy(22), qty:'10', free:'0', mrp:'64', rate:'40.1', disc:'0', gst:'', sch:'', inc:true},
  {read:'Moxifloxacin eye drops 5 ml', mid:'', batch:'', exp:yy(12), qty:'6', free:'0', mrp:'135', rate:'86', disc:'0', gst:'5', sch:'H1', h1g:true, inc:true}]}; }

/* ================= BILL DOCUMENT ================= */
function inWords(n){ n = Math.round(+n || 0); if (!n) return 'Zero'; const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'], b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = x => x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : ''), three = x => (x >= 100 ? a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : '');
  const o = [], cr = Math.floor(n / 1e7); n %= 1e7; const lk = Math.floor(n / 1e5); n %= 1e5; const th = Math.floor(n / 1e3); n %= 1e3; if (cr) o.push(three(cr) + ' Crore'); if (lk) o.push(two(lk) + ' Lakh'); if (th) o.push(two(th) + ' Thousand'); if (n) o.push(three(n)); return o.join(' '); }
function billHtml(s){
  const reg = s.mode === 'regular' && s.kind === 'walkin', ipd = s.kind === 'ipd', adm = ADM.find(a => a.id === s.adm);
  const title = ipd ? 'MEDICINE ISSUE SLIP' : s.mode === 'regular' ? 'TAX INVOICE' : s.mode === 'composition' ? 'BILL OF SUPPLY' : 'CASH MEMO';
  const f2 = n => fmtN(n, 2), by = {}; s.lines.forEach(l => { const k = l.g; by[k] = by[k] || {t:0, g:0}; by[k].t += l.taxable; by[k].g += l.tax; });
  const P = (b, e) => S.lang === 'bn' ? b : e, pay = {cash:'Cash', upi:'UPI', card:'Card', credit:'Credit (pay later)'}[s.pay] || '';
  return `<!doctype html><html lang="${S.lang}"><head><meta charset="utf-8"><title>${s.no}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet"><style>
  @page{size:A4;margin:10mm}body{margin:0;padding:16px 20px;font-family:"IBM Plex Sans","Noto Sans Bengali",Arial,sans-serif;color:#14201b;font-size:11.5px;background:#fff}
  .h{display:flex;justify-content:space-between;gap:14px;border-bottom:3px solid #12976A;padding-bottom:10px}.h b.n{font-size:19px;color:#0b4f3a;display:block}.h span{display:block;color:#4f5f58;font-size:11px;line-height:1.5}
  .lg{display:flex;gap:10px}.sq{width:38px;height:38px;border-radius:10px;background:#1BB880;display:grid;place-items:center;flex:none}.sq i{width:13px;height:13px;border-radius:50%;border:3.5px solid #fff;display:block}
  .rt{text-align:right}.rt .t{font-size:15px;letter-spacing:.08em;color:#12976A;font-weight:700}.rt .no{font-size:13px;font-weight:700;color:#14201b}
  .pi{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 14px;padding:9px 12px;margin:10px 0;background:#F4F8F6;border:1px solid #DCE6E1;border-radius:6px}.pi span{display:block;font-size:9.5px;color:#5b6b64;text-transform:uppercase;letter-spacing:.04em}.pi b{font-size:12px}
  table{width:100%;border-collapse:collapse}th{font-size:9.5px;text-align:left;color:#fff;background:#0b4f3a;padding:6px 5px;text-transform:uppercase;letter-spacing:.03em}td{padding:6px 5px;border-bottom:1px solid #E3E8E5;vertical-align:top}.r{text-align:right}.sm{font-size:9.5px;color:#5b6b64}
  tbody tr:nth-child(even) td{background:#FAFCFB}.split{display:flex;justify-content:space-between;gap:20px;margin-top:10px}.gs th{background:#E8F1ED;color:#0b4f3a}.gs td{font-size:10.5px}
  .tot{min-width:260px}.tot div{display:flex;justify-content:space-between;padding:3px 0}.tot .s{color:#5b6b64;font-size:10.5px}.tot .g{border-top:2px solid #0b4f3a;margin-top:4px;padding-top:6px;font-size:15px;font-weight:700}
  .words{margin-top:8px;padding:7px 10px;background:#F4F8F6;border-radius:6px;font-size:11px}.end{display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px;gap:20px}.decl{font-size:10px;color:#4f5f58;line-height:1.6;max-width:60%}
  .sig{text-align:center;width:220px;font-size:11px}.sig img{max-width:190px;max-height:64px;display:block;margin:4px auto 0}.sig .ln{border-top:1px solid #14201b;padding-top:4px;margin-top:4px;font-weight:600}.sp{height:52px}
  .stamp{display:inline-block;border:2.5px solid #12976A;color:#12976A;font-weight:800;letter-spacing:.12em;padding:4px 12px;border-radius:6px;transform:rotate(-6deg);font-size:15px}.stamp.red{border-color:#B42318;color:#B42318}.stamp.blue{border-color:#1F5F95;color:#1F5F95}
  .foot{margin-top:14px;border-top:1px solid #DCE6E1;padding-top:6px;font-size:9.5px;color:#7a8781;display:flex;justify-content:space-between}.smp{color:#B42318;font-weight:700}</style></head><body>
  <div class="h"><div class="lg"><span class="sq"><i></i></span><div><b class="n">${esc(SET.name)}</b><span>${esc(SET.addr)}</span><span>Phone: ${fph(SET.phone)}${reg || s.mode === 'composition' ? ' · GSTIN: ' + SET.gstin : ''}</span><span>Drug Licence No: ${esc(SET.dl)}</span></div></div>
  <div class="rt"><div class="t">${title}${s.cancelled ? ' (CANCELLED)' : ''}</div><div class="no">Bill No: ${s.no}</div><span>Date: ${s.at.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'})}, ${s.at.toLocaleTimeString('en-IN', {hour:'numeric', minute:'2-digit'})}</span>${reg ? '<span>Prices are MRP, inclusive of GST</span>' : ''}</div></div>
  <div class="pi"><div><span>${ipd ? 'Patient' : 'Billed to'}</span><b>${esc(s.name || 'Walk-in customer')}</b></div><div><span>Payment</span><b>${ipd ? 'Added to the nursing-home bill' : pay}</b></div><div><span>Phone</span><b>${fph(s.ph) || '—'}</b></div><div><span>Prescribed by</span><b>${esc(s.doc) || '—'}</b></div><div><span>UHID</span><b>${esc(s.uhid || (adm && adm.uhid) || '—')}</b></div><div><span>Bed / Ward</span><b>${adm ? adm.bed : '—'}</b></div></div>
  <table><thead><tr><th>#</th><th>Medicine</th><th>Batch</th><th>Expiry</th><th class="r">Qty</th><th class="r">MRP</th>${reg ? '<th class="r">GST</th>' : ''}<th class="r">Disc</th><th class="r">Amount</th></tr></thead><tbody>
  ${s.lines.map((l, i) => `<tr><td class="sm">${i + 1}</td><td><b>${esc(l.name)}</b>${reg || l.sch ? `<div class="sm">${[reg ? 'HSN ' + (l.hsn || '3004') : '', l.sch ? 'Schedule ' + l.sch : ''].filter(Boolean).join(' · ')}</div>` : ''}</td><td>${esc(l.b)}</td><td>${l.exp.slice(5)}/${l.exp.slice(2, 4)}</td><td class="r">${l.q}</td><td class="r">${f2(l.mrp)}</td>${reg ? `<td class="r">${l.g ? l.g + '%' : 'Exempt'}</td>` : ''}<td class="r">${l.disc ? f2(l.disc) : '-'}</td><td class="r"><b>${f2(l.amt)}</b></td></tr>`).join('')}</tbody></table>
  <div class="split"><div>${reg ? `<div style="font-weight:700;color:#0b4f3a;margin-bottom:4px">GST summary</div><table class="gs"><tr><th>GST rate</th><th class="r">Taxable value</th><th class="r">CGST</th><th class="r">SGST</th><th class="r">Total tax</th></tr>${Object.keys(by).sort().map(k => `<tr><td>${+k ? k + '%' : 'Exempt'}</td><td class="r">${f2(by[k].t)}</td><td class="r">${f2(by[k].g / 2)}</td><td class="r">${f2(by[k].g / 2)}</td><td class="r">${f2(by[k].g)}</td></tr>`).join('')}</table>` : s.mode === 'composition' && !ipd ? '<div class="sm" style="max-width:300px"><b>GST:</b> Composition taxable person, not eligible to collect tax on supplies.</div>' : !ipd ? '<div class="sm" style="max-width:300px"><b>GST:</b> Not charged. The seller is not registered under GST (cash memo).</div>' : ''}</div>
  <div class="tot"><div><span>MRP total (${s.lines.length} item${s.lines.length > 1 ? 's' : ''})</span><span>${f2(s.mrpT)}</span></div>${s.disc ? `<div><span>Less: discount (${s.discPct}%)</span><span>-${f2(s.disc)}</span></div>` : ''}${reg ? `<div class="s"><span>Taxable value</span><span>${f2(s.mrpT - s.disc - s.gst)}</span></div><div class="s"><span>CGST</span><span>${f2(s.gst / 2)}</span></div><div class="s"><span>SGST</span><span>${f2(s.gst / 2)}</span></div>` : ''}${s.round ? `<div class="s"><span>Round off</span><span>${s.round > 0 ? '+' : ''}${f2(s.round)}</span></div>` : ''}<div class="g"><span>${ipd ? 'Total charged' : 'Net amount'}</span><span>₹${f2(s.total)}</span></div></div></div>
  <div class="words"><b>Amount in words:</b> Rupees ${inWords(s.total)} Only</div>
  <div class="end"><div><div style="margin-bottom:10px">${s.cancelled ? '<span class="stamp red">CANCELLED</span>' : ipd ? '<span class="stamp blue">ON PATIENT BILL</span>' : s.pay === 'credit' && s.total - (s.paid || 0) > 0 ? '<span class="stamp red">DUE</span>' : '<span class="stamp">PAID</span>'}</div>
  <div class="decl">${ipd ? '<b>Medicine issue slip.</b> These medicines are added to the patient’s nursing-home bill; this is not a separate bill.<br>' : `<b>${reg ? 'All prices are MRP, inclusive of GST.' : 'All prices are MRP.'}</b> Please check the medicines, quantity and expiry date before leaving the counter.<br>`}Schedule H / H1 medicines are sold only against a valid prescription.${SET.footer ? '<br>' + esc(SET.footer) : ''}<br>Billed by: ${s.by === 'owner' ? 'Subhajit Kar' : 'Arpita Majhi'}</div></div>
  <div class="sig">For ${esc(SET.name)}${SET.sign ? `<img src="${SET.sign}" alt="">` : '<div class="sp"></div>'}<div class="ln">${SET.pharm ? 'Registered Pharmacist' : 'Authorised Signatory'}</div>${SET.signer ? `<div>${esc(SET.signer)}</div>` : SET.pharm ? `<div>${esc(SET.pharm)}</div>` : ''}</div></div>
  <div class="foot"><span>Computer-generated bill · ${s.no} · AuraScale</span><span class="smp">${P('নমুনা বিল — কাল্পনিক তথ্য','Sample bill — fictional data')}</span></div></body></html>`;
}
function h1Print(){ const rows = []; (LV.h1 || SALES).filter(s => s.h1 && !s.cancelled).forEach(s => s.lines.filter(l => l.sch === 'H1' || l.sch === 'X').forEach(l => rows.push([s, l])));
  return `<!doctype html><html><head><meta charset="utf-8"><title>Schedule H1 register</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:"IBM Plex Sans","Noto Sans Bengali",Arial;font-size:11px;color:#14201b}h1{font-size:16px;color:#0b4f3a;margin:0}table{width:100%;border-collapse:collapse;margin-top:10px}th,td{border:1px solid #cfd8d3;padding:5px;text-align:left;vertical-align:top}th{background:#E8F1ED}</style></head><body><h1>Schedule H1 register — ${esc(SET.name)}</h1><div>Drug Licence: ${esc(SET.dl)} · Printed ${NOW.toLocaleDateString('en-IN')}</div><table><tr><th>Date</th><th>Bill no.</th><th>Patient name &amp; address</th><th>Prescriber name &amp; address</th><th>Drug</th><th>Batch</th><th>Qty</th></tr>${rows.map(([s, l]) => `<tr><td>${s.at.toLocaleDateString('en-IN')}</td><td>${s.no}</td><td>${esc(s.name)}<br>${esc(s.h1.paddr)}</td><td>${esc(s.doc)}<br>${esc(s.h1.daddr)} ${esc(s.h1.dreg)}</td><td>${esc(l.name)}</td><td>${esc(l.b)}</td><td>${l.q}</td></tr>`).join('')}</table></body></html>`; }
function printDoc(html){ const f = $('pf'); f.onload = () => setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} }, 400); f.srcdoc = html; }

/* ================= FILES ================= */
function parseCSV(text){
  text = text.replace(/^﻿/, ''); const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',' || c === ';' || c === '\t') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return rows.filter(r => r.some(x => String(x).trim() !== ''));
}
async function readXlsx(buf){
  const u8 = new Uint8Array(buf), dv = new DataView(buf), td = new TextDecoder();
  let e = u8.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) throw new Error('zip');
  const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true); const files = {};
  for (let k = 0; k < n; k++) {
    const meth = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
    files[td.decode(u8.subarray(p + 46, p + 46 + nl))] = {meth, csz, off}; p += 46 + nl + xl + cl;
  }
  const get = async name => {
    const f = files[name]; if (!f) return null;
    const st = f.off + 30 + dv.getUint16(f.off + 26, true) + dv.getUint16(f.off + 28, true), data = u8.slice(st, st + f.csz);
    if (f.meth === 0) return td.decode(data);
    return await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  };
  const dp = new DOMParser(), ssx = await get('xl/sharedStrings.xml');
  const ss = ssx ? Array.from(dp.parseFromString(ssx, 'application/xml').getElementsByTagName('si')).map(si => Array.from(si.getElementsByTagName('t')).map(x => x.textContent).join('')) : [];
  const sn = files['xl/worksheets/sheet1.xml'] ? 'xl/worksheets/sheet1.xml' : Object.keys(files).filter(x => /^xl\/worksheets\/sheet\d+\.xml$/.test(x)).sort()[0];
  if (!sn) throw new Error('sheet');
  const sx = dp.parseFromString(await get(sn), 'application/xml'), rows = [];
  for (const r of Array.from(sx.getElementsByTagName('row'))) {
    const row = [];
    for (const c of Array.from(r.getElementsByTagName('c'))) {
      const ref = c.getAttribute('r') || '', col = ref ? ref.replace(/\d+/g, '').split('').reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1 : row.length;
      const tp = c.getAttribute('t'), v = c.getElementsByTagName('v')[0];
      row[col] = tp === 's' ? ss[+v.textContent] : tp === 'inlineStr' ? Array.from(c.getElementsByTagName('t')).map(x => x.textContent).join('') : v ? v.textContent : '';
    }
    rows.push(Array.from(row, x => x == null ? '' : x));
  }
  return rows.filter(r => r.some(x => String(x).trim() !== ''));
}

function onFile_demo(kind, files){
  if (!files || !files.length) return; const f = files[0];
  if (kind === 'sign') return signFile(f);
  if (kind === 'doc') { const rd = new FileReader(); rd.onload = () => { DOCS.push({id:'d' + Date.now(), kind:'rx', ref:f.name, party:B('নতুন আপলোড','New upload'), at:new Date(), amt:0, pages:1, img:/^image/.test(f.type) ? rd.result : ''}); render(); toast(B('কাগজ রাখা হয়েছে','Saved')); }; rd.readAsDataURL(f); return; }
  if (/\.(csv|xlsx)$/i.test(f.name)) return sheetFile(f);
  if (/^image\//.test(f.type) || /\.pdf$/i.test(f.name)) { toast(B('বিল পড়া হচ্ছে… (প্রোটোটাইপ)','Reading the bill… (prototype)')); const pz = $('impPrev'); if (pz) pz.innerHTML = `<section class="card pad" style="margin-bottom:16px"><b>${B('বিল পড়া হচ্ছে…','Reading the bill…')}</b><div class="sk" style="width:80%"></div><div class="sk" style="width:60%"></div><div class="sk" style="width:70%"></div></section>`; setTimeout(() => { if (pz) pz.innerHTML = ''; openM(Object.assign(fakeScan(), {pages:files.length})); }, 1300); return; }
  toast(B('এই ধরনের ফাইল চলবে না — ছবি, PDF, Excel বা CSV দিন','This file type is not supported — use a photo, PDF, Excel or CSV'), null, 'warn');
}
const ALIAS = {name:['name', 'medicine', 'item', 'itemname', 'product', 'productname', 'medicinename', 'description'], comp:['composition', 'salt', 'generic', 'content'], gst:['gst', 'gst%', 'tax', 'tax%', 'gstrate', 'igst', 'igst%'], unit:['unit', 'uom', 'packtype'], batch:['batch', 'batchno', 'batchnumber', 'bno', 'lot', 'lotno'], exp:['expiry', 'exp', 'expdate', 'expirydate', 'expdt'], mrp:['mrp', 'mrpunit', 'mrpperunit'], rate:['rate', 'purchaserate', 'ptr', 'cost', 'prate', 'purchaseprice', 'purrate', 'netrate', 'costprice'], qty:['qty', 'quantity', 'stock', 'closingstock', 'balance', 'totalqty', 'stockqty', 'clstock'], sup:['supplier', 'distributor', 'party']};
async function sheetFile(f){
  const box = $('impPrev'); if (S.view !== 'receive') go('receive'); const bx = $('impPrev');
  bx.innerHTML = `<section class="card pad" style="margin-bottom:16px"><b>${B('ফাইল পড়া হচ্ছে…','Reading the file…')}</b><div class="sk"></div><div class="sk" style="width:70%"></div></section>`;
  let rows; try { rows = /\.csv$/i.test(f.name) ? parseCSV(await f.text()) : await readXlsx(await f.arrayBuffer()); } catch (e) { bx.innerHTML = `<div class="box-r">${B('ফাইলটা পড়া গেল না। .xlsx বা .csv দিন।','The file could not be read. Use .xlsx or .csv.')}</div>`; return; }
  const nz = v => String(v || '').toLowerCase().replace(/[^a-z0-9%]/g, ''), head = (rows[0] || []).map(nz), col = {};
  Object.keys(ALIAS).forEach(k => { const i = head.findIndex(h => ALIAS[k].includes(h)); if (i >= 0) col[k] = i; });
  const need = [['batch', 'batch'], ['exp', 'expiry'], ['mrp', 'MRP'], ['gst', 'GST'], ['qty', 'qty']], noCol = need.filter(n => col[n[0]] == null).map(n => n[1]);
  if (col.name == null || noCol.length) { bx.innerHTML = `<div class="box-r"><b>${ic('alert', 16)} ${B('এই ফাইল স্টক হিসেবে নেওয়া যাবে না','This file cannot be imported as stock')}</b><br>${B('এই কলামগুলো নেই: ','These columns are missing: ')}<b>${(col.name == null ? ['name'] : []).concat(noCol).join(', ')}</b>. ${B('স্টক তালিকায় প্রতিটি ওষুধের নাম, ব্যাচ, মেয়াদ, MRP, GST আর পরিমাণ লাগবে — শুধু নামের তালিকা চলবে না। টেমপ্লেট ব্যবহার করুন।','A stock list needs name, batch, expiry, MRP, GST and quantity for every medicine — a plain list of names is not accepted. Use the template.')}</div>`; return; }
  const all = rows.slice(1).map(r => { const g = k => col[k] != null ? String(r[col[k]] == null ? '' : r[col[k]]).trim() : ''; const o = {name:g('name'), comp:g('comp'), gst:g('gst').replace(/[^\d.]/g, ''), unit:g('unit').toLowerCase(), batch:g('batch'), exp:normExp(g('exp')), mrp:+g('mrp').replace(/[^\d.]/g, '') || 0, rate:+g('rate').replace(/[^\d.]/g, '') || 0, qty:+g('qty').replace(/[^\d.]/g, '') || 0, sup:g('sup')}; const miss = []; if (!o.batch) miss.push('batch'); if (!o.exp) miss.push('expiry'); if (!(o.mrp > 0)) miss.push('MRP'); if (o.gst === '' || ![0, 5, 12, 18, 28].includes(+o.gst)) miss.push('GST'); if (!(o.qty > 0)) miss.push('qty'); o.miss = miss; return o; }).filter(o => o.name);
  const good = all.filter(o => !o.miss.length), bad = all.filter(o => o.miss.length), have = {}; MEDS.forEach(m => m.batches.forEach(b => have[[m.n.toLowerCase(), b.b.toLowerCase(), b.exp, b.mrp.toFixed(2)].join('|')] = 1));
  const dup = good.filter(o => have[[o.name.toLowerCase(), o.batch.toLowerCase(), o.exp, o.mrp.toFixed(2)].join('|')]).length; S.IMP = {good, dup, skip:true};
  if (!good.length) { bx.innerHTML = `<div class="box-r">${B('কোনো সারিতেই ব্যাচ, মেয়াদ, MRP, GST আর পরিমাণ সব নেই।','No row has all of batch, expiry, MRP, GST and quantity.')}</div>`; return; }
  const cols = 'minmax(0,2fr) 100px 80px 90px 80px 70px';
  bx.innerHTML = `<section class="card flush" style="margin-bottom:16px"><div class="ch"><h2>${ic('sheet', 18)} ${esc(f.name)}</h2><span>${B(num(good.length) + 'টি সম্পূর্ণ সারি', good.length + ' complete rows')}</span></div>
  ${bad.length ? `<div style="padding:12px 18px 0"><div class="box-w" style="margin:0"><b>${ic('alert', 16)} ${B(num(bad.length) + 'টি সারি বাদ যাবে','' + bad.length + ' rows will be skipped')}</b>${bad.slice(0, 6).map(o => `<span class="latin">${esc(o.name)}</span> (${o.miss.join(', ')})`).join(' · ')}</div></div>` : ''}
  <div style="padding:8px 0 0">${hdr(cols, [[B('নাম','Name')], [B('ব্যাচ','Batch')], [B('মেয়াদ','Expiry')], ['MRP', 'r'], [B('পরিমাণ','Qty'), 'r'], ['GST', 'r']])}${good.slice(0, 12).map(o => `<div class="gt" style="--cols:${cols}"><b class="latin full">${esc(o.name)}</b><span class="latin">${esc(o.batch)}</span><span>${fexp(o.exp)}${isExp(o.exp) ? ` <span class="tag t-r">${B('শেষ','exp')}</span>` : ''}</span><span class="r">${money2(o.mrp)}</span><b class="r">${num(o.qty)}</b><span class="r">${num(o.gst)}%</span></div>`).join('')}${good.length > 12 ? `<div class="empty" style="padding:12px">${B('আরও ' + num(good.length - 12) + 'টি…', '…and ' + (good.length - 12) + ' more')}</div>` : ''}</div>
  <div style="padding:14px 18px;border-top:1px solid var(--border)">${dup ? `<label class="tgrow" style="cursor:pointer"><span>${B(num(dup) + 'টি সারি আগেই স্টকে আছে (একই ওষুধ, ব্যাচ, মেয়াদ, MRP) — বাদ দিন যাতে দুবার না গোনা হয়', dup + ' rows are already in stock (same medicine, batch, expiry, MRP) — skip them so stock is not counted twice')}</span><button class="tgl" role="switch" aria-checked="true" data-act="impSkip"><i></i></button></label>` : ''}<button class="btn btn-p btn-lg" data-act="impGo">${ic('down')}${B(num(good.length - dup) + 'টি সারি স্টকে তুলুন', 'Import ' + (good.length - dup) + ' rows')}</button></div></section>`;
}
function signFile(f){ if (!/^image\/(png|jpe?g)$/.test(f.type)) return toast(B('JPG বা PNG ছবি দিন','Choose a JPG or PNG picture'), null, 'warn');
  const img = new Image(), url = URL.createObjectURL(f); img.onload = () => { const sc = Math.min(1, 900 / Math.max(img.width, img.height)), w = Math.round(img.width * sc), h = Math.round(img.height * sc), c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h), p = d.data; let a = w, b = h, cc = -1, dd = -1; for (let i = 0; i < p.length; i += 4) { const l = .299 * p[i] + .587 * p[i + 1] + .114 * p[i + 2]; if (l > 185) p[i + 3] = 0; else if (l > 150) p[i + 3] = Math.round(p[i + 3] * (185 - l) / 35); if (p[i + 3] > 40) { const k = i / 4, px = k % w, py = (k - px) / w; a = Math.min(a, px); cc = Math.max(cc, px); b = Math.min(b, py); dd = Math.max(dd, py); } }
    x.putImageData(d, 0, 0); URL.revokeObjectURL(url); if (cc < 0) return toast(B('ছবিতে সই পাওয়া গেল না — গাঢ় করে সই করুন','No signature found — sign darker'), null, 'warn');
    const o = document.createElement('canvas'); o.width = cc - a + 13; o.height = dd - b + 13; o.getContext('2d').drawImage(c, Math.max(0, a - 6), Math.max(0, b - 6), o.width, o.height, 0, 0, o.width, o.height); S.F = S.F || Object.assign({}, SET); S.F.sign = o.toDataURL('image/png'); render(); toast(B('সাদা কাগজ সরানো হয়েছে — "সই সেভ করুন" চাপুন','White paper removed — tap “Save signature”')); }; img.src = url; }

/* ================= TOAST ================= */
function toast(msg, undo, tone){ const el = document.createElement('div'); el.className = 'toast' + (tone ? ' ' + tone : ''); el.innerHTML = `<span class="i">${ic(tone === 'warn' ? 'alert' : 'check')}</span><span>${msg}</span>${undo ? `<button>${B('ফেরান','Undo')}</button>` : ''}`; if (undo) el.querySelector('button').onclick = () => { undo(); el.remove(); toast(B('আগের মতো করা হলো','Undone')); }; $('toasts').appendChild(el); setTimeout(() => el.remove(), tone === 'warn' ? 7000 : 5000); }

/* ================= ACTIONS ================= */
const H = {
  go: el => { closeSheet(); if (S.modal) closeM(); go(el.dataset.v); },
  newBill: () => { closeSheet(); if (S.modal) closeM(); go('pos'); },
  role: el => { S.role = el.dataset.v; S.gstSel = null; go(ROLES[S.role].nav.includes(S.view) ? S.view : ROLES[S.role].nav[0]); },
  lang: () => { S.lang = S.lang === 'bn' ? 'en' : 'bn'; render(); if (S.modal) renderM(); },
  theme: () => { const d = HOST; d.dataset.theme = d.dataset.theme === 'dark' ? 'light' : 'dark'; renderBar(); },
  more: () => { const pri = S.role === 'owner' ? ['dash', 'stock', 'bills'] : ['stock', 'bills', 'receive'], nav = ROLES[S.role].nav.filter(v => v !== 'pos' && !pri.includes(v)).concat(['pos']); $('sheet').innerHTML = `<div class="sc" data-act="closeSheet"></div><div class="sp" role="dialog" aria-label="${B('আরও','More')}"><b>${B('আরও','More')}</b><div class="g">${nav.map(v => `<button data-act="go" data-v="${v}">${ic(NAV[v][0], 24)}${NAV[v][1][S.lang === 'bn' ? 0 : 1]}</button>`).join('')}</div></div>`; $('sheet').classList.add('on'); },
  closeSheet: () => closeSheet(), close: () => closeM(), notif: () => openM({type:'notif'}),
  kind: el => { S.P.kind = el.dataset.v; S.P.err = ''; S.P.bad = {}; render(); },
  pay: el => { S.P.pay = el.dataset.v; $('sum').innerHTML = sumHtml(); },
  wa: () => { S.P.wa = !S.P.wa; $('sum').innerHTML = sumHtml(); },
  posAdd: el => posAdd(el.dataset.id),
  substGo: el => { closeM(); posAdd(el.dataset.id); },
  qty: el => { const c = S.P.cart.find(x => x.mid === el.dataset.id), m = MAP[el.dataset.id]; const nq = c.q + +el.dataset.d; if (nq > stockOf(m)) { toast(B('স্টকে আছে মাত্র ' + num(stockOf(m)) + ' ' + un(m.u), 'Only ' + stockOf(m) + ' ' + un(m.u) + ' in stock'), null, 'warn'); return; } if (nq <= 0) { H.cartDel(el); return; } c.q = nq; refreshPos(); },
  cartDel: el => { const P = S.P, i = P.cart.findIndex(x => x.mid === el.dataset.id), it = P.cart[i]; P.cart.splice(i, 1); refreshPos(); toast(B(MAP[it.mid].n + ' বাদ দেওয়া হয়েছে', MAP[it.mid].n + ' removed'), () => { P.cart.splice(i, 0, it); refreshPos(); }); },
  posSave: () => posSave(),
  custPick: el => { S.P.ph = el.dataset.ph; S.P.name = el.dataset.n; render(); const m = $('mq'); if (m) m.focus(); },
  repeat: el => { const s = findSale(el.dataset.no), notes = []; s.lines.forEach(l => { const m = MAP[l.mid], ex = S.P.cart.find(c => c.mid === l.mid), have = ex ? ex.q : 0, can = Math.max(0, stockOf(m) - have), take = Math.min(l.q, can); if (take > 0) { if (ex) ex.q += take; else S.P.cart.push({mid:l.mid, q:take}); } if (take < l.q) notes.push(m.n + ': ' + (take ? B(num(l.q - take) + ' কম', (l.q - take) + ' short') : B('স্টক নেই','out of stock'))); }); refreshPos(); $('rep').innerHTML = `<div class="box-g" style="margin:12px 0 0">${ic('check', 16)} ${B('আগের বিল বসানো হয়েছে — পরিমাণ বদলে সেভ করুন।','Last bill filled in — change any quantity, then save.')}${notes.length ? `<br><span class="due">${esc(notes.join(' · '))}</span>` : ''}</div>`; },
  discOpen: () => { if (!S.P.cart.length) return toast(B('আগে বিলে ওষুধ যোগ করুন','Add medicines to the bill first'), null, 'warn'); openM({type:'disc', mode:'pct', v:'', per:{}}); },
  dMode: el => { S.modal.mode = el.dataset.v; S.modal.v = ''; renderM(); },
  dApply: () => { const c = discCalc(S.modal); S.P.disc = c.pct; closeM(); $('sum').innerHTML = sumHtml(); refreshPos(); toast(B('ছাড় ' + money2(c.off) + ' (' + num(c.pct) + '%) বসানো হয়েছে', 'Discount ' + money2(c.off) + ' (' + c.pct + '%) applied')); },
  billPrint: el => printDoc(billHtml(findSale(el.dataset.no))), billOpen: el => printDoc(billHtml(findSale(el.dataset.no))),
  billWa: el => { const s = findSale(el.dataset.no); toast(B('বিল ' + s.no + ' ' + fph(s.ph) + ' নম্বরে হোয়াটসঅ্যাপে পাঠানো হয়েছে (প্রোটোটাইপ)', 'Bill ' + s.no + ' sent to ' + fph(s.ph) + ' on WhatsApp (prototype)')); },
  remind: el => { const s = findSale(el.dataset.no); s.reminded = true; render(); toast(B(s.name + '-কে রিফিলের কথা মনে করানো হয়েছে (প্রোটোটাইপ)', 'Refill reminder sent to ' + s.name + ' (prototype)'), () => { s.reminded = false; render(); }); },
  stF: el => { S.stF = el.dataset.v; S.stQ = ''; if (S.modal) closeM(); if (S.view !== 'stock') go('stock'); else render(); },
  medOpen: el => openM({type:'med', id:el.dataset.id}),
  medEdit: el => { const md = el.dataset.id ? MAP[el.dataset.id] : null; openM({type:'medEdit', id:md ? md.id : null, f:md ? {n:md.n, c:md.c, g:md.g, hsn:md.hsn, u:md.u, low:md.low, sch:md.sch, active:md.active} : {n:'', c:'', g:5, hsn:'3004', u:'strip', low:0, sch:'', active:true}}); },
  medSave: () => { const m = S.modal, f = m.f; if (!f.n.trim()) { m.err = 1; renderM(); return; } const tgt = m.id ? MAP[m.id] : newMed(f.n.trim(), f.c, f.g, f.u, f.sch); Object.assign(tgt, {n:f.n.trim(), c:f.c, g:+f.g, hsn:f.hsn, u:f.u, low:+f.low || 0, sch:f.sch, active:f.active === true || f.active === '1'}); closeM(); render(); toast(B('ওষুধ সেভ হয়েছে','Medicine saved')); },
  corr: el => openM({type:'corr', id:el.dataset.id, b:el.dataset.b, q:'', r:''}),
  corrSave: () => { const m = S.modal, md = MAP[m.id], b = md.batches.find(x => x.id === m.b); if (m.q === '' || isNaN(+m.q) || +m.q < 0) { m.err = 'q'; renderM(); return; } if (!m.r.trim()) { m.err = 'r'; renderM(); return; } const old = b.q; b.q = Math.round(+m.q); openM({type:'med', id:md.id}); render(); toast(B('স্টক ' + num(old) + ' → ' + num(b.q) + ' করা হয়েছে', 'Stock corrected ' + old + ' → ' + b.q), () => { b.q = old; render(); }); },
  addOrder: el => { const id = el.dataset.id; if (!ORDER.find(o => o.mid === id)) ORDER.push({mid:id, q:Math.max(5, lowAt(MAP[id]) * 2 - stockOf(MAP[id])), st:'list'}); if (S.modal) closeM(); render(); toast(B(MAP[id].n + ' অর্ডার তালিকায় যোগ হয়েছে', MAP[id].n + ' added to the re-order list')); },
  gstMode: () => { S.gstSel = S.gstSel ? null : {}; S.gstOnly = ''; render(); },
  gstTick: el => { const id = el.dataset.id; if (S.gstSel[id]) delete S.gstSel[id]; else S.gstSel[id] = 1; render(); },
  gstAll: el => { const on = el.dataset.v === '1'; MEDS.forEach(m => { if (S.gstOnly !== '' && m.g !== +S.gstOnly) return; if (on) S.gstSel[m.id] = 1; else delete S.gstSel[m.id]; }); render(); },
  gstApply: () => { const ids = Object.keys(S.gstSel), g = +$('gstNew').value; if (!ids.length) return toast(B('অন্তত একটা ওষুধে টিক দিন','Tick at least one medicine'), null, 'warn'); const old = ids.map(id => [id, MAP[id].g]); ids.forEach(id => MAP[id].g = g); S.gstSel = {}; render(); toast(B(num(ids.length) + 'টি ওষুধের GST ' + num(g) + '% করা হয়েছে', 'GST changed to ' + g + '% for ' + ids.length + ' medicines'), () => { old.forEach(([id, v]) => MAP[id].g = v); render(); }); },
  retOpen: () => openM({type:'ret', b:'', q:'', r:B('মেয়াদ শেষ','Expired'), err:''}),
  retSave: () => { const m = S.modal; let md, b; MEDS.forEach(x => x.batches.forEach(y => { if (y.id === m.b) { md = x; b = y; } })); if (!b) { m.err = B('ব্যাচ বেছে নিন','Choose a batch'); renderM(); return; } const q = +m.q; if (!(q > 0) || q > b.q) { m.err = B('পরিমাণ ১ থেকে ' + num(b.q) + '-এর মধ্যে লিখুন', 'Quantity must be 1 to ' + b.q); renderM(); return; } b.q -= q; DOCS.push({id:'d' + Date.now(), kind:'return', ref:'RTN-' + String(DOCS.length + 1).padStart(4, '0'), party:(SUPS.find(s => s.id === b.sup) || SUPS[0]).n, at:new Date(), amt:r2(q * b.rate), pages:1}); closeM(); render(); toast(B(md.n + ' · ' + num(q) + ' ফেরত দেওয়া হয়েছে — ফেরতের স্লিপ "ছবি ও কাগজ"-এ রাখা হলো', md.n + ' · ' + q + ' returned — slip kept in Photos & papers'), () => { b.q += q; DOCS.pop(); render(); }); },
  supOpen: () => openM({type:'sup'}), supAdd: () => { SUPS.push({id:'s' + (SUPS.length + 1), n:'', ph:''}); renderM(); },
  supSave: () => { for (const s of SUPS) if (s.ph && !mobOk(s.ph)) return toast(B('হোয়াটসঅ্যাপ নম্বর ১০ সংখ্যার হবে','WhatsApp numbers must be 10 digits'), null, 'warn'); for (let i = SUPS.length - 1; i >= 0; i--) if (!SUPS[i].n.trim()) SUPS.splice(i, 1); closeM(); render(); toast(B('সাপ্লায়ার সেভ হয়েছে','Suppliers saved')); },
  oq: el => { const o = ORDER.find(x => x.mid === el.dataset.id); o.q = Math.max(1, o.q + +el.dataset.d); render(); },
  ordDel: el => { const i = ORDER.findIndex(o => o.mid === el.dataset.id), it = ORDER[i]; ORDER.splice(i, 1); MAP[it.mid].skipOrder = true; render(); toast(B(MAP[it.mid].n + ' তালিকা থেকে বাদ', MAP[it.mid].n + ' removed from the list'), () => { ORDER.splice(i, 0, it); render(); }); },
  ordSend: el => openM({type:'ordSend', sid:el.dataset.v}),
  ordSendGo: el => { ORDER.forEach(o => { if (lastSup(MAP[o.mid]) === el.dataset.v) o.st = 'sent'; }); closeM(); render(); toast(B('অর্ডার হোয়াটসঅ্যাপে পাঠানো হয়েছে (প্রোটোটাইপ)','Order sent on WhatsApp (prototype)')); },
  ordGot: el => { const sid = el.dataset.v; const L = ORDER.filter(o => lastSup(MAP[o.mid]) === sid); go('receive'); const sc = fakeScan(); sc.sup = sid; sc.lines = L.map(o => { const m = MAP[o.mid], last = m.batches.slice(-1)[0] || {mrp:50, rate:32}; return {read:m.n, mid:m.id, batch:'', exp:yy(18), qty:String(o.q), free:'0', mrp:String(last.mrp), rate:String(last.rate), disc:'0', gst:String(m.g), sch:m.sch, inc:true}; }); sc.fromOrder = sid; openM(sc); },
  blR: el => { S.blR = +el.dataset.v; render(); },
  h1Open: () => openM({type:'h1'}), h1Print: () => printDoc(h1Print()),
  cancelBill: el => openM({type:'cancel', no:el.dataset.no, why:''}),
  cancelGo: () => { const m = S.modal, s = findSale(m.no); if (!m.why.trim()) { m.err = 1; renderM(); return; } s.cancelled = {why:m.why.trim(), at:new Date()}; s.lines.forEach(l => { const md = MAP[l.mid], b = md.batches.find(x => x.b === l.b); if (b) b.q += l.q; else md.batches.push({id:'b' + (bSeq++), b:l.b, exp:l.exp, mrp:l.mrp, rate:l.rate, q:l.q, sup:lastSup(md)}); }); closeM(); render(); toast(B('বিল বাতিল — ওষুধ স্টকে ফিরে গেছে','Bill cancelled — medicines are back in stock')); },
  credCol: el => { const s = findSale(el.dataset.no); openM({type:'cred', no:s.no, a:String(s.total - (s.paid || 0)), m:'cash'}); }, credM: el => { S.modal.m = el.dataset.v; renderM(); },
  credGo: () => { const m = S.modal, s = findSale(m.no), a = +m.a; if (!(a > 0) || a > s.total - (s.paid || 0)) { m.err = 1; renderM(); return; } s.paid = (s.paid || 0) + a; closeM(); render(); toast(B(money(a) + ' জমা হয়েছে — ' + s.name, money(a) + ' received — ' + s.name), () => { s.paid -= a; render(); }); },
  dcF: el => { S.dcF = el.dataset.v; render(); },
  pick: el => { const v = el.dataset.v; ({photo:'fPhoto', pdf:'fPdf', xlsx:'fSheet', csv:'fSheet', sign:'fSign', doc:'fDoc'})[v] && $({photo:'fPhoto', pdf:'fPdf', xlsx:'fSheet', csv:'fSheet', sign:'fSign', doc:'fDoc'}[v]).click(); },
  tpl: () => { const csv = 'name,composition,gst,unit,batch,expiry,mrp,rate,qty,supplier\nParacetamol 650 mg tab,Paracetamol 650 mg,5,strip,PC2501,' + yy(20) + ',33,22.4,20,Sample Distributor\nCetirizine 10 mg tab,Cetirizine 10 mg,5,strip,CT2502,' + yy(16) + ',18,12.2,15,Sample Distributor\n'; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'})); a.download = 'aurascale-stock-template.csv'; a.click(); },
  impSkip: el => { S.IMP.skip = !S.IMP.skip; el.setAttribute('aria-checked', S.IMP.skip); const b = ROOT.querySelector('[data-act="impGo"]'); if (b) b.innerHTML = `${ic('down')}${B(num(S.IMP.good.length - (S.IMP.skip ? S.IMP.dup : 0)) + 'টি সারি স্টকে তুলুন', 'Import ' + (S.IMP.good.length - (S.IMP.skip ? S.IMP.dup : 0)) + ' rows')}`; },
  impGo: () => { const I = S.IMP, have = {}; if (I.skip) MEDS.forEach(m => m.batches.forEach(b => have[[m.n.toLowerCase(), b.b.toLowerCase(), b.exp, b.mrp.toFixed(2)].join('|')] = 1)); let added = 0, nm = 0, sk = 0;
    I.good.forEach(o => { if (have[[o.name.toLowerCase(), o.batch.toLowerCase(), o.exp, o.mrp.toFixed(2)].join('|')]) { sk++; return; } let m = MEDS.find(x => x.n.toLowerCase() === o.name.toLowerCase()); if (!m) { m = newMed(o.name, o.comp, o.gst, UNITS[o.unit] ? o.unit : 'strip', ''); nm++; } addBatch(m, {b:o.batch, exp:o.exp, mrp:o.mrp, rate:o.rate || r2(o.mrp * .7), q:o.qty, sup:'s1'}); added++; });
    $('impPrev').innerHTML = `<div class="box-g" style="margin-bottom:16px">${ic('check', 16)} ${B(num(added) + 'টি সারি স্টকে উঠেছে (' + num(nm) + 'টি নতুন ওষুধ)', added + ' rows added to stock (' + nm + ' new medicines)')}${sk ? ' · ' + B(num(sk) + 'টি আগেই ছিল, আবার যোগ হয়নি', sk + ' were already in stock and skipped') : ''}</div>`; renderSide(); toast(B('স্টক তালিকা তোলা হয়েছে','Stock list imported')); },
  handSave: () => { const H0 = S.H, m = H0.mid ? MAP[H0.mid] : null, pack = Math.max(1, Math.round(+H0.pack || 1)), q = +H0.qty, mrp = +H0.mrp; H0.err = ''; H0.bad = '';
    const fail = (k, msg) => { H0.bad = k; H0.err = msg; $('hand').querySelector('div').innerHTML = handHtml(); };
    if (!H0.med.trim()) return fail('med', B('ওষুধের নাম লিখুন','Type the medicine name'));
    if (!m && H0.gst === '') return fail('gst', B('নতুন ওষুধ: GST % বেছে নিন','New medicine: choose the GST %'));
    if (!H0.batch.trim()) return fail('batch', B('ব্যাচ নং লিখুন','Enter the batch no.'));
    if (!H0.exp) return fail('exp', B('মেয়াদের মাস দিন','Enter the expiry month')); if (isExp(H0.exp)) return fail('exp', B('এই ব্যাচের মেয়াদ আগেই শেষ','This batch is already expired'));
    if (!(mrp > 0)) return fail('mrp', B('প্যাকে ছাপা MRP লিখুন','Enter the MRP printed on the pack')); if (!(q > 0)) return fail('qty', B('কত প্যাক এল লিখুন','Enter how many packs came'));
    const md = m || newMed(H0.med.trim(), H0.comp, H0.gst, H0.unit, H0.sch), before = stockOf(md); addBatch(md, {b:H0.batch.trim(), exp:H0.exp, mrp:r2(mrp / pack), rate:r2((+H0.rate || mrp * .7) / pack), q:q * pack, sup:H0.sup});
    ORDER = ORDER.filter(o => !(o.mid === md.id && !isLow(md))); S.H = {med:'', mid:'', batch:'', exp:ym(12), mrp:'', pack:'1', qty:'', rate:'', sup:H0.sup, gst:'', comp:'', unit:'strip', sch:'', err:''}; render(); $('hand').open = true; toast(B(md.n + ' — স্টক ' + num(before) + ' → ' + num(stockOf(md)), md.n + ' — stock ' + before + ' → ' + stockOf(md))); setTimeout(() => { const i = $('h-med'); if (i) i.focus(); }, 30); },
  toHand: el => { const m = MAP[el.dataset.id]; closeM(); S.H.med = m.n; S.H.mid = m.id; S.H.sup = lastSup(m); go('receive'); $('hand').open = true; $('h-b').focus(); },
  scanSave: () => { const m = S.modal, on = m.lines.filter(x => x.inc); m.err = '';
    const bad = on.map((x, i) => ['batch', 'exp', 'qty', 'mrp', 'gst', 'rate'].some(k => scanBad(x, k)) || (!x.mid && !x.read.trim()) ? m.lines.indexOf(x) + 1 : 0).filter(Boolean);
    if (!on.length) m.err = B('কোনো লাইনে টিক নেই','No lines are ticked'); else if (bad.length) m.err = B('লাইন ' + bad.map(num).join(', ') + ' ঠিক করুন (লাল ঘর): ব্যাচ, পরিমাণ, MRP, রেট, GST আর মেয়াদ লাগবে, আর রেট + GST MRP-র বেশি হতে পারে না। দরকার না হলে লাইনের টিক তুলে দিন।', 'Fix line(s) ' + bad.join(', ') + ' (red boxes): batch, qty, MRP, rate, GST and expiry are needed, and rate + GST cannot be above MRP. Or untick the line.');
    else { const bt = +m.total || 0, lt = scanTotal(m); if (bt > 0 && Math.abs(lt - bt) > Math.max(2, bt * .002) && !m.why.trim()) m.err = B('লাইনের মোট বিলের মোটের সাথে মিলছে না — পরিমাণ/রেট দেখুন, বা কেন আলাদা লিখুন।','Lines don’t add up to the bill total — check quantities and rates, or write why.'); }
    if (m.err) { renderM(); return; }
    let added = 0, nm = 0, gch = 0; on.forEach(x => { let md = x.mid ? MAP[x.mid] : MEDS.find(z => z.n.toLowerCase() === x.read.trim().toLowerCase()); if (!md) { md = newMed(x.read.trim(), '', x.gst, /drop|syr|ml/i.test(x.read) ? 'bottle' : 'strip', x.sch); nm++; } else { if (+x.gst !== md.g) { md.g = +x.gst; gch++; } if (x.sch !== md.sch) md.sch = x.sch; }
      const q = (+x.qty || 0) + (+x.free || 0), eff = (+x.rate) * (1 - (+x.disc || 0) / 100) * (+x.qty || 0) / q; addBatch(md, {b:x.batch.trim(), exp:normExp(x.exp), mrp:+x.mrp, rate:r2(eff), q, sup:m.sup}); added++; });
    DOCS.push({id:'d' + Date.now(), kind:'purchase', ref:m.billno, party:SUPS.find(s => s.id === m.sup).n, at:new Date(), amt:+m.total || scanTotal(m), pages:m.pages || 1});
    if (m.fromOrder) ORDER = ORDER.filter(o => lastSup(MAP[o.mid]) !== m.fromOrder || isLow(MAP[o.mid])); else ORDER = ORDER.filter(o => isLow(MAP[o.mid]));
    closeM(); render(); toast(B(num(added) + 'টি লাইন স্টকে উঠেছে' + (nm ? ', ' + num(nm) + 'টি নতুন ওষুধ' : '') + (gch ? ', ' + num(gch) + 'টির GST বদলানো হয়েছে' : '') + '। বিলের ছবি রাখা হলো।', added + ' lines added to stock' + (nm ? ', ' + nm + ' new medicines' : '') + (gch ? ', GST updated for ' + gch : '') + '. Bill photo kept.')); },
  setSave: () => { const F = S.F; S.setErr = ''; if (!F.name.trim()) S.setErr = B('ফার্মেসির নাম লিখুন','Enter the pharmacy name'); else if (F.mode !== 'none' && gstinProblem(F.gstin)) S.setErr = 'GSTIN: ' + gstinProblem(F.gstin) + B(' — GSTIN না থাকলে "GSTIN নেই" বেছে নিন।', ' — if there is no GSTIN, choose “No GSTIN”.'); else if (!(/\d/.test(F.dl) && F.dl.trim().length >= 5)) S.setErr = B('ড্রাগ লাইসেন্স নম্বর লিখুন','Enter the drug licence number'); else if (F.ownerWa && !mobOk(F.ownerWa)) S.setErr = B('মালিকের হোয়াটসঅ্যাপ ১০ সংখ্যার মোবাইল হবে, বা ফাঁকা রাখুন','Owner’s WhatsApp must be a 10-digit mobile, or empty');
    if (S.setErr) { render(); return; } Object.assign(SET, F); S.F = null; render(); toast(B('ফার্মেসির তথ্য সেভ হয়েছে — নতুন বিলে দেখাবে','Pharmacy details saved — new bills will show them')); },
  signDel: () => { S.F.sign = ''; render(); },
  posFocus: () => {}
};
function closeSheet(){ $('sheet').classList.remove('on'); $('sheet').innerHTML = ''; }
ROOT.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el) { if (!e.target.closest('.ddw')) { const a = $('mdd'), b = $('custdd'), c = $('odd'); if (a) a.innerHTML = ''; if (b) b.innerHTML = ''; if (c) c.innerHTML = ''; } return; } if (el.tagName === 'INPUT') return; const f = H[el.dataset.act]; if (f) { if (el.tagName === 'A' && !el.getAttribute('href')) e.preventDefault(); f(el, e); } });
ROOT.addEventListener('input', e => {
  const el = e.target, P = S.P, m = S.modal;
  if (el.id === 'mq') { P.q = el.value; P.sel = 0; drawMdd(); return; }
  if (el.id === 'stq') { S.stQ = el.value; const p = el.selectionStart; render(); const i = $('stq'); i.focus(); i.setSelectionRange(p, p); return; }
  if (el.id === 'blq') { S.blQ = el.value; const p = el.selectionStart; render(); const i = $('blq'); i.focus(); i.setSelectionRange(p, p); return; }
  if (el.id === 'oq') { const q = el.value, dd = $('odd'), L = medSearch(q).filter(x => !ORDER.find(o => o.mid === x.id)); dd.innerHTML = q.trim() ? `<div class="dd">${L.map(x => `<button class="it" data-act="addOrder" data-id="${x.id}"><span class="tt"><b class="latin">${esc(x.n)}</b><small>${B('স্টকে ' + num(stockOf(x)), stockOf(x) + ' in stock')}</small></span>${ic('plus', 18)}</button>`).join('') || `<div class="hd">${B('কিছু পাওয়া যায়নি','Nothing found')}</div>`}</div>` : ''; return; }
  const k = el.dataset.in;
  if (k && ['ph', 'name', 'doc', 'uhid', 'paddr', 'daddr', 'dreg', 'disc', 'refill', 'adm'].includes(k)) {
    if (k === 'ph') { el.value = el.value.replace(/\D/g, ''); P.ph = el.value; drawCust(); if (el.value.length === 10) { const prev = SALES.filter(s => s.kind === 'walkin' && s.ph === P.ph && !s.cancelled).slice(-1)[0]; if (prev && !P.name) { P.name = prev.name; $('c-n').value = prev.name; } $('rep').innerHTML = prev ? repHtml(prev) : ''; } else $('rep').innerHTML = ''; return; }
    if (k === 'disc') { el.value = el.value.replace(/[^\d.]/g, ''); P.disc = el.value; const s = $('sum'), p = el.selectionStart; s.innerHTML = sumHtml(); const i = $('c-disc'); i.focus(); i.setSelectionRange(p, p); refreshCartOnly(); return; }
    P[k] = el.value; if (P.bad[k]) { delete P.bad[k]; el.classList.remove('bad'); } if (k === 'adm') render(); return; }
  if (el.dataset.qty) { const c = P.cart.find(x => x.mid === el.dataset.qty), md = MAP[c.mid]; let v = Math.max(0, parseInt(el.value.replace(/\D/g, ''), 10) || 0); if (v > stockOf(md)) { toast(B('স্টকে আছে মাত্র ' + num(stockOf(md)) + ' ' + un(md.u), 'Only ' + stockOf(md) + ' ' + un(md.u) + ' in stock'), null, 'warn'); v = stockOf(md); el.value = v; } c.q = v; $('sum').innerHTML = sumHtml(); posCalc(); const row = el.closest('.cartl'); if (row) { row.querySelector('.amt').textContent = money2(c.amt); row.querySelector('.bt').innerHTML = c.lines.map(l => `${esc(l.b.b)} · ${fexp(l.b.exp)} × ${num(l.q)} <span class="mut">@ ${money2(l.b.mrp)}</span>`).join('<br>'); } return; }
  if (el.dataset.oq) { const o = ORDER.find(x => x.mid === el.dataset.oq); o.q = Math.max(1, +el.value.replace(/\D/g, '') || 1); return; }
  if (k === 'lowpk') { const v = parseInt(el.value, 10); if (v >= 0) { LOW = v; renderSide(); } return; }
  if (k === 'gstOnly') { S.gstOnly = el.value; render(); return; }
  if (k && k.startsWith('h')) { const map = {hmed:'med', hbatch:'batch', hexp:'exp', hmrp:'mrp', hpack:'pack', hqty:'qty', hrate:'rate', hsup:'sup', hgst:'gst', hcomp:'comp', hunit:'unit', hsch:'sch'}, f = map[k]; if (!f) return; S.H[f] = el.value;
    if (f === 'med') { const md = MEDS.find(x => x.n.toLowerCase() === el.value.trim().toLowerCase()); const was = S.H.mid; S.H.mid = md ? md.id : ''; if (md) S.H.sup = lastSup(md); if ((was !== S.H.mid) || (!md && el.value.trim().length === 1) || (!md && !was && !ROOT.querySelector('[data-in="hcomp"]') && el.value.trim())) { const p = el.selectionStart; $('hand').querySelector('div').innerHTML = handHtml(); const i = $('h-med'); i.focus(); i.setSelectionRange(p, p); } return; }
    if (['mrp', 'pack', 'qty'].includes(f)) { const t = document.createElement('div'); t.innerHTML = handHtml(); const c = t.querySelector('#hcalc'); if (c) $('hcalc').innerHTML = c.innerHTML; } return; }
  if (k && k.startsWith('s.')) { const f = k.slice(2); if (f === 'gstin') el.value = el.value.toUpperCase().replace(/[^0-9A-Z]/g, ''); if (f === 'ownerWa' || f === 'phone') el.value = el.value.replace(/\D/g, ''); S.F[f] = el.value;
    if (f === 'gstin') { const gp = gstinProblem(el.value), st = $('gstst'); st.className = gp ? 'due' : 'okc'; st.textContent = el.value.length < 15 ? num(el.value.length) + ' / ' + num(15) : (gp || '✓ ' + B('GSTIN ঠিক আছে','GSTIN is valid')); el.classList.toggle('bad', !!gp && el.value.length === 15); }
    if (f === 'dl') { const ok = /\d/.test(el.value) && el.value.trim().length >= 5, st = $('dlst'); st.className = ok ? 'okc' : 'due'; st.textContent = ok ? '✓ ' + B('লাইসেন্স নম্বর ঠিক দেখাচ্ছে','Looks like a valid licence number') : B('সার্টিফিকেটে যেমন লেখা, ঠিক তেমন লিখুন','Write it exactly as on the certificate'); }
    if (f === 'mode') render(); return; }
  if (!m) return;
  if (el.dataset.mf) { const f = el.dataset.mf; if (m.type === 'medEdit') m.f[f] = el.value; else m[f] = el.value; if (m.type === 'ret' && f === 'b') renderM(); return; }
  if (el.dataset.dv) { m.v = el.value.replace(/[^\d.]/g, ''); refreshDisc(); return; }
  if (el.dataset.dper) { m.per[el.dataset.dper] = el.value.replace(/[^\d.]/g, ''); refreshDisc(); return; }
  if (el.dataset.sup) { const [id, f] = el.dataset.sup.split('|'); if (f === 'ph') el.value = el.value.replace(/\D/g, ''); SUPS.find(s => s.id === id)[f] = el.value; return; }
  if (el.dataset.sc) { m[el.dataset.sc] = el.value; if (el.dataset.sc === 'total') { const p = el.selectionStart; renderM(); const i = ROOT.querySelector('[data-sc="total"]'); i.focus(); i.setSelectionRange(p, p); } return; }
  if (el.dataset.sl) { const [i, f] = el.dataset.sl.split('|'); const x = m.lines[+i]; if (f === 'inc') { x.inc = el.checked; renderM(); return; } x[f] = el.value; if (f === 'mid' || f === 'gst' || f === 'sch') { renderM(); return; } el.classList.toggle('bad', x.inc && scanBad(x, f)); const tg = $('modal').querySelector('.tgrow'); if (tg) { const t = document.createElement('div'); t.innerHTML = MODALS.scan(m).body; $('modal').querySelector('.tgrow').innerHTML = t.querySelector('.tgrow').innerHTML; } return; }
});
function refreshCartOnly(){ posCalc(); S.P.cart.forEach(c => { const i = ROOT.querySelector(`[data-qty="${c.mid}"]`); if (!i) return; const row = i.closest('.cartl'); row.querySelector('.amt').textContent = money2(c.amt); }); }
function refreshDisc(){ const m = S.modal, b = discBase(), c = discCalc(m); $('dres').innerHTML = dresHtml(b, c, c.pay - b.cost); }
ROOT.addEventListener('change', e => { const el = e.target; if (el.type === 'file') { const k = {fPhoto:'stock', fPdf:'stock', fSheet:'stock', fSign:'sign', fDoc:'doc'}[el.id]; onFile(k, el.files); el.value = ''; return; } if (el.dataset.in === 'hexp' || el.dataset.in === 'hsup' || el.dataset.in === 'hunit') { S.H[{hexp:'exp', hsup:'sup', hunit:'unit'}[el.dataset.in]] = el.value; } });
ROOT.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (S.modal) closeM(); closeSheet(); const a = $('mdd'); if (a) a.innerHTML = ''; return; }
  if (e.target.id === 'mq') { const L = medSearch(S.P.q, m => m.active); if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!L.length) return; S.P.sel = (S.P.sel + (e.key === 'ArrowDown' ? 1 : L.length - 1)) % L.length; drawMdd(); } if (e.key === 'Enter') { e.preventDefault(); if (L[S.P.sel]) posAdd(L[S.P.sel].id); } }
  if (e.target.dataset && e.target.dataset.qty && e.key === 'Enter') { e.preventDefault(); $('mq').focus(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && S.view === 'pos') { e.preventDefault(); posSave(); }
});
/* drag & drop on any [data-drop] */
['dragenter', 'dragover'].forEach(t => ROOT.addEventListener(t, e => { const z = e.target.closest && e.target.closest('[data-drop]'); if (z) { e.preventDefault(); z.classList.add('on'); } }));
['dragleave', 'drop'].forEach(t => ROOT.addEventListener(t, e => { const z = e.target.closest && e.target.closest('[data-drop]'); if (z) { e.preventDefault(); z.classList.remove('on'); if (t === 'drop') onFile(z.dataset.drop, e.dataTransfer.files); } }));
/* ================= LIVE: AuraScale database ================= */
const AURA_MARK = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFCQjg4MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwQTZCNEIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgIDxwYXRoIGQ9Ik0gMjI3IDEzMyBBIDExOCAxMTggMCAwIDEgNDEzIDEzMyIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC4zOCIvPgogICAgPHBhdGggZD0iTSAyNjIgMTU0IEEgNzggNzggMCAwIDEgMzc4IDE1NCIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC43Ii8+CiAgPC9nPgogIDxwYXRoIGQ9Ik0gMTk2IDQ1MiBMIDMyMCAyMTQgTCA0NDQgNDUyIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxnIGZpbGw9IiM3Q0U2QkMiPgogICAgPHJlY3QgeD0iMjg0IiB5PSIzNDgiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjEyIi8+CiAgICA8cmVjdCB4PSIzMDgiIHk9IjMyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjcyIiByeD0iMTIiLz4KICA8L2c+Cjwvc3ZnPgo=';
const LV = {role:'owner', name:'', h1:null, pdf:{}, rem:{}, busy:false, saving:false, skip:{}, urls:{}};
const SB = () => _supa, CID = () => _clinicId;
const supKey = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const lvErr = e => { try { return window.dErr ? window.dErr(e) : (e && e.message) || String(e); } catch (x) { return String(e); } };
const lvMiss = e => /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && (e.message || e.code)) || e));
function lvLS(k, v){ const key = 'aura-ph-' + CID() + '-' + k; try { if (v === undefined) return JSON.parse(localStorage.getItem(key) || 'null'); localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} return null; }
function lvSaveOrder(){ if (!LV.ready) return; lvLS('order2', ORDER.map(o => ({mid:o.mid, q:o.q, st:o.st, auto:!!o.auto}))); const sk = {}; MEDS.forEach(m => { if (m.skipOrder) sk[m.id] = 1; }); lvLS('order-skip', sk); }
const ph10 = v => { let d = String(v || '').replace(/\D/g, ''); if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2); if (d.length === 11 && d[0] === '0') d = d.slice(1); return d.slice(-10); };

/* ---------- reading ---------- */
async function lvMeds(){
  await window.loadMeds();
  const W = window.MEDS || [];
  MEDS.length = 0; Object.keys(MAP).forEach(k => delete MAP[k]);
  LOW = Number(window.LOW_PACKS); if (!(LOW >= 0)) LOW = 10;
  W.forEach(x => {
    const la = Number(x.lowAt);
    const m = {id:x.id, n:x.name || '', c:x.composition || '', u:x.unit || 'strip', g:Number(x.gst_rate) || 0, sch:String(x.schedule || '').toUpperCase(), hsn:x.hsn || '3004', low:Number(x.low_level) || 0, lowAt:la >= 0 ? la : null, active:x.is_active !== false, raw:x, skipOrder:!!LV.skip[x.id],
      batches:(x.batches || []).map(b => ({id:b.id, b:b.batch_no || '—', exp:String(b.expiry || '2099-12-31').slice(0, 7), x:!!b.expired, mrp:Number(b.mrp) || 0, rate:Number(b.purchase_rate) || 0, q:Number(b.qty) || 0, sup:supKey(b.supplier) || '_none', supName:b.supplier || ''}))};
    MEDS.push(m); MAP[m.id] = m;
  });
}
async function lvSups(){
  try { if (window.supSync) await window.supSync(true); } catch (e) {}
  const names = {}, phones = (window.ppLS && window.ppLS('sup-phones')) || {};
  Object.keys(LV_LASTSUP).forEach(k => delete LV_LASTSUP[k]);
  try {
    const b = await SB().from('ph_batches').select('medicine_id,supplier,created_at').eq('clinic_id', CID()).order('created_at', {ascending:false}).limit(5000);
    (b.data || []).forEach(x => { const k = supKey(x.supplier); if (!k) return; if (!names[k]) names[k] = String(x.supplier).trim(); if (!LV_LASTSUP[x.medicine_id]) LV_LASTSUP[x.medicine_id] = k; });
  } catch (e) {}
  MEDS.forEach(m => m.batches.forEach(b => { if (b.sup !== '_none' && !names[b.sup]) names[b.sup] = b.supName; }));
  const SN = window.SUP_NAMES || {}; Object.keys(SN).forEach(k => { if (SN[k]) names[k] = names[k] || SN[k]; });
  Object.keys(phones).forEach(k => { if (!names[k]) names[k] = SN[k] || k; });
  (LV.extraSups || []).forEach(s => { if (!names[s.id]) names[s.id] = s.n; });
  SUPS.length = 0;
  Object.keys(names).sort((a, b) => names[a].localeCompare(names[b])).forEach(k => SUPS.push({id:k, n:names[k], ph:ph10(phones[k] || '')}));
  SUPS.push({id:'_none', n:B('সাপ্লায়ার জানা নেই','Supplier not known'), ph:''});
}
function mapSale(x, items){
  const lines = (items || []).map(l => ({mid:l.medicine_id, name:l.name || '', sch:String(l.schedule || '').toUpperCase(), hsn:l.hsn || '', b:l.batch_no || '', exp:String(l.expiry || '').slice(0, 7), q:Number(l.qty) || 0, mrp:Number(l.mrp) || 0, rate:Number(l.purchase_rate) || 0, g:Number(l.gst_rate) || 0, amt:Number(l.amount) || 0, disc:Number(l.discount) || 0}));
  const h1L = lines.some(l => l.sch === 'H1' || l.sch === 'X'), at = new Date(x.created_at), rd = x.refill_due ? new Date(x.refill_due + 'T09:00:00') : null;
  let pay = x.kind === 'ipd' ? 'ipd' : (x.pay_mode || 'cash'); if (x.kind !== 'ipd' && !['cash', 'upi', 'card', 'credit'].includes(pay)) pay = 'cash';
  return {id:x.id, no:x.bill_no, at, kind:x.kind, lines, total:Number(x.total) || 0, pay, name:x.patient_name || '', ph:ph10(x.patient_phone), doc:x.doctor || '', uhid:x.uhid || '', adm:x.admission_id,
    h1:(h1L || x.patient_address) ? {paddr:x.patient_address || '', daddr:x.doctor_address || '', dreg:x.doctor_reg_no || ''} : null,
    refill:rd ? Math.max(1, Math.round((rd - at) / DAY)) : 0, refillDue:rd, reminded:!!x.refill_sent_at || !!LV.rem[x.id], wa:!!x.wa_ok,
    cancelled:x.cancelled ? {why:x.cancel_reason || '', at:new Date(x.cancelled_at || x.created_at)} : null, paid:Number(x.paid) || 0, cost:Number(x.cost_total) || 0,
    mrpT:Number(x.mrp_total) || 0, disc:Number(x.discount) || 0, discPct:Number(x.discount_pct) || 0, gst:(Number(x.cgst) || 0) + (Number(x.sgst) || 0), mode:x.gst_mode, by:x.created_by_name || '', raw:x};
}
async function lvItems(ids){
  const by = {};
  for (let i = 0; i < ids.length; i += 150) {
    const r = await SB().from('ph_sale_items').select('*').in('sale_id', ids.slice(i, i + 150));
    if (r.error) throw r.error;
    (r.data || []).forEach(l => (by[l.sale_id] = by[l.sale_id] || []).push(l));
  }
  return by;
}
async function lvSales(){
  const from = today0(); from.setDate(from.getDate() - 30);
  const r = await SB().from('ph_sales').select('*').eq('clinic_id', CID()).gte('created_at', from.toISOString()).order('created_at').limit(3000);
  if (r.error) throw r.error;
  const rows = r.data || [];
  /* refills due around today (the bill may be older than 30 days) */
  try {
    const t = Date.now() + 5.5 * 3600e3, d0 = new Date(t - 3 * DAY).toISOString().slice(0, 10), d1 = new Date(t + 3 * DAY).toISOString().slice(0, 10);
    const rf = await SB().from('ph_sales').select('*').eq('clinic_id', CID()).eq('cancelled', false).gte('refill_due', d0).lte('refill_due', d1).limit(100);
    (rf.data || []).forEach(x => { if (!rows.some(y => y.id === x.id)) rows.push(x); });
  } catch (e) {}
  const by = await lvItems(rows.map(x => x.id));
  const L = rows.map(x => mapSale(x, by[x.id])).sort((a, b) => a.at - b.at);
  /* a customer who already came back after that bill does not need a refill reminder */
  L.forEach(s => { if (s.refillDue && s.ph && L.some(y => y.ph === s.ph && y.at > s.at && !y.cancelled)) s.reminded = true; });
  SALES.length = 0; L.forEach(s => SALES.push(s));
  DOCTORS.length = 0; const seen = {}; SALES.slice().reverse().forEach(s => { const d = (s.doc || '').trim(); if (d && !seen[d.toLowerCase()] && DOCTORS.length < 30) { seen[d.toLowerCase()] = 1; DOCTORS.push(d); } });
}
async function lvAdm(){
  try { await window.deptLoadAdmissions(); } catch (e) {}
  ADM.length = 0; ((window.DEPT && DEPT.admissions) || []).forEach(a => ADM.push({id:a.id, n:a.patient_name || '', bed:a._bed || a.bed_label || a.bed || '', uhid:a.uhid || ''}));
}
const DKIND = {purchase_bill:'purchase', prescription:'rx'};
async function lvDocs(){
  DOCS.length = 0;
  try {
    const r = await SB().from('aura_docs').select('*').eq('clinic_id', CID()).eq('module', 'pharmacy').order('created_at', {ascending:false}).limit(200);
    (r.data || []).forEach(d => DOCS.push({id:d.id, kind:DKIND[d.kind] || 'other', ref:d.ref_no || '', party:d.party || '', at:new Date(d.created_at), amt:Number(d.amount) || 0, pages:(d.pages || []).length || 1, paths:d.pages || [], img:LV.urls[(d.pages || [])[0]] || ''}));
  } catch (e) {}
  try {
    const r = await SB().from('ph_supplier_returns').select('*').eq('clinic_id', CID()).order('created_at', {ascending:false}).limit(60);
    (r.data || []).forEach(x => DOCS.push({id:'ret-' + x.id, kind:'return', ref:x.no || '', party:x.supplier || '', at:new Date(x.created_at), amt:Number(x.value) || 0, pages:1, ret:x}));
  } catch (e) {}
}
function lvSet(){
  const c = (window.DEPT && DEPT.clinic) || {}, s = c.ph_settings || {};
  Object.assign(SET, {name:s.name || c.name || '', phone:s.phone || c.phone || '', addr:s.address || c.address || '', mode:s.gst_mode || 'none', gstin:s.gstin || '', dl:s.dl_no || '', pharm:s.pharmacist || '', footer:s.footer || '', ownerWa:ph10(c.whatsapp_number || ''), signer:c.bill_signatory || ''});
}
async function lvSign(){ try { SET.sign = c0().bill_sign_path ? await window.deptSignature() : ''; } catch (e) { SET.sign = ''; } }
const c0 = () => (window.DEPT && DEPT.clinic) || {};
async function lvReload(what){
  what = what || ['meds', 'sales'];
  const jobs = [];
  if (what.includes('meds')) jobs.push(lvMeds().then(() => what.includes('sups') ? lvSups() : null));
  if (what.includes('sales')) jobs.push(lvSales());
  if (what.includes('docs')) jobs.push(lvDocs());
  try { await Promise.all(jobs); } catch (e) { toast(B('তথ্য আনা গেল না: ','Could not load: ') + esc(lvErr(e)), null, 'warn'); }
  ORDER = ORDER.filter(o => MAP[o.mid]);
  if (S.modal && S.modal.type !== 'done') { try { renderM(); } catch (e) {} }
  render();
}

/* ---------- start ---------- */
async function liveBoot(){
  const L = LIVE || {};
  LV.role = L.role || 'owner'; LV.name = L.name || '';
  S.role = LV.role === 'owner' ? 'owner' : 'counter';
  try { const lg = localStorage.getItem('aurascale_lang'); if (lg === 'en' || lg === 'bn') S.lang = lg; } catch (e) {}
  try { const th = localStorage.getItem('aura-ph-theme') || localStorage.getItem('nh-theme'); if (th === 'dark') HOST.dataset.theme = 'dark'; } catch (e) {}
  const st = document.createElement('style');
  st.textContent = `.logo{background:url("${AURA_MARK}") center/126% no-repeat!important;box-shadow:0 3px 10px rgba(10,107,75,.35)}.logo i{display:none!important}
  .lvprog{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.lvprog span{font-size:12.5px;padding:4px 10px;border-radius:999px;background:var(--surface-2,#f1f4f2);border:1px solid var(--border)}
  .lvprog span.ok{color:var(--ok,#12976A);border-color:currentColor}.lvprog span.bad{color:var(--danger,#B42318);border-color:currentColor}.lvprog span.run{border-style:dashed}
  .doc .th img{width:100%;height:100%;object-fit:cover}`;
  ROOT.appendChild(st);
  LV.skip = lvLS('order-skip') || {}; LV.rem = lvLS('reminded') || {};
  S.view = S.role === 'owner' ? 'dash' : 'pos';
  try { const h = (location.hash || '').slice(1); if (ROLES[S.role].nav.includes(h)) S.view = h; } catch (e) {}
  $('view').innerHTML = `<section class="card pad" style="margin-top:20px"><b>${B('আপনার ফার্মেসির তথ্য আনা হচ্ছে…','Loading your pharmacy…')}</b><div class="sk" style="width:80%"></div><div class="sk" style="width:60%"></div><div class="sk" style="width:70%"></div></section>`;
  lvSet(); renderSide(); renderBar(); renderBnav();
  try {
    await Promise.all([lvMeds().then(lvSups), lvSales(), lvAdm(), lvDocs(), lvSign()]);
  } catch (e) { toast(B('তথ্য আনা গেল না: ','Could not load: ') + esc(lvErr(e)), null, 'warn'); }
  (lvLS('order2') || []).forEach(o => { if (MAP[o.mid] && !ORDER.find(x => x.mid === o.mid)) ORDER.push({mid:o.mid, q:Math.max(1, +o.q || 1), st:o.st === 'sent' ? 'sent' : 'list', auto:!!o.auto}); });
  LV.ready = true;
  render();
  window.AuraPH.toast = m => toast(esc(String(m || '')));
  window.AuraPH.reload = () => lvReload(['meds', 'sales', 'docs']);
  /* come back to the page after a while: fresh numbers */
  document.addEventListener('visibilitychange', () => { if (!document.hidden && LV.ready && Date.now() - (LV.lastLoad || 0) > 120000 && !S.modal) { LV.lastLoad = Date.now(); lvReload(['meds', 'sales']); } });
  LV.lastLoad = Date.now();
}

/* ---------- counter: save the bill ---------- */
function lvDoneMsg(s){ return LV.pdf[s.id] || B('বিলের PDF তৈরি হচ্ছে…','Making the bill PDF…'); }
function lvDoneSet(s, html){ LV.pdf[s.id] = html; const el = $('donePdf'); if (el) el.innerHTML = html; }
async function posSave(){
  if (LV.saving) return;
  const P = S.P; P.bad = {}; P.err = ''; const items = P.cart.filter(c => c.q > 0);
  const fail = (msg, k, el) => { P.err = msg; if (k) P.bad[k] = 1; render(); const e = $(el); if (e) e.focus(); };
  if (!items.length) return fail(B('অন্তত একটা ওষুধ যোগ করুন।','Add at least one medicine.'), null, 'mq');
  if (P.kind === 'ipd') { if (!P.adm) return fail(B('ভর্তি রোগী বেছে নিন।','Choose the admitted patient.'), 'adm', 'c-a'); }
  else {
    if (!P.name.trim()) return fail(B('ক্রেতার নাম লিখুন।','Enter the customer’s name.'), 'name', 'c-n');
    if (P.ph && !mobOk(P.ph)) return fail(B('মোবাইল নম্বর ৬-৯ দিয়ে শুরু ১০ সংখ্যার হবে (বা ফাঁকা রাখুন)।','Mobile must be 10 digits starting with 6–9 (or leave it empty).'), 'ph', 'c-ph');
    if (+P.refill && !P.ph) return fail(B('রিফিল মনে করাতে ক্রেতার মোবাইল নম্বর লাগবে।','A refill reminder needs the customer’s mobile number.'), 'ph', 'c-ph');
    if (+P.refill && !P.wa) return fail(B('রিফিল মনে করানো হোয়াটসঅ্যাপে যায় — "বিল হোয়াটসঅ্যাপে পাঠান" চালু রাখুন, বা রিফিল "মনে করাতে হবে না" করুন।','Refill reminders go on WhatsApp — keep “Send bill on WhatsApp” on, or choose “No reminder”.'), null, 'c-rf');
    const h = h1In(); if (h.length) { const w = B('শিডিউল ' + h[0] + ' ওষুধ: ', 'Schedule ' + h[0] + ' medicine: ');
      if (!P.doc.trim()) return fail(w + B('প্রেসক্রিপশনের ডাক্তারের নাম লিখুন (H1 রেজিস্টারে লাগবে)।','write the prescribing doctor’s name (for the H1 register).'), 'doc', 'c-d');
      if (!P.paddr.trim()) return fail(w + B('রোগীর ঠিকানা লিখুন।','write the patient’s address.'), 'paddr', 'h-pa');
      if (!P.daddr.trim()) return fail(w + B('ডাক্তারের ঠিকানা বা ক্লিনিক লিখুন।','write the doctor’s address or clinic.'), 'daddr', 'h-da'); }
  }
  posCalc(); const before = {}; items.forEach(c => before[c.mid] = stockOf(MAP[c.mid]));
  const p = {kind:P.kind, items:items.map(c => ({medicine_id:c.mid, qty:c.q}))};
  if (P.kind === 'ipd') p.admission_id = P.adm;
  else Object.assign(p, {patient_name:P.name.trim(), patient_phone:P.ph || '', doctor:P.doc.trim(), uhid:P.uhid.trim(), discount_pct:Math.min(100, Math.max(0, +P.disc || 0)), pay_mode:P.pay});
  const h1info = P.kind === 'walkin' && h1In().length ? {patient_address:P.paddr.trim(), doctor_address:P.daddr.trim(), doctor_reg_no:P.dreg.trim()} : null;
  const waOk = P.kind === 'walkin' && !!P.ph && P.wa, refill = waOk ? (+P.refill || 0) : 0;
  LV.saving = true; const btn = ROOT.querySelector('[data-act="posSave"]'); if (btn) { btn.disabled = true; btn.innerHTML = B('সেভ হচ্ছে…','Saving…'); }
  try {
    const r = await SB().rpc('ph_sell', {p_clinic_id:CID(), p}); if (r.error) throw r.error;
    let sale = r.data; const notes = [];
    if (P.kind === 'walkin' && p.patient_phone) { try { const lk = await SB().rpc('nhx_link_walkin', {p_kind:'pharmacy', p_id:sale.id}); if (!lk.error && lk.data && lk.data.linked) { sale.patient_id = lk.data.patient_id; sale.uhid = sale.uhid || lk.data.uhid; } } catch (e) {} }
    if (h1info) { try { const hs = await SB().rpc('ph_set_h1', {p_sale_id:sale.id, p:h1info}); if (hs.error) throw hs.error; if (hs.data) sale = Object.assign(sale, hs.data); } catch (e) { notes.push(B('H1 ঠিকানা সেভ হয়নি (' + esc(lvErr(e)) + ') — H1 রেজিস্টার থেকে পরে যোগ করুন।', 'H1 addresses were not saved (' + esc(lvErr(e)) + ').')); } }
    if (waOk) { try { const w = await SB().rpc('ph_set_whatsapp', {p_sale_id:sale.id, p_ok:true, p_refill_days:refill || null}); if (!w.error && w.data) sale = Object.assign(sale, w.data); } catch (e) {} }
    S.P = newP();
    await Promise.all([lvMeds(), lvSales()]);
    let s = SALES.find(x => x.id === sale.id); if (!s) { s = mapSale(sale, []); SALES.push(s); }
    s.before = before; s.raw = Object.assign({}, s.raw, sale);
    const fresh = items.map(c => MAP[c.mid]).filter(m => m && isLow(m) && before[m.id] > lowAt(m));
    render(); openM({type:'done', no:s.no, fresh:true});
    if (notes.length) toast(notes.join(' '), null, 'warn');
    if (fresh.length) setTimeout(() => toast(B('স্টক কমে গেছে: ', 'Stock is low: ') + fresh.map(m => `${esc(m.n)} (${num(stockOf(m))})`).join(', '), null, 'warn'), 600);
    lvAfterSale(s);
  } catch (e) { P.err = esc(lvErr(e)); render(); }
  finally { LV.saving = false; }
}
async function lvAfterSale(s){
  try {
    await window.ensureSalePdf(s.raw);
    if (s.raw.wa_ok && s.ph) {
      lvDoneSet(s, B('PDF তৈরি হয়েছে। হোয়াটসঅ্যাপে পাঠানো হচ্ছে…','PDF ready. Sending on WhatsApp…'));
      const a = await window.deptAutoSend({mode:'pharmacy_bill', sale_id:s.id});
      lvDoneSet(s, `${ic('wa', 16)} ${a && a.text ? esc(a.text) : B('PDF তৈরি হয়েছে।','PDF ready.')}${s.raw.refill_due ? '<br>' + B('রিফিল মনে করানো হবে ' + fd(new Date(s.raw.refill_due + 'T09:00:00'), {day:'numeric', month:'long'}) + '।', 'Refill reminder on ' + fd(new Date(s.raw.refill_due + 'T09:00:00'), {day:'numeric', month:'long'}) + '.') : ''}`);
    } else lvDoneSet(s, `${ic('check', 16)} ${B('বিলের PDF তৈরি — "খুলুন / প্রিন্ট" চাপুন।','Bill PDF ready — tap “Open / print”.')}`);
  } catch (e) { lvDoneSet(s, `${ic('alert', 16)} ${B('বিল সেভ হয়েছে, কিন্তু PDF তৈরি হলো না: ','The bill is saved, but the PDF could not be made: ')}${esc(lvErr(e))}`); }
}
async function lvOpenBill(s){
  if (!s) return; toast(B('বিল খোলা হচ্ছে…','Opening the bill…'));
  try { const p = await window.ensureSalePdf(s.raw); await window.deptOpenPdf('bills', p); } catch (e) { toast('PDF: ' + esc(lvErr(e)), null, 'warn'); }
}

/* ---------- photos of a bill / PDF -> lines to check ---------- */
const SCH_OK = ['H', 'H1', 'X', 'G'];
function lvLoose(x){ const m = x.mid ? MAP[x.mid] : null; if (!(+x.upp > 1)) return ''; const loose = m && /^(tab|cap|tablet|capsule)$/i.test(m.u);
  return `<small class="mut" style="display:block;margin-top:4px">${B('এক প্যাকে ' + num(x.upp) + 'টি', num(x.upp) + ' in one pack')}${loose ? ' · ' + B('খুচরো ' + un(m.u) + ' হিসেবে স্টকে উঠবে', 'goes into stock as loose ' + un(m.u)) : ''}</small>`; }
function lvScanSub(m){ const a = []; if (m.date) a.push(B('বিলের তারিখ ','Bill date ') + esc(m.date)); if (m.pages > 1) a.push(B(num(m.pages) + ' পাতা পড়া হয়েছে', m.pages + ' pages read')); if (m.gstin) a.push('GSTIN ' + esc(m.gstin)); if (m.perr && m.perr.length) a.push(`<span class="due">${B('কিছু পাতা পড়া যায়নি: ','Some pages could not be read: ')}${m.perr.map(x => B('পাতা ' + num(x.page), 'page ' + x.page)).join(', ')}</span>`); return a.join(' · '); }
function lvScanLines(d){
  const isDate = v => /^\s*\d{1,2}\s*[\/\-.]\s*\d{2,4}\s*$/.test(String(v || ''));
  return (d.lines || []).map(l => {
    const c = window.scanCandidates ? window.scanCandidates(l.name) : {best:null, list:[]}, med = c.best ? MAP[c.best.id] : null, fix = [];
    let g0 = l.gst !== null && l.gst !== undefined && l.gst !== '' ? Number(l.gst) : null;
    if (g0 !== null && [2.5, 6, 9, 14].includes(g0)) { l.gst = g0 * 2; fix.push(B('শুধু CGST লেখা ছিল (' + g0 + '% + ' + g0 + '%)', 'GST was CGST only (' + g0 + '% + ' + g0 + '%)')); }
    if (+l.mrp > 0 && +l.rate > 0 && +l.rate > +l.mrp) { const t = l.mrp; l.mrp = l.rate; l.rate = t; fix.push(B('MRP আর রেট উল্টো ছিল — ঠিক জায়গায় বসানো হয়েছে, দেখে নিন','MRP and rate were swapped — put right, please check')); }
    if (l.batch && isDate(l.batch) && (!l.expiry || !isDate(l.expiry))) { const t2 = l.expiry; l.expiry = l.batch; l.batch = t2 || ''; fix.push(B('ব্যাচ আর মেয়াদ উল্টো ছিল','Batch and expiry were swapped')); }
    let sch = med && med.sch ? med.sch : String(l.schedule || '').toUpperCase().replace(/^SCH(EDULE)?\s*/, ''), h1g = false;
    if (!SCH_OK.includes(sch)) sch = '';
    if (!sch && window.phH1Guess && window.phH1Guess(l.name + ' ' + (med ? med.c : ''))) { sch = 'H1'; h1g = true; }
    const g = l.gst !== null && l.gst !== undefined && [0, 5, 12, 18, 28].includes(Number(l.gst)) ? String(Number(l.gst)) : '';
    const e = normExp(l.expiry || '');
    return {read:l.name || '', mid:med ? med.id : '', cands:(c.list || []).map(x => x.id).filter(id => MAP[id]), batch:l.batch || '', exp:e ? e.slice(5) + '/' + e.slice(2, 4) : (l.expiry || ''), qty:l.qty != null ? String(l.qty) : '', free:String(l.free || 0), mrp:l.mrp != null ? String(l.mrp) : '', rate:l.rate != null ? String(l.rate) : '', disc:String(l.disc || 0), gst:g, sch, h1g, upp:Math.max(1, Math.round(+l.units_per_pack || 1)), pack:l.pack || '', fix:fix.join(' · '), inc:true};
  });
}
function lvProg(pz, n, st){ if (!pz) return; pz.innerHTML = `<section class="card pad" style="margin-bottom:16px"><b>${B('বিল পড়া হচ্ছে… ২০–৪০ সেকেন্ড লাগে, পাতাটা খোলা রাখুন','Reading the bill… takes 20–40 seconds, keep this page open')}</b><div class="lvprog">${st.map((x, i) => `<span class="${x.s}">${B('পাতা ' + num(i + 1), 'Page ' + (i + 1))}${x.s === 'ok' ? ' ✓ ' + num(x.n || 0) : x.s === 'bad' ? ' ✕' : ' …'}</span>`).join('')}</div><div class="sk" style="width:80%"></div><div class="sk" style="width:60%"></div></section>`; }
async function lvScanFiles(files){
  if (!window.AuraPages) return toast(B('বিল পড়ার অংশ লোড হয়নি — পাতাটা রিফ্রেশ করুন।','The bill reader did not load — refresh the page.'), null, 'warn');
  if (S.view !== 'receive') go('receive');
  const pz = $('impPrev');
  let pages;
  try { const r = await window.AuraPages.toPages([].slice.call(files), window.AuraPages.MAX || 10); pages = r.pages; if (r.notes && r.notes.length) toast(esc(r.notes.join(' ')), null, 'warn'); }
  catch (e) { if (pz) pz.innerHTML = `<div class="box-r" style="margin-bottom:16px">${esc(lvErr(e))}</div>`; return; }
  if (!pages || !pages.length) { if (pz) pz.innerHTML = `<div class="box-r" style="margin-bottom:16px">${B('ছবি বা PDF পাওয়া যায়নি।','No photo or PDF found.')}</div>`; return; }
  const st = pages.map(() => ({s:'run'})); lvProg($('impPrev'), pages.length, st);
  let d;
  try { d = await window.AuraPages.readBill(pages, null, (i, s, info) => { st[i] = {s, n:info}; lvProg($('impPrev'), pages.length, st); }); }
  catch (e) { d = {ok:false, message:lvErr(e)}; }
  const box = $('impPrev');
  if (!d || !d.ok) { if (box) box.innerHTML = `<div class="box-r" style="margin-bottom:16px"><b>${ic('alert', 16)} ${B('বিল পড়া গেল না','The bill could not be read')}</b><br>${esc((d && d.message) || '')}<br><span class="mini">${B('আবার পরিষ্কার, সোজা ছবি তুলে দিন, বা নিচে হাতে লাইন লিখুন।','Take a clearer, straight photo and try again, or type the line by hand below.')}</span></div>`; return; }
  if (!d.lines || !d.lines.length) { if (box) box.innerHTML = `<div class="box-r" style="margin-bottom:16px">${B('এই পাতাগুলোয় কোনো ওষুধের লাইন পাওয়া যায়নি।','No medicine lines were found on these pages.')}</div>`; return; }
  if (d.name_list_only) { if (box) box.innerHTML = `<div class="box-r" style="margin-bottom:16px"><b>${ic('alert', 16)} ${B('এটা স্টকের বিল নয়','This is not a stock bill')}</b><br>${B('শুধু ওষুধের নামের তালিকা মনে হচ্ছে। স্টকে তুলতে প্রতিটি লাইনে ব্যাচ, মেয়াদ, MRP, GST আর পরিমাণ লাগবে — ডিস্ট্রিবিউটরের ট্যাক্স ইনভয়েসের ছবি দিন, বা Excel / CSV দিন।','It looks like a plain list of medicine names. To add stock every line needs batch, expiry, MRP, GST and quantity — photograph the distributor’s tax invoice, or use Excel / CSV.')}</div>`; return; }
  if (box) box.innerHTML = '';
  let phn = ''; try { phn = window.supBestPhone ? window.supBestPhone(d.supplier_whatsapp, d.supplier_mobile, d.supplier_phone, d.supplier_phones, d.phone, d.phones, d.mobile) : ''; } catch (e) {}
  const known = SUPS.find(s => s.id === supKey(d.supplier));
  openM({type:'scan', supName:known ? known.n : (d.supplier || ''), supPh:phn, gstin:d.supplier_gstin || '', billno:d.invoice_no || '', date:d.invoice_date || '', total:d.bill_total != null ? String(d.bill_total) : '', why:'', err:'', lines:lvScanLines(d), pages:pages.length, pageData:pages, perr:d.page_errors || []});
}
function lvDateIso(v){ const m = String(v || '').match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/); if (!m) return ''; const y = m[3].length === 2 ? '20' + m[3] : m[3]; return y + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2); }
async function lvScanSave(){
  const m = S.modal, on = m.lines.filter(x => x.inc); m.err = '';
  const bad = on.map(x => ['batch', 'exp', 'qty', 'mrp', 'gst', 'rate'].some(k => scanBad(x, k)) || (!x.mid && !String(x.read || '').trim()) ? m.lines.indexOf(x) + 1 : 0).filter(Boolean);
  if (!String(m.supName || '').trim()) m.err = B('সাপ্লায়ারের নাম লিখুন (বিল থেকে পড়া যায়নি)।','Write the supplier’s name (it was not read from the bill).');
  else if (!on.length) m.err = B('কোনো লাইনে টিক নেই','No lines are ticked');
  else if (bad.length) m.err = B('লাইন ' + bad.map(num).join(', ') + ' ঠিক করুন (লাল ঘর): ব্যাচ, পরিমাণ, MRP, রেট, GST আর মেয়াদ লাগবে, আর রেট + GST MRP-র বেশি হতে পারে না। দরকার না হলে লাইনের টিক তুলে দিন।', 'Fix line(s) ' + bad.join(', ') + ' (red boxes): batch, qty, MRP, rate, GST and expiry are needed, and rate + GST cannot be above MRP. Or untick the line.');
  else { const bt = +m.total || 0, lt = scanTotal(m); if (bt > 0 && Math.abs(lt - bt) > Math.max(2, bt * .002) && !String(m.why || '').trim()) m.err = B('লাইনের মোট বিলের মোটের সাথে মিলছে না — পরিমাণ/রেট দেখুন, বা কেন আলাদা লিখুন।','Lines don’t add up to the bill total — check quantities and rates, or write why.'); }
  if (m.err) { renderM(); return; }
  if (LV.saving) return; LV.saving = true;
  const sup = String(m.supName).trim(), rows = [];
  on.forEach(x => {
    const md = x.mid ? MAP[x.mid] : null, upp = Math.max(1, Math.round(+x.upp || 1)), q = +x.qty || 0, fr = +x.free || 0, mrp = +x.mrp, rate = +x.rate || 0, disc = +x.disc || 0;
    const eff = (q + fr > 0 ? rate * (1 - disc / 100) * q / (q + fr) : rate);   /* discount and free packs lower the real cost */
    const nm = md ? md.n : String(x.read).trim();
    const guess = /ml|syr|susp|bottle|liq|drop/i.test(x.pack + ' ' + nm) ? 'bottle' : /inj|vial|amp/i.test(nm) ? 'vial' : /cream|gel|oint|tube/i.test(nm) ? 'tube' : /(\d+\s*'?\s*s\b|x\s*\d+|tab|cap|strip)/i.test(x.pack + ' ' + nm) ? 'strip' : 'pcs';
    const loose = md && /^(tab|cap|tablet|capsule)$/i.test(md.u) && upp > 1, k = loose ? upp : 1;
    rows.push({name:nm, gst_rate:String(x.gst), unit:md ? md.u : guess, batch_no:String(x.batch).trim(), expiry:normExp(x.exp) + '-01', mrp:String(r2(mrp / k)), purchase_rate:String(r2(eff / k)), qty:String((q + fr) * k), supplier:sup, schedule:x.sch || ''});
  });
  const bill = {supplier:sup, supplier_gstin:m.gstin || '', bill_no:String(m.billno || '').trim(), bill_date:lvDateIso(m.date), bill_total:m.total || '', lines_total:String(scanTotal(m)), note:m.why || ''};
  const btn = $('modal').querySelector('[data-act="scanSave"]'); if (btn) { btn.disabled = true; btn.innerHTML = B('স্টকে তোলা হচ্ছে…','Adding to stock…'); }
  try {
    let r = await SB().rpc('ph_import_bill', {p_clinic_id:CID(), p_bill:bill, p_rows:rows});
    if (r.error && lvMiss(r.error)) r = await SB().rpc('ph_import', {p_clinic_id:CID(), p_rows:rows});
    if (r.error) throw r.error;
    const errs = (r.data && r.data.errors) || [], msgs = [];
    if (m.supPh && mobOk(ph10(m.supPh))) { try { await SB().rpc('ph_supplier_set', {p_clinic_id:CID(), p_key:supKey(sup), p_name:sup, p_phone:ph10(m.supPh)}); } catch (e) {} }
    if (m.pageData && window.AuraDocs) { window.AuraDocs.save({module:'pharmacy', kind:'purchase_bill', ref_no:bill.bill_no, party:sup, doc_date:bill.bill_date, amount:bill.bill_total, pages:m.pageData}).then(() => lvDocs()); }
    /* GST and schedule as on the bill; pack size for strips */
    const byG = {}; on.forEach(x => { const md = x.mid ? MAP[x.mid] : null; if (md && x.gst !== '' && +x.gst !== md.g) (byG[x.gst] = byG[x.gst] || []).push(md.id); });
    for (const g in byG) { const u = await SB().rpc('ph_set_gst', {p_clinic_id:CID(), p_ids:byG[g], p_gst:Number(g)}); if (!u.error) msgs.push(B(num(byG[g].length) + 'টির GST ' + num(g) + '% করা হয়েছে', 'GST ' + g + '% for ' + byG[g].length)); }
    await lvMeds();
    for (const x of on) {
      const md = x.mid ? MAP[x.mid] : MEDS.find(z => z.n.toLowerCase() === String(x.read).trim().toLowerCase());
      if (!md || (md.sch || '') === (x.sch || '')) continue;
      const rw = md.raw || {};
      try { await SB().rpc('ph_save_medicine', {p_clinic_id:CID(), p_id:md.id, p:{name:md.n, composition:md.c, gst_rate:md.g, hsn:md.hsn, unit:md.u, low_level:md.low, schedule:x.sch || '', manufacturer:rw.manufacturer || '', is_active:md.active}}); } catch (e) {}
    }
    try { const packs = []; on.forEach(x => { if (!(+x.upp > 1)) return; const md = x.mid ? MAP[x.mid] : MEDS.find(z => z.n.toLowerCase() === String(x.read).trim().toLowerCase()); if (md && /strip/i.test(md.u) && Number(md.raw && md.raw.pack_size) !== Number(x.upp)) packs.push({id:md.id, n:Math.round(+x.upp)}); }); if (packs.length) await SB().rpc('ph_set_pack', {p_clinic_id:CID(), p:packs}); } catch (e) {}
    if (m.fromOrder) ORDER = ORDER.filter(o => lastSup(MAP[o.mid] || {batches:[]}) !== m.fromOrder);
    await lvReload(['meds', 'sups']);
    ORDER = ORDER.filter(o => MAP[o.mid] && (o.st === 'sent' ? isLow(MAP[o.mid]) : true) && (o.auto ? isLow(MAP[o.mid]) : true));
    const added = Number(r.data && r.data.stock_lines_added) || 0, nm = Number(r.data && r.data.medicines_added) || 0;
    if (errs.length) { m.err = B('কিছু লাইন ওঠেনি: ','Some lines were not added: ') + errs.map(x => B('লাইন ', 'Line ') + num(x.row) + ' ' + esc(x.name || '') + ': ' + esc(x.error)).join(' · '); m.lines = m.lines.filter((x, i) => errs.some(e => on[e.row - 1] === x)); renderM(); }
    else closeM();
    render();
    toast(B(num(added) + 'টি লাইন স্টকে উঠেছে' + (nm ? ', ' + num(nm) + 'টি নতুন ওষুধ' : ''), added + ' lines added to stock' + (nm ? ', ' + nm + ' new medicines' : '')) + (msgs.length ? ' · ' + msgs.join(' · ') : '') + B('। বিলের ছবি রাখা হলো।', '. Bill photo kept.'));
  } catch (e) { m.err = esc(lvErr(e).replace(/^BILL_EXISTS:\s*/, '')); renderM(); }
  finally { LV.saving = false; }
}

/* ---------- files ---------- */
function onFile(kind, files){
  if (!files || !files.length) return; const f = files[0];
  if (kind === 'sign') return signFile(f);
  if (kind === 'doc') return lvDocSave(files);
  if (/\.(csv|xlsx|xls)$/i.test(f.name)) { if (/\.xls$/i.test(f.name)) return toast(B('পুরোনো .xls চলবে না — Excel-এ "Save as .xlsx" করে দিন, বা CSV দিন।','Old .xls is not supported — save it as .xlsx in Excel, or use CSV.'), null, 'warn'); return sheetFile(f); }
  if (/^image\//.test(f.type) || /pdf$/i.test(f.type) || /\.(pdf|jpe?g|png|webp|heic)$/i.test(f.name)) return lvScanFiles(files);
  toast(B('এই ধরনের ফাইল চলবে না — ছবি, PDF, Excel বা CSV দিন','This file type is not supported — use a photo, PDF, Excel or CSV'), null, 'warn');
}
async function lvDocSave(files){
  if (!window.AuraDocs || !window.AuraPages) return toast(B('রাখা গেল না — পাতাটা রিফ্রেশ করুন।','Could not save — refresh the page.'), null, 'warn');
  toast(B('রাখা হচ্ছে…','Saving…'));
  try {
    const r = await window.AuraPages.toPages([].slice.call(files), 10);
    if (!r.pages.length) throw new Error(B('ছবি বা PDF পাওয়া যায়নি','No photo or PDF found'));
    const kind = S.dcF === 'purchase' ? 'purchase_bill' : S.dcF === 'rx' ? 'prescription' : 'other';
    const ok = await window.AuraDocs.save({module:'pharmacy', kind, party:'', ref_no:files[0].name.replace(/\.[a-z0-9]+$/i, ''), pages:r.pages});
    if (!ok) throw new Error(B('সার্ভারে রাখা গেল না','The server did not keep it'));
    await lvDocs(); render(); toast(B('কাগজ রাখা হয়েছে','Saved'));
  } catch (e) { toast(esc(lvErr(e)), null, 'warn'); }
}
async function lvUrl(p){ if (!p) return ''; if (LV.urls[p]) return LV.urls[p]; const r = await SB().storage.from('bills').createSignedUrl(p, 3600); if (r.error) throw r.error; LV.urls[p] = r.data.signedUrl; return r.data.signedUrl; }
VIEWS.docs.after = () => { DOCS.forEach(d => { if (d.img || !d.paths || !d.paths[0]) return; lvUrl(d.paths[0]).then(u => { d.img = u; const t = ROOT.querySelector(`[data-act="docOpen"][data-id="${d.id}"] .th`); if (t) t.innerHTML = `<img src="${esc(u)}" alt="">`; }).catch(() => {}); }); };

/* ---------- top-right menu ---------- */
function lvMenu(){
  const c = c0(), owner = LV.role === 'owner', it = [];
  const nh = window.auraDeptHomeId ? window.auraDeptHomeId() : null;
  if (nh) it.push(['dash', B('নার্সিং হোম পোর্টাল','Nursing home portal'), 'nh']);
  else if (!DEPT.standalone && LV.role === 'receptionist') it.push(['desk', B('রিসেপশন পোর্টাল','Reception portal'), 'rec']);
  if (c.mod_lab && LV.role !== 'pharmacist') it.push(['file', B('ল্যাব','Lab'), 'lab']);
  it.push(['users', owner ? B('স্টাফ ও হাজিরা','Staff & attendance') : B('আমার হাজিরা ও বেতন স্লিপ','My attendance & payslips'), 'staff']);
  if (owner) it.push(['rupee', B('সাবস্ক্রিপশন','Subscription'), 'sub']);
  it.push(['repeat', B('পুরোনো ডিজাইন','Old design'), 'classic']);
  it.push(['back', B('লগ আউট','Log out'), 'out']);
  $('sheet').innerHTML = `<div class="sc" data-act="closeSheet"></div><div class="sp" role="dialog" aria-label="${B('মেনু','Menu')}"><b>${esc(LV.name || '')} · ${ROLES[S.role].k[S.lang === 'bn' ? 0 : 1]}</b><div class="g">${it.map(x => `<button data-act="mGo" data-v="${x[2]}">${ic(x[0], 24)}${x[1]}</button>`).join('')}</div></div>`;
  $('sheet').classList.add('on');
}

/* ---------- actions on the live data ---------- */
Object.assign(H, {
  menu: () => lvMenu(),
  mGo: el => { const v = el.dataset.v; closeSheet();
    if (v === 'nh') return window.auraDeptHome && window.auraDeptHome();
    if (v === 'rec') { location.href = 'receptionist.html'; return; }
    if (v === 'lab') { location.href = 'lab.html'; return; }
    if (v === 'staff') { location.href = 'staff.html?c=' + encodeURIComponent(CID() || ''); return; }
    if (v === 'sub') { if (typeof window.auraPlansOpen === 'function') window.auraPlansOpen(); return; }
    if (v === 'classic') { window.AuraPH.unmount(true); return; }
    if (v === 'out') { if (typeof window.handleLogout === 'function') window.handleLogout(); } },
  lang: () => { S.lang = S.lang === 'bn' ? 'en' : 'bn'; try { localStorage.setItem('aurascale_lang', S.lang); } catch (e) {} SUPS.forEach(s => { if (s.id === '_none') s.n = B('সাপ্লায়ার জানা নেই','Supplier not known'); }); render(); if (S.modal) renderM(); },
  theme: () => { HOST.dataset.theme = HOST.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('aura-ph-theme', HOST.dataset.theme); } catch (e) {} renderBar(); },
  go: el => { closeSheet(); if (S.modal) closeM(); go(el.dataset.v); try { history.replaceState(null, '', '#' + S.view); } catch (e) {} },
  repeat: el => { const s = findSale(el.dataset.no), notes = []; if (!s) return; s.lines.forEach(l => { const m = MAP[l.mid]; if (!m) { notes.push(l.name + ': ' + B('তালিকায় নেই','not in your list')); return; } const ex = S.P.cart.find(c => c.mid === l.mid), have = ex ? ex.q : 0, can = Math.max(0, stockOf(m) - have), take = Math.min(l.q, can); if (take > 0) { if (ex) ex.q += take; else S.P.cart.push({mid:l.mid, q:take}); } if (take < l.q) notes.push(m.n + ': ' + (take ? B(num(l.q - take) + ' কম', (l.q - take) + ' short') : B('স্টক নেই','out of stock'))); }); refreshPos(); const rp = $('rep'); if (rp) rp.innerHTML = `<div class="box-g" style="margin:12px 0 0">${ic('check', 16)} ${B('আগের বিল বসানো হয়েছে — পরিমাণ বদলে সেভ করুন।','Last bill filled in — change any quantity, then save.')}${notes.length ? `<br><span class="due">${esc(notes.join(' · '))}</span>` : ''}</div>`; },
  billPrint: el => lvOpenBill(findSale(el.dataset.no)), billOpen: el => lvOpenBill(findSale(el.dataset.no)),
  billWa: async el => { const s = findSale(el.dataset.no); if (!s) return; try { await window.ensureSalePdf(s.raw); window.waSale(s.raw); } catch (e) { toast('PDF: ' + esc(lvErr(e)), null, 'warn'); } },
  remind: async el => { const s = findSale(el.dataset.no); if (!s) return;
    window.deptWhatsApp(s.ph, 'Namaskar ' + (s.name || '') + ',\nYour medicines from ' + (SET.name || '') + ' (bill ' + s.no + ') may be finishing soon.\nReply on WhatsApp or visit us and we will keep them ready.\nThank you.');
    s.reminded = true; LV.rem[s.id] = 1; lvLS('reminded', LV.rem); render();
    try { await SB().rpc('ph_refill_mark', {p_sale_id:s.id}); } catch (e) {} },
  /* stock */
  medSave: async () => { const m = S.modal, f = m.f; if (!String(f.n).trim()) { m.err = 1; renderM(); return; } const md = m.id ? MAP[m.id] : null, rw = (md && md.raw) || {};
    const p = {name:String(f.n).trim(), composition:f.c || '', gst_rate:String(f.g), hsn:f.hsn || '3004', unit:f.u || 'strip', low_level:String(+f.low || 0), schedule:f.sch || '', manufacturer:rw.manufacturer || ''};
    if (m.id) p.is_active = f.active === true || f.active === '1';
    const r = await SB().rpc('ph_save_medicine', {p_clinic_id:CID(), p_id:m.id || null, p}); if (r.error) { toast(esc(lvErr(r.error)), null, 'warn'); return; }
    closeM(); await lvReload(['meds']); toast(B('ওষুধ সেভ হয়েছে','Medicine saved')); },
  corrSave: async () => { const m = S.modal; if (m.q === '' || isNaN(+m.q) || +m.q < 0) { m.err = 'q'; renderM(); return; } if (!String(m.r || '').trim()) { m.err = 'r'; renderM(); return; }
    const md = MAP[m.id], b = md && md.batches.find(x => x.id === m.b), old = b ? b.q : 0;
    const r = await SB().rpc('ph_correct_batch', {p_batch_id:m.b, p_qty:Math.round(+m.q), p_reason:String(m.r).trim()}); if (r.error) { toast(esc(lvErr(r.error)), null, 'warn'); return; }
    await lvReload(['meds']); openM({type:'med', id:m.id}); toast(B('স্টক ' + num(old) + ' → ' + num(Math.round(+m.q)) + ' করা হয়েছে', 'Stock corrected ' + old + ' → ' + Math.round(+m.q))); },
  gstApply: async () => { const ids = Object.keys(S.gstSel || {}), g = +$('gstNew').value; if (!ids.length) return toast(B('অন্তত একটা ওষুধে টিক দিন','Tick at least one medicine'), null, 'warn');
    const r = await SB().rpc('ph_set_gst', {p_clinic_id:CID(), p_ids:ids, p_gst:g}); if (r.error) return toast(esc(lvErr(r.error)), null, 'warn');
    S.gstSel = {}; await lvReload(['meds']); toast(B(num(ids.length) + 'টি ওষুধের GST ' + num(g) + '% করা হয়েছে', 'GST changed to ' + g + '% for ' + ids.length + ' medicines')); },
  retSave: async () => { const m = S.modal; let md, b; MEDS.forEach(x => x.batches.forEach(y => { if (y.id === m.b) { md = x; b = y; } }));
    if (!b) { m.err = B('ব্যাচ বেছে নিন','Choose a batch'); renderM(); return; } const q = +m.q; if (!(q > 0) || q > b.q) { m.err = B('পরিমাণ ১ থেকে ' + num(b.q) + '-এর মধ্যে লিখুন', 'Quantity must be 1 to ' + b.q); renderM(); return; }
    const sup = b.supName || (SUPS.find(s => s.id === lastSup(md)) || {}).n || '';
    if (!sup || sup === B('সাপ্লায়ার জানা নেই','Supplier not known')) { m.err = B('এই ব্যাচের সাপ্লায়ার জানা নেই — পুরোনো ডিজাইনের "Return" থেকে সাপ্লায়ারের নাম লিখে ফেরত দিন।','The supplier of this batch is not known.'); renderM(); return; }
    const r = await SB().rpc('ph_return_to_supplier', {p_clinic_id:CID(), p_supplier:sup, p_reason:m.r, p_lines:[{batch_id:b.id, qty:q}]});
    if (r.error) { m.err = esc(lvMiss(r.error) ? B('ডাটাবেস আপডেট (ফাইল ৩১) আগে চালাতে হবে।','Run database update file 31 first.') : lvErr(r.error)); renderM(); return; }
    closeM(); await lvReload(['meds', 'docs']);
    toast(B(esc(md.n) + ' · ' + num(q) + ' ফেরত দেওয়া হয়েছে — ফেরতের স্লিপ "ছবি ও কাগজ"-এ রাখা হলো', esc(md.n) + ' · ' + q + ' returned — slip kept in Photos & papers'));
    try { const path = await window.retPdf(r.data); const sp = SUPS.find(s => s.id === supKey(sup)); if (sp && sp.ph) window.deptWhatsApp(sp.ph, 'Return note ' + r.data.no + ' from ' + (SET.name || '') + '\nValue ' + money2(r.data.value) + '\nReason: ' + m.r + '\nPDF:', 'bills', path); } catch (e) {} },
  /* add stock by hand */
  handSave: async () => { const H0 = S.H, m = H0.mid ? MAP[H0.mid] : null, pack = Math.max(1, Math.round(+H0.pack || 1)), q = +H0.qty, mrp = +H0.mrp; H0.err = ''; H0.bad = '';
    const fail = (k, msg) => { H0.bad = k; H0.err = msg; $('hand').querySelector('div').innerHTML = handHtml(); };
    if (!H0.med.trim()) return fail('med', B('ওষুধের নাম লিখুন','Type the medicine name'));
    if (!m && H0.gst === '') return fail('gst', B('নতুন ওষুধ: GST % বেছে নিন','New medicine: choose the GST %'));
    if (!H0.batch.trim()) return fail('batch', B('ব্যাচ নং লিখুন','Enter the batch no.'));
    if (!H0.exp) return fail('exp', B('মেয়াদের মাস দিন','Enter the expiry month')); if (isExp(H0.exp)) return fail('exp', B('এই ব্যাচের মেয়াদ আগেই শেষ','This batch is already expired'));
    if (!(mrp > 0)) return fail('mrp', B('প্যাকে ছাপা MRP লিখুন','Enter the MRP printed on the pack')); if (!(q > 0)) return fail('qty', B('কত প্যাক এল লিখুন','Enter how many packs came'));
    if (LV.saving) return; LV.saving = true;
    try {
      let id = m ? m.id : null; const before = m ? stockOf(m) : 0;
      if (!m) { const r0 = await SB().rpc('ph_save_medicine', {p_clinic_id:CID(), p_id:null, p:{name:H0.med.trim(), composition:H0.comp, gst_rate:String(H0.gst), unit:H0.unit, schedule:H0.sch}}); if (r0.error) throw r0.error; id = r0.data.id; }
      const supN = H0.sup ? ((SUPS.find(s => s.id === H0.sup) || {}).n || '') : '';
      const r = await SB().rpc('ph_receive', {p_clinic_id:CID(), p_medicine_id:id, p:{batch_no:H0.batch.trim(), expiry:H0.exp + '-01', mrp:r2(mrp / pack), purchase_rate:r2((+H0.rate || 0) / pack), qty:q * pack, supplier:supN}}); if (r.error) throw r.error;
      S.H = {med:'', mid:'', batch:'', exp:'', mrp:'', pack:'1', qty:'', rate:'', sup:H0.sup, gst:'', comp:'', unit:'strip', sch:'', err:''};
      await lvReload(['meds', 'sups']); const md = MAP[id];
      ORDER = ORDER.filter(o => !(o.mid === id && md && !isLow(md)));
      render(); const hd = $('hand'); if (hd) hd.open = true;
      toast(esc(md ? md.n : H0.med) + B(' — স্টক ' + num(before) + ' → ' + num(md ? stockOf(md) : q * pack), ' — stock ' + before + ' → ' + (md ? stockOf(md) : q * pack)));
      setTimeout(() => { const i = $('h-med'); if (i) i.focus(); }, 30);
    } catch (e) { fail('', esc(lvErr(e))); }
    finally { LV.saving = false; } },
  impGo: async () => { const I = S.IMP, have = {}; if (!I || LV.saving) return; if (I.skip) MEDS.forEach(m => m.batches.forEach(b => have[[m.n.toLowerCase(), b.b.toLowerCase(), b.exp, b.mrp.toFixed(2)].join('|')] = 1));
    const rows = []; let sk = 0;
    I.good.forEach((o, n) => { if (have[[o.name.toLowerCase(), o.batch.toLowerCase(), o.exp, o.mrp.toFixed(2)].join('|')]) { sk++; return; } rows.push({_n:n + 2, name:o.name, composition:o.comp, gst_rate:String(o.gst), unit:UNITS[o.unit] ? o.unit : (o.unit || ''), batch_no:o.batch, expiry:o.exp + '-01', mrp:String(o.mrp), purchase_rate:String(o.rate || 0), qty:String(o.qty), supplier:o.sup || ''}); });
    LV.saving = true; const btn = ROOT.querySelector('[data-act="impGo"]'); const queue = []; for (let i = 0; i < rows.length; i += 150) queue.push(rows.slice(i, i + 150));
    let done = 0, added = 0, nm = 0; const fails = [];
    const show = () => { if (btn) { btn.disabled = true; btn.textContent = B('তোলা হচ্ছে ' + num(done) + ' / ' + num(rows.length) + '… পাতাটা খোলা রাখুন', 'Importing ' + done + ' / ' + rows.length + '… keep this page open'); } };
    show();
    const worker = async () => { while (queue.length) { const part = queue.shift(), send = part.map(c => { const x = Object.assign({}, c); delete x._n; return x; }); let r;
      try { r = await SB().rpc('ph_import', {p_clinic_id:CID(), p_rows:send}); } catch (e) { r = {error:e}; }
      if (r.error) { if (/statement timeout|57014|canceling statement/i.test(String(r.error.message || r.error.code || '')) && part.length > 10) { const h = Math.ceil(part.length / 2); queue.unshift(part.slice(0, h), part.slice(h)); continue; } part.forEach(c => fails.push({row:c._n, name:c.name, error:lvErr(r.error)})); done += part.length; show(); continue; }
      added += Number(r.data.stock_lines_added) || 0; nm += Number(r.data.medicines_added) || 0; (r.data.errors || []).forEach(x => { const c = part[x.row - 1] || {}; fails.push({row:c._n || x.row, name:x.name || c.name, error:x.error}); }); done += part.length; show(); } };
    await Promise.all([worker(), worker(), worker()]);
    LV.saving = false; await lvReload(['meds', 'sups']);
    const box = $('impPrev'); if (box) box.innerHTML = `<div class="${fails.length ? 'box-w' : 'box-g'}" style="margin-bottom:16px">${ic(fails.length ? 'alert' : 'check', 16)} ${B(num(added) + 'টি সারি স্টকে উঠেছে (' + num(nm) + 'টি নতুন ওষুধ)', added + ' rows added to stock (' + nm + ' new medicines)')}${sk ? ' · ' + B(num(sk) + 'টি আগেই ছিল, আবার যোগ হয়নি', sk + ' were already in stock and skipped') : ''}${fails.length ? `<br><b>${B(num(fails.length) + 'টি সারি ওঠেনি:', fails.length + ' rows were not added:')}</b> ${fails.slice(0, 12).map(f => B('সারি ', 'Row ') + num(f.row) + ' ' + esc(f.name || '') + ' (' + esc(f.error) + ')').join(' · ')}` : ''}</div>`;
    toast(B('স্টক তালিকা তোলা হয়েছে','Stock list imported')); },
  scanSave: () => lvScanSave(),
  ordGot: el => { const sid = el.dataset.v, L = ORDER.filter(o => lastSup(MAP[o.mid]) === sid), sp = SUPS.find(s => s.id === sid); go('receive');
    openM({type:'scan', supName:sp && sid !== '_none' ? sp.n : '', billno:'', date:'', total:'', why:'', err:'', fromOrder:sid, lines:L.map(o => { const m = MAP[o.mid], last = m.batches.slice(-1)[0] || {mrp:'', rate:''}; return {read:m.n, mid:m.id, batch:'', exp:'', qty:String(o.q), free:'0', mrp:String(last.mrp || ''), rate:String(last.rate || ''), disc:'0', gst:String(m.g), sch:m.sch, inc:true, upp:1}; })}); },
  /* suppliers and orders */
  supAdd: () => { SUPS.splice(SUPS.length - 1, 0, {id:'new' + Date.now(), n:'', ph:'', fresh:true}); renderM(); },
  supSave: async () => { for (const s of SUPS) if (s.ph && !mobOk(s.ph)) return toast(B('হোয়াটসঅ্যাপ নম্বর ১০ সংখ্যার হবে','WhatsApp numbers must be 10 digits'), null, 'warn');
    const old = (window.ppLS && window.ppLS('sup-phones')) || {}, ch = [];
    SUPS.forEach(s => { if (s.id === '_none' || !String(s.n).trim()) return; const k = s.fresh ? supKey(s.n) : s.id; if (!k) return; if (ph10(old[k] || '') !== (s.ph || '') || s.fresh) ch.push({k, n:String(s.n).trim(), ph:s.ph || ''}); });
    let bad = '';
    for (const c of ch) { const r = await SB().rpc('ph_supplier_set', {p_clinic_id:CID(), p_key:c.k, p_name:c.n, p_phone:c.ph}); if (r.error) bad = lvErr(r.error); else { old[c.k] = c.ph; if (window.SUP_NAMES) window.SUP_NAMES[c.k] = c.n; } }
    if (window.ppLS) window.ppLS('sup-phones', old);
    LV.extraSups = (LV.extraSups || []).concat(ch.map(c => ({id:c.k, n:c.n})));
    closeM(); await lvSups(); render(); toast(bad ? esc(bad) : B('সাপ্লায়ার সেভ হয়েছে','Suppliers saved'), null, bad ? 'warn' : ''); },
  ordSend: el => { openM({type:'ordSend', sid:el.dataset.v}); lvFindWh(el.dataset.v); },
  ordSendGo: el => { const sid = el.dataset.v, sp = SUPS.find(s => s.id === sid), t = $('ot'); if (!sp) return;
    const url = 'https://wa.me/' + (sp.ph ? '91' + sp.ph : '') + '?text=' + encodeURIComponent(t ? t.value : ''), w = window.open(url, '_blank'); if (!w) location.href = url;
    ORDER.forEach(o => { if (lastSup(MAP[o.mid]) === sid) o.st = 'sent'; }); closeM(); render(); toast(B('হোয়াটসঅ্যাপ খোলা হয়েছে — মেসেজটা পাঠিয়ে দিন','WhatsApp opened — send the message')); },
  ordApp: async el => { const sid = el.dataset.v, wh = LV.wh && LV.wh[sid]; if (!wh) return; const L = ORDER.filter(o => lastSup(MAP[o.mid]) === sid);
    const lines = L.map(o => { const m = MAP[o.mid], rate = (m.batches.slice(-1)[0] || {rate:0}).rate; return {name:m.n, qty:o.q, unit:m.u, composition:m.c, rate, gst:m.g, amount:r2(o.q * rate * (1 + m.g / 100))}; });
    el.disabled = true; const r = await SB().rpc('aura_order_send', {p_from:CID(), p_to:wh.id, p_lines:lines, p_note:''}); el.disabled = false;
    if (r.error) return toast(esc(lvErr(r.error)), null, 'warn');
    ORDER.forEach(o => { if (lastSup(MAP[o.mid]) === sid) o.st = 'sent'; }); closeM(); render(); toast(B('অর্ডার ' + esc(r.data.order_no) + ' পাঠানো হয়েছে — ' + esc(wh.name) + ' এখনই দেখতে পাচ্ছেন', 'Order ' + esc(r.data.order_no) + ' sent — ' + esc(wh.name) + ' sees it now')); },
  /* bills */
  cancelGo: async () => { const m = S.modal, s = findSale(m.no); if (!String(m.why || '').trim()) { m.err = 1; renderM(); return; }
    const r = await SB().rpc('ph_cancel_sale', {p_sale_id:s.id, p_reason:String(m.why).trim()}); if (r.error) { toast(esc(lvErr(r.error)), null, 'warn'); return; }
    closeM(); await lvReload(['meds', 'sales']); toast(B('বিল বাতিল — ওষুধ স্টকে ফিরে গেছে','Bill cancelled — medicines are back in stock')); },
  credGo: async () => { const m = S.modal, s = findSale(m.no), a = +m.a; if (!(a > 0) || a > s.total - (s.paid || 0) + 0.001) { m.err = 1; renderM(); return; }
    const r = await SB().rpc('ph_credit_collect', {p_sale_id:s.id, p_amount:a, p_mode:m.m || 'cash'});
    if (r.error) { toast(esc(lvMiss(r.error) ? B('ধারের টাকা নিতে ডাটাবেসের ফাইল ৭৩ একবার চালাতে হবে।','Run database file 73 once to collect credit.') : lvErr(r.error)), null, 'warn'); return; }
    closeM(); await lvReload(['sales']); toast(B(money(a) + ' জমা হয়েছে — ' + esc(s.name), money(a) + ' received — ' + esc(s.name))); },
  h1Open: async () => { toast(B('H1 রেজিস্টার আনা হচ্ছে…','Loading the H1 register…')); try { await lvH1(); } catch (e) { toast(esc(lvErr(e)), null, 'warn'); } openM({type:'h1'}); },
  /* photos & papers */
  docOpen: async el => { const d = DOCS.find(x => String(x.id) === el.dataset.id); if (!d) return;
    if (d.ret) { toast(B('খোলা হচ্ছে…','Opening…')); try { const p = await window.retPdf(d.ret); await window.deptOpenPdf('bills', p); } catch (e) { toast(esc(lvErr(e)), null, 'warn'); } return; }
    if (window.AuraDocs && d.paths && d.paths.length) window.AuraDocs.view(d.paths, DK[d.kind][S.lang === 'bn' ? 0 : 1], 0, [d.ref, d.party].filter(Boolean).join(' · ')); },
  /* settings */
  setSave: async () => { const F = S.F; S.setErr = '';
    if (!String(F.name).trim()) S.setErr = B('ফার্মেসির নাম লিখুন','Enter the pharmacy name');
    else if (F.mode !== 'none' && gstinProblem(F.gstin)) S.setErr = 'GSTIN: ' + gstinProblem(F.gstin) + B(' — GSTIN না থাকলে "GSTIN নেই" বেছে নিন।', ' — if there is no GSTIN, choose “No GSTIN”.');
    else if (window.deptDlProblem && window.deptDlProblem(F.dl)) S.setErr = B('ড্রাগ লাইসেন্স: ','Drug licence: ') + esc(window.deptDlProblem(F.dl));
    else if (F.ownerWa && !mobOk(F.ownerWa)) S.setErr = B('মালিকের হোয়াটসঅ্যাপ ১০ সংখ্যার মোবাইল হবে, বা ফাঁকা রাখুন','Owner’s WhatsApp must be a 10-digit mobile, or empty');
    if (S.setErr) { render(); return; }
    try {
      const changed = ['name', 'phone', 'addr', 'mode', 'gstin', 'dl', 'pharm', 'footer'].some(k => (F[k] || '') !== (SET[k] || ''));
      if (changed) { const r = await SB().rpc('ph_save_settings', {p_clinic_id:CID(), p:{name:F.name, phone:F.phone, address:F.addr, gst_mode:F.mode, gstin:String(F.gstin || '').toUpperCase().trim(), dl_no:String(F.dl || '').toUpperCase().replace(/\s+/g, ' ').trim(), pharmacist:F.pharm, footer:F.footer}}); if (r.error) throw r.error; DEPT.clinic.ph_settings = r.data; }
      if ((F.ownerWa || '') !== (SET.ownerWa || '')) { const w = await SB().rpc('ph_set_owner_whatsapp', {p_clinic_id:CID(), p_phone:F.ownerWa || ''}); if (w.error) throw w.error; DEPT.clinic.whatsapp_number = w.data || null; }
      if ((F.sign || '') !== (SET.sign || '') || (F.signer || '') !== (SET.signer || '')) {
        let path = c0().bill_sign_path || null; const oldPath = path;
        if (F.sign && F.sign !== SET.sign) { const blob = await (await fetch(F.sign)).blob(); path = CID() + '/branding/signature-' + Date.now() + '.png'; const up = await SB().storage.from('bills').upload(path, blob, {contentType:'image/png', upsert:true, cacheControl:'3600'}); if (up.error) throw up.error; }
        if (!F.sign) path = null;
        const r2x = await SB().rpc('ph_set_bill_signature', {p_clinic_id:CID(), p_path:path, p_name:String(F.signer || '').trim()}); if (r2x.error) throw r2x.error;
        if (oldPath && oldPath !== path) { try { await SB().storage.from('bills').remove([oldPath]); } catch (e) {} }
        DEPT.clinic.bill_sign_path = path; DEPT.clinic.bill_signatory = String(F.signer || '').trim();
        try { window._deptSign = undefined; } catch (e) {}
      }
      lvSet(); SET.sign = F.sign || ''; S.F = null; render(); toast(B('ফার্মেসির তথ্য সেভ হয়েছে — নতুন বিলে দেখাবে','Pharmacy details saved — new bills will show them'));
    } catch (e) { S.setErr = esc(lvErr(e)); render(); } }
});
/* the shop-wide "alert at N packs" box on the Stock page saves itself */
ROOT.addEventListener('input', e => { const el = e.target; if (!el.dataset || el.dataset.in !== 'lowpk' || !isOwner()) return; clearTimeout(LV.lowT);
  LV.lowT = setTimeout(async () => { const v = Math.round(+el.value); if (!(v >= 0)) return; const r = await SB().rpc('aura_set_low_packs', {p_clinic:CID(), p_packs:v}); if (r.error) { toast(esc(lvMiss(r.error) ? B('আগে SQL ৫১ চালাতে হবে।','Run SQL 51 first.') : lvErr(r.error)), null, 'warn'); return; } window.LOW_PACKS = Number(r.data); await lvReload(['meds']); toast(B('কম স্টকের সতর্কতা এখন ' + num(r.data) + ' প্যাকে','Low-stock alert now at ' + r.data + ' packs')); }, 900); });
async function lvFindWh(sid){
  const sp = SUPS.find(s => s.id === sid); LV.wh = LV.wh || {}; if (!sp || !sp.ph) return;
  try { const r = await SB().rpc('aura_find_wholesaler', {p_from:CID(), p_gstin:'', p_phone:sp.ph}); const w = !r.error && r.data && r.data[0]; if (!w) return; LV.wh[sid] = w;
    const f = $('modal') && $('modal').querySelector('.mf'); if (f && S.modal && S.modal.type === 'ordSend' && !f.querySelector('[data-act="ordApp"]')) f.insertAdjacentHTML('afterbegin', `<button class="btn btn-g btn-lg" data-act="ordApp" data-v="${sid}">${ic('truck')}${B('AuraScale-এ পাঠান','Send on AuraScale')}</button>`); } catch (e) {}
}
async function lvH1(){
  const from = new Date(); from.setFullYear(from.getFullYear() - 1);
  const it = await SB().from('ph_sale_items').select('sale_id').eq('clinic_id', CID()).in('schedule', ['H1', 'X', 'h1', 'x']).limit(5000);
  if (it.error) throw it.error;
  const ids = [...new Set((it.data || []).map(x => x.sale_id))], rows = [];
  for (let i = 0; i < ids.length; i += 150) { const r = await SB().from('ph_sales').select('*').in('id', ids.slice(i, i + 150)).gte('created_at', from.toISOString()); if (r.error) throw r.error; (r.data || []).forEach(x => rows.push(x)); }
  const by = await lvItems(rows.map(x => x.id));
  LV.h1 = rows.map(x => mapSale(x, by[x.id])).sort((a, b) => a.at - b.at);
}

liveBoot();

}
})();
