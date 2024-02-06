"use client"

import {ChangeEventHandler, FormEventHandler, useRef, useState} from "react";
import style from './postForm.module.css';
import { useSession } from "next-auth/react";

export default function PostForm() {
    // typescript의 경우, 'HTMLInputElement'와 같은 타입과 null값을 반드시 넣어줘야 함.
    // javascript같이 사용할 경우, 에러가 발생함.
    // 나중에 typescript 교과서를 참고할 것.
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const {data: me} = useSession();

  // 다음과 같이 textArea의 경우, HTMLTextAreaElement를 사용
  // input일 경우 HTMLInputElement를 사용
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  }

  const onClickButton = () => {
    // Typescript의 장점으로 아래와 같이 해당 Ref가 없을 수 있기 때문에
    // 오류라고 알려주고 있음.
    // if(imageRef) { ... }인 부분을 옵셔널체이닝(?.)으로 대체 가능
    imageRef.current?.click();
  }

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={me?.user?.image as string} alt={me?.user?.email as string} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea value={content} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?"/>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
              <button className={style.uploadButton} type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>게시하기</button>
          </div>
        </div>
      </div>
    </form>
  )
}