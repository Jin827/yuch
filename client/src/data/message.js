import React from 'react';
import { admin } from './data';

export const bankAccountPageInfoA = (
  <React.Fragment>
    {admin.companyName} 고객 업체에게&#8201;
    <span className="c-point2">
      등록되어있는 계좌 그룹을 유지하고&#44;&#8201;
    </span>
    &#8201;계좌 정보 변경만 원하시면&#44;&#8201;&#8201;
    <span className="c-point2">계좌를 수정 해주세요&#46;</span>
  </React.Fragment>
);

export const bankAccountPageInfoB = (
  <React.Fragment>
    <span className="c-point2">새로운 계좌 등록 혹은 삭제 시&#44;</span>
    &#8201;&#8201;&#39;계정 &#62; 고객계정&#39; 으로 이동하여&#44;&#8201;&#8201;
    <span className="c-point2">
      반드시 새로운 계좌를 고객 업체에 등록해주세요&#46;
    </span>
  </React.Fragment>
);

export const adminConfirmMessage = (
  <React.Fragment>
    계속 진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </React.Fragment>
);

export const adminConfirmMessageOnDelete = (
  <React.Fragment>
    정말 삭제하시겠습니까?
    <br />
    진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </React.Fragment>
);