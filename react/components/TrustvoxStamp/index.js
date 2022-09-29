import React, { useEffect, useLayoutEffect } from "react";
import * as S from './styles'
import defaults from "../Trustvox/defaults";

function TrustvoxStamp() {
  function setTrustvoxAttrs() {
    window['_trustvox_colt'] = [];
    window['_trustvox_colt'].push(
      ['_storeId', defaults.ID], ['_limit', '7']
    );
  }

  function addTrustvoxScript() {
    const script = window.document.createElement('script');
    script.src = '//certificate.trustvox.com.br/widget.js';
    script.async = true;
    script.defer = true;
    setTimeout(() => document.head.appendChild(script), 500);
  }

  useEffect(() => {
    setTrustvoxAttrs();
    addTrustvoxScript();
  }, []);

  useLayoutEffect(() => {
    setTrustvoxAttrs();
    addTrustvoxScript();
  }, []);

  return (
    <S.Container>
      <div data-trustvox-certificate-fixed="data-trustvox-certificate-fixed"></div>
    </S.Container>
  )
}

export default TrustvoxStamp
