try{
const ce = React.createElement;
mylib.loadAuth();
const g = {
 context: {}
};

const px = n => `${n}px`;
const em = n => `${n}em`;
const per = n => `${n}%`;
const _auto = `auto`;
const _zauto = `0 auto`;

const _black = `#4a575c`;
const _red = `#933a3a`;
const _pink = `#f47d73`;
const _bgrey = `#e9e7eb`;
const _grey = `#666666`;
const _lgrey = `#f5f3f8`;

const _texts = px(21);

const jo = (all = [], by = ` `) => all.join(by);

const rgba = (r, g, b, a = 1) => `rgba(${r},${g},${b},${a})`;

const mborder = 15;
const wlw = 700;
const lw = wlw - mborder * 2;
const mmheight = 1000;

const srcpath = n => /****:999:`https://jesmyl.space/src/hmzl-19/${n}`****/`../../src/hmzl-19/${n}`/****:999;****/;
const srcimgpath = n => srcpath(`img/${n}`);

const sli = (slis = []) =>
 slis.reduce((prev, curr) => {
  for (const i in curr) prev[i] = curr[i];
  return prev;
 }, {});
 
const pos = {
 abs: (top, left, right, bottom) => ({position: `absolute`, top, left, right, bottom}),
 rel: (top, left, right, bottom) => ({position: `relative`, top, left, right, bottom})
};
const bgc = (backgroundColor) => ({backgroundColor});

const und = undefined;

class Ball extends React.Component {
 constructor(props) {
  super(props);
  g.context.Body = this;
  this.state = {};
 }
 render() {
  return ce(
        `div`,
        {
         style: sli([
          pos.abs(und, this.props.l ? px(this.props.l) : und, this.props.r ? px(this.props.r) : und),
          {
           height: px(this.props.y),
           borderLeft: jo([`solid`, _black, px(1)])
          }
         ])
        },
        ce(
         `img`,
         {
          src: srcimgpath(`bauble${this.props.n}.png`),
          style: sli([
           pos.abs(und, px(-this.props.w / 2 -.5), und),
           {
            bottom: px(-this.props.w),
            width: px(this.props.w),
           }
          ])
         }
        )
       );
 }
}


class Body extends React.Component {
 constructor(props) {
  super(props);
  g.context.Body = this;
  this.state = {};
 }
 render() {
  
  return [
   ce(
    `div`,
    {
     ref: el => {
      if (this.box == null) {
       this.forceUpdate();
       this.box = el;
      }
     },
     style: {
      
     }
    },
    [
     ce(
      `style`,
      {},
      `a{color:${_red};text-decoration:none;}`
     ),
     ce(
      `div`,
      {
       key: `main`,
       style: sli([
        pos.rel(),
        bgc(_lgrey),
        {
         fontFamily: `monospace`,
         width: px(lw),
         margin: _auto,
         border: jo([px(mborder), _pink, `solid`]),
         minHeight: px(mmheight)
        }
       ])
      },
      [
       /*ce(Ball,
        {
         l: 70,
         y: 90,
         w: 50,
         n: ``
        }
       ),
       
       ce(Ball,
        {
         l: 130,
         y: 140,
         w: 70,
         n: `_1`
        }
       ),
       
       ce(Ball,
        {
         r: 140,
         y: 70,
         w: 90,
         n: `_2`
        }
       ),
       
       ce(Ball,
        {
         r: 60,
         y: 140,
         w: 60,
         n: `_3`
        }
       ),
       
       
       ce(
        `img`,
        {
         src: srcimgpath(`??????????.jpg`),
         style: sli([
          {
           display: `block`,
           margin: _zauto,
           width: per(50),
          }
         ])
        }
       ),
     
       ce(
        `b`,
        {
         style: sli([
          {
           display: `block`,
           margin: jo([px(40), _auto, px(20), _auto]),
           whiteSpace: `nowrap`,
           textAlign: `center`,
           fontSize: _texts,
           color: _black,
          }
         ])
        },
        `2 - 5 ????????????`
       ),*/
       ce(
        `img`,
        {
         src: srcimgpath(`_cwc.png`),
         style: sli([
          {
           display: `block`,
           margin: _zauto,
           width: per(50),
          }
         ])
        }
       ),
     
       ce(
        `b`,
        {
         style: sli([
          {
           display: `block`,
           margin: jo([px(25), _auto]),
           textAlign: `center`,
           fontSize: px(33),
           color: _red,
         
          }
         ])
        },
        `"?????????????????? ?????????????????? ????????????"`
       ),
     
       ce(
        `div`,
        {
         src: srcimgpath(`christmas-ring.jpg`),
         style: sli([
          {
           display: `block`,
           margin: jo([0, _auto, px(35), _auto]),
           textAlign: `center`,
           fontSize: px(14.4),
           color: rgba(90, 90, 90),
           lineHeight: em(1.2),
           width: per(83)
          }
         ])
        },
        [
         `"???? ?? ???? ???? ?????? ???? ???????????? ?? ???? ???????????? ?????????? ????????????, ???????????? ???? ?? ???????????????? ?????????????????? ?????????????? ?????? ?? ????????????????, ?????????????? ?? ???????????? ???? ?????????????? ????????????, ?????????????????????? ?????????????????? ?????????????????? ????????????."`,
         ce(`div`, {}, `???????? 20:24`)
        ]
       ),
     ce(
      Info,
      {
       img: srcimgpath(`treskin.jpg`),
       content: [
        ce(
         `div`,
         {
          style: {
           color: _black,
           fontSize: _texts
          }
         },
         `??????????????????????:`
        ),
        ce(
         `div`,
         {
          style: {
           // paddingTop: jo([px(7)]),
           display: `inline-block`,
           lineHeight: em(1.2),
           color: `black`,
           fontSize: px(28),
           borderBottom: jo([`solid black`, px(2)])
          }
         },
         `?????????????????? ??????????????`
        ),
        ce(
         `div`,
         {
          style: {
           paddingTop: px(12),
           // lineHeight: em(3.3),
           color: _black,
           fontSize: px(12.2),
          }
         },
         `???????????? ???????????????????????????? ???????????????????? ????????????`
        ),
       ]
      }
     ),
     ce(
      Info,
      {
       icon: srcimgpath(`calendar.png`),
       content: ce(
        `div`,
        {
         style: {
          fontSize: _texts,
          color: _black,
         }
        },
        `2-5 ????????????`
       )
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`vk.png`),
       content: [
        ce(`div`, {
         style: {
          display: `inline-block`,
          fontSize: _texts,
          color: _black,
          lineHeight: em(1.2),
         }
        }, `???????? ????????????????`),
        ce(
        `a`,
        {
         target: `_blank`,
         href: `https://vk.com/zimniylager`,
         style: {
          color: _red,
          display: `inline-block`,
          fontSize: _texts,
          lineHeight: em(1.2),
         }
        },
        `vk.com/zimniylager`//.toUpperCase()
       )
       ]
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`edit.png`),
       content: ce(
        `a`,
        {
         target: `_blank`,
         href: `https://docs.google.com/forms/d/e/1FAIpQLSe-fCnZf7p1tZFyTgg7kk6r8Yf8Cmvh6qZOx_3JEHevgBX64w/viewform`,
         style: {
          color: _red,
          display: `inline-block`,
          fontSize: _texts,
          // marginTop: px(40),
          lineHeight: em(1.2),
         }
        },
        `??????????????????????`
       )
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`map-location.png`),
       content: ce(
        `div`,
        {
         style: {
          fontSize: _texts,
         }
        },
        `??????????????????????, ?????????????? 38??`
       )
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`contact.png`),
       content: ce(
        `div`,
        {
         style: {
          fontSize: _texts,
         }
        },
        [
         ce(`div`, {}, `???????????????????? ????????:`),
         ce(`div`, {},
          [
           `+79781040256, `,
           ce(
            `a`,
            {
             target: `_blank`,
             style: {
              color: _red,
             },
             href: `https://vk.com/egoreast`
            },
            `VK`
           ),
          ]
         ),
         
        ]
       )
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`ruble.png`),
       content: ce(
        `div`,
        {
         style: {
          fontSize: px(17),
         }
        },
        [
         ce(`div`, {}, `1500??. - ???? 1 ????????????`),
         ce(`div`, {}, `1700??. - ?? 1 ????????????`),
         
         // ce(`div`, {}, `1500??. - ???? 25 ??????????????`),
         // ce(`div`, {}, `1700??. - ?? 26 ??????????????`),
         
         // ce(`div`, {}, `500??. - ???? ???????? ???????? (??????????????)`),
         // ce(`div`, {}, `600??. - ???? ??????????`),
         // ce(`div`, {}, `200??. - ?????? ?????????????? (??????????????)`),
         // ce(`div`, {}, `250??. - ???? ??????????`),
         ce(`div`, {}, `?????????? - ????????????????`),
        ]
       )
      }
     ),
     
     ce(
      Info,
      {
       icon: srcimgpath(`list.png`),
       content: ce(
        `div`,
        {
         style: {
          fontSize: px(20),
         }
        },
        [
         order.split(`\n`)
         .map((line, linei)=> {
          const isHead = /\d\d\.\d\d/.test(line);
          
          return ce(`div`, {
           style: sli([
            {
             fontSize: px(15)
            },
            isHead ? {
             fontWeight: `bold`,
             marginTop: linei ? px(10) : und,
             fontSize: px(17)
            } : und,
           ])
          }, line);
         })
        ]
       )
      }
     ),
    ]
   ),/****:50:****/
   ce(
    `div`,
    {
     style: sli([
      //bgc(_red),
      {
       width: lw,
       margin: _auto,
       padding: mborder,
      }
     ])
    },
    `! ???????????? ???????????? ???? ????????????????
     ?????? ?????????????????? ???????????? ??????????????????????????.
     ???????? ???? ?????????????? ???????????????????? ????????????
     ?????????????????????? ?? ??????????????, ????, ????????????????????,
     ?????????????????? ?????? ???????????????? ????????????
     ???? ?????????????? e-mail ?????????????? ??????????????????????.`
   )/****:50;****/
   ]),/****:50:****/
   this.box ?
    [
     ce(
      `input`,
      {
       value: this.box.outerHTML,
       ref: el => el && el.select(),
       onFocus: event => event.target.select()
      }
     ),
     ce(
      `button`,
      {
       onClick: ev => this.forceUpdate()
      },
      `????????????????`
     )
    ] : null/****:50;****/
  ];
 }
}



class Info extends React.Component {
 constructor(props) {
  super(props);
  g.context.Index = this;
  this.state = {};
 }
 render() {
  return ce(
   `div`,
   {
    style: {
     margin: jo([px(20), _auto]),
     width: per(70),
    }
   },
   [
    ce(
     `div`,
     {
      style: sli([
       bgc(_bgrey),
       {
        display: `flex`
       }
      ])
     },
     [
      ce(
       `div`,
       {
        style: sli([
         {
          padding: px(10),
          borderRight: jo([`solid`, _grey, px(1.5)])
         }
        ])
       },
       ce(
        `div`,
        {
         style: {
          display: `flex`,
          border: jo([`solid`, px(2), _grey]),
          borderRadius: per(50),
          overflow: `hidden`,
          width: px(100),
          height: px(100),
         }
        },
        ce(
         `img`,
         {
          src: this.props.img || this.props.icon,
          style: {
           alignSelf: `center`,
           display: `block`,
           margin: _auto,
           width: this.props.img ? px(100) : px(55),
          }
         }
        ),
       )
      ),
      ce(
       `div`,
       {
        style: {
         display: `flex`,
         padding: px(7),
         color: _black,
        }
       },
       ce(
        `div`,
        {
         style: {
          alignSelf: `center`,
         }
        },
        this.props.content
       )
      ),
     ]
    )
   ]
  );
 }
}

const order = `02.01
16:00 ??????????????????????
17:00 ????????
18:00 ???????????? 1
20:00 ?????????? ???????????? / ????????
21:30 ????????????????????

03.01
09:00 ??????????????
09:30 ?????????? ???? ??????????
10:30 ??????????
11:30 ????????, ???????????????? ?? ????????
14:00 ????????
15:00 ???????????? 2
16:30 ??????????????
17:00 ???????????? 3
18:00 ????????
19:00 ???????????? 4
20:00 ?????????? ???????????? / ????????
21:30 ??????????????

04.01
09:00 ??????????????
10:00 ???????????? 5
11:30 ?????????????? 
12:00 ???????????? 6
13:00 ????????
14:00 ??????????. ?????????? ?????? ??????????????????
18:00 ????????
19:00 ?????????? ???????????? / ????????
21:00 ??????????????

05.01
09:00 ??????????????
10:00 ??????????????-????????????
11:00 ??????????????
11:30 ??????????????-????????????
12:30 ?????????????? / ???????????????????? ????????
13:00 ????????
14:00 ??????????????`;

`?????????????? ???? ?????????????????? ????????????:
- ?????????????????? ??????????, ?????? ??????????????????, ?????? ???????? ???????? ???????????? ?????????????? ?? ?????????? ?????????? ???? ?? ???????? ?????? ?????????????? ?????????????????? ????????????????????
- ???????? ?????????????????????? ???????????????? ???????????? ???????????? ?????????????????? ?? "??????" ????????????????????????
- ???????????????????? ???????????????? ???????????????????? ???????????????? ?????????????????????? ?? ????????????
- ???????????? ????????????, ????????????????, ?????????? ???? ????????????????????:
* ??????????, ???????????? ??????????, ???????? ??????????????
* ???????????? ?????????? ???????????????? ??????????????, ?????? ?????????? ?????????????????????????????? ?? ???????????? ???????????????? ?????? ??????????.
* ????????: 2 (?? ????????????)-5 (???? ??????????) ????????????
* ????????: 1500???- ???? 1 ????????????, 1700???- ?????????? 1 ????????????. ???? ??????????- ????????????????. ???????? ???? ???????? ????????- 500??? (???????? ??????????????), ???? 600???- ???????? ?????? ?????????????? ?? ?????????? ???? ???????? ????????. ???????? ?????? ??????????????- 200??? (??????????????), 250??? (?????????????? ????????????)
* ??????????: ????????????, ???????????????? (???????? ????????????????)
* ??????????????????????:
???????? ???????? (??????????????)- ?????????????????????? ?? ??????????- ?????????????? (??????????- ?????????????????? ??.??.)
????????????????- ????????
???????? ??????????- ???????? ????????????
????????????????????- ????????
??????????????????- ???????? ????????????????????
???? ??????????
(???????????? (???????? ????????????????), ???????????????? (????????????)- 3 ????????????.
??????????- 4 ????????????- ????????
??????????, ?????????? ??????????- ????????????)
??????????????????????- ????????
?????????????? ?????????? ?????? ??????????????????????- ????????????
????????????- ???????? ??????????????
??????. ?????????????????????????? (??????????????????????)- ?????????? ????????????????
????????????????????- ????????
???????????????????????? ???????????????? ?? ????????????????- ????????
?????????? ?? ?????????????? (???????????????? ?? ?????????? ????????????, ????????????????????, ?????????????? ?? ????????????)- ????????
?????????? ????????????- ???????? ??????????
??????????????: 
2.01- ????????????
3.01- ?????????? ????????????????
4.01- ????????????
5.01- ???????? ???????????????? (?????????? ????????????????)
??????????- ?????????? ?????????????????????? (??????????????-???? ????????. ???????????? ????????, ??????????)
??????????-???????????????????? ?????? ????????????????????????????????????- ?????? ???????????? ?? ??????????- ???????????? ??????????
?????????????????????? ???????????????????????? ??????????????????????- ????????`

ReactDOM.render(ce(Body), document.querySelector(`.application`));
}catch(e){alert(e.stack);}
