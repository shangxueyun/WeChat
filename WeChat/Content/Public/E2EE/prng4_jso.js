/********************************************************************/
/*  E2EE client js encryption lib ver 1.4                          */
/*  Copyright (c) 2009-2012 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code .     */
/*                                                                  */
/********************************************************************/

function bj(){this.i=0;this.j=0;this.S=new Array();};function bM(key){var i,j,T;for(i=0;i<256;++i)this.S[i]=i;j=0;for(i=0;i<256;++i){j=(j+this.S[i]+key[i%key.length])&255;T=this.S[i];this.S[i]=this.S[j];this.S[j]=T;}this.i=0;this.j=0;};function aE(){var T;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;T=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=T;return this.S[(T+this.S[this.i])&255];};bj.prototype.init=bM;bj.prototype.next=aE;function aP(){return new bj();};var dF=256; 