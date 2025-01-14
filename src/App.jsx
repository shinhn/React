import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() { // 이것도 컴포넌트임

  //일반변수
  let post = '강남 우동 맛집'; 

  //<State>
  //중요한 데이터 담을 때 사용
  //Destructuring : ['남자 코트 추천'(a), 함수(b)] 함수는 없으면 생략 가능
  //변수를 바꿀 때 화면이 자동으로 리렌더링 됨(자동으로 html에 반영)
  let [글제목,글제목변경] = useState(['남자코트 추천','강남 우동맛집','파이썬독학']);
  let [글제목2,글제목변경2] = useState(['남자코트 추천','강남 우동맛집','파이썬독학']);
  let [logo,setLogo] = useState('ReactBlog'); //블로그 명 같은 경우에는 변경될 일이 거의 없으므로, state를 쓸 이유가 없음 (하드코딩이 나음)

  let num = [1,2]; //Array : Ram 공간에 1,2가 저장되고 num이라는 변수에 주소값이 저장됨
  let c = num[0];
  let d = num[1];
  let [e,f] = [1,2]; //Array Destructuring

  let [like, func_like] = useState(0);
  let [like2, setLike2] = useState([0,0,0]);

  /*동적인 UI 만들기 steps
        1. html css로 미리 디자인완성
        2. UI의 현재 상태를 state로 저장
        3. state에 따라 UI가 어떻게 보일지 저장
  */
  let [modal, setModal] = useState([false,false,false]); //Modal 상태 저장
  let [modal2, setModal2] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, set입력값] = useState('');

  // <map>
  // 1. array의 자료 갯수만큼 함수안의 코드를 반복 실행해줌 => 즉, {}안에서 사용불가한 for문을 대체할 수 있음
  // 2. 함수 파라미터는 array안에 있는 자료를 의미
  // 3. return을 하면 array에 담아줌
  [1,2,3].map(function(a){  // 크롬 개발자도구 콘솔창에 그대로 복붙해서 실행해보면 js 실행 결과 알 수 있음
    //console.log(a);
    return '444' 
  })

  // 함수 선언 방법 
  // 1. 함수 따로 선언 후 호출 {func_like_ex}
  // 2. 함수 바로 선언 {function() {like+1}}
  // 3. 화살표 함수 {() => {like+1}}

  // 이벤트 버블링
  // 클릭이벤트는 상위html로 번짐 => span 좋아요만 눌러도 상위 h4, div 모두 눌리게 되어 상위 이벤트까지 실행되는 현상
  // e.stopPropagation() 로 버블링 막을 수 있음

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'red', fontSize:'16px'}}>블로그</h4> {/* 스타일 직접 지정 */}
        <h4>{logo}</h4> {/* useState 변수 */}
      </div>
      <h4 id={post}>{post}</h4> {/* 변수 지정 (id) 변수명에 중괄호 필수 */}

      <button onClick={()=>{
          //글제목[0] = '여자코트 추천'; // 원본 데이터 변경 (좋지 않은 방법)
          // 글제목변경(글제목); // state를 변경

          let new글제목 = [...글제목]; // Array 복사 : let new글제목 = 글제목 으로 복사하면 주소값만 복사되어 같은 주소값을 가지게 됨 즉, 같은 데이터를 가리키게 됨
          new글제목[0] = '여자코트 추천'; // Array 수정
          글제목변경(new글제목); // state를 변경 (기존 state와 같을 경우 변경하지 않음)
          }}>
        글제목 변경
      </button>

      <button onClick={()=>{
          let new글제목2 = [...글제목];
          new글제목2.sort();
          글제목변경(new글제목2);
      }}>
        글제목 정렬
      </button>

      {/* 모달창 맨 아래 하나만 출력 */}

      {
        글제목.map(function(a,i){
          return(
            <div className="list" key={i}>
              <h4 onClick={()=>{
                modal2 == true ? setModal2(false) : setModal2(true) // 삼항연산자 (조건식 ? 참일 때 실행할 코드 : 거짓일 때 실행할 코드)
                setTitle(i)
              }}>
              {글제목[i]} 
                <span onClick={(e)=>{e.stopPropagation(), func_like(like+1)}}>👍</span> {like} 
                <p>2월 17일 발행</p>
                <button onClick={(e)=>{
                  e.stopPropagation()
                  let tmp = [...글제목]
                  tmp.shift(i,1) // array.splice(자르기 시작 index, 몇개 삭제할건지)
                  글제목변경(tmp)
                }}>
                  글삭제
                </button>
              </h4>
            </div>
          )
          }
        )
      }

      {
        modal2 == true ? <Modal2 글제목={글제목} color={'skyblue'} 글제목변경={글제목변경} title={title}/> : null
      }   

      
      <input onChange={(e)=>{
        set입력값(e.target.value)
        console.log(입력값) //자바스크립트 특성상 state에 값을 저장하는 것은 log찍히고 나서 수행됨
        }}>
      </input>

      <button onClick={()=>{
        let tmp = [...글제목]
        tmp.unshift(입력값)
        글제목변경(tmp)
        }}>
        글발행
      </button>      


      {/* 모달창 각각 출력, 좋아요도 각각 */}
        
      {
        글제목2.map(function(a, i){ // a : array안에 있는 자료, i : 반복문이 돌 때 마다 0부터 1씩 증가하는 정수
          return (
            <div className="list" key={i}> {/* key : 반복문을 돌 때 필수적으로 넣어줘야 함 */}
              
              {/* <h4>{a}</h4> */}

              <h4 onClick={()=>{
                  let tmp = [...modal]
                  tmp[i] == true ? tmp[i]=false : tmp[i]=true
                  setModal(tmp)
                }}> 
                {글제목2[i]}
                {/* <span onClick={()=>{func_like(like+1)}}>👍</span> {like} 전체 좋아요 수가 변경되는 문제 */}
                <span onClick={()=>{
                  let newLike2 = [...like2];
                  newLike2[i] = newLike2[i]+1;
                  setLike2(newLike2)
                  }}>👍
                </span>
                {like2[i]}
              </h4>
              <p>날짜</p>
              {
                modal[i] == true ? <Modal 글제목2={글제목2[i]}/> : null
              }
            </div>
          )
        })
      }



    </div>
  )
}

// <props>
// 자식이 부모의 state를 가져다쓰고 싶을 때는 props를 사용해야 함
// 부모 App -> props -> 자식 Modal 만 가능
// 즉, state를 만드는 곳은 state 사용하는 컴포넌트들 중 최상위 컴포넌트(ex App)에 만들어야 함
// 1. <자식컴포넌트 작명={state이름}>
// 2. props 파라미터 등록 후 props.파라미터 사용

// <componant>
// 1. 반복적인 html 축약할 때 (많은 div를 한 단어로 줄여 재사용)
// 2. 큰 페이지들
// 3. 자주변경되는 것들
// 단점 : state를 사용할 수 없음 (state 선언부가 다른 함수인 function App() 내에 있기 때문) 
// => props 사용 => 컴포넌트가 너무 많아지면 부모 state를 사용할 때 props로 가져와야 하는데 그만큼 복잡하고 귀찮아짐

// Modal 컴포넌트 생성 1-1. 함수형 컴포넌트
function Modal(props) { 
  return (
    <div className='modal'> {/* <div></div> 대신 <></> 사용 가능 */}
      <h4>{props.글제목2}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

// Modal 컴포넌트 생성 1-2. 함수(변수형) 컴포넌트
let Modal2 = function(props) { 
  return(
    <div className='modal' style={{background : props.color}}> {/*다양한 색의 모달창이 필요할 경우 : 색깔마다 모달창을 따로 만들기 보다는 모달인 자식에 부모 props.color을 사용하겠다고 일종의 빈 값을 뚫어 놓고, 부모에서 색깔 지정*/}
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <botton onClick={()=>{
        // props.글제목변경(['여자코트 추천','강남 우동맛집','파이썬독학'])
        let tmp = [...props.글제목]
        tmp[0] = '여자코트 추천'
        props.글제목변경(tmp)
      }}>글수정</botton>
    </div>
  )
}

// Modal 컴포넌트 생성 2. class를 이용한 옛날 컴포넌트 생성 방법 (요즘은 다 함수형을 쓰지만, 간혹 옛날 리액트 프로젝트는 class로 되어 있는 경우도 있음, 참고)
// class : 간단히 변수, 함수 보관용이라고 볼 수 있음 (필수값 : constructor, super, render)
// class Modal3 extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       name : 'kim',
//       age : 20
//     }
//   }
//   render(){
//     return(
//       <div>클래스형 컴포넌트 {this.state.name}
//         <button onClick={()=>{
//           this.setState({age : 21})
//         }}>버튼</button>
//       </div>
//     )
//   }
// }

export default App
