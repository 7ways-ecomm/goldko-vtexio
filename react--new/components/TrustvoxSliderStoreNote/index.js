import React, { useEffect, useLayoutEffect } from "react";
import * as S from './styles'
import defaults from "../Trustvox/defaults";
import useProduct from "vtex.product-context/useProduct";

function TrustvoxSliderStoreNote() {
  function setTrustvoxAttrs() {
    window['_trustvox_colt'] = [];
    window['_trustvox_colt'].push(
      ['_storeId', defaults.ID], ['_limit', '7']
    );
  }

  function addTrustvoxScript() {
    const script = window.document.createElement('script');
    script.src = '//colt.trustvox.com.br/colt.min.js';
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
      <div id="_trustvox_colt"></div>
    </S.Container>
  )
}

export default TrustvoxSliderStoreNote
