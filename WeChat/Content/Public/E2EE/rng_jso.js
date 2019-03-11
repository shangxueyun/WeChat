/********************************************************************/
/*  E2EE client js encryption lib ver 1.4                          */
/*  Copyright (c) 2009-2012 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code .    */
/*                                                                  */
/********************************************************************/

var cv;var bA;var ay;function bg(x){bA[ay++]^=x&255;bA[ay++]^=(x>>8)&255;bA[ay++]^=(x>>16)&255;bA[ay++]^=(x>>24)&255;if(ay>=dF)ay-=dF;};function e2ee_rng_seed_time(){bg(new Date().getTime());};if(bA==null){bA=new Array();ay=0;var T;if(navigator.appName=="Netscape"&&navigator.appVersion<"5"&&window.crypto){var z=window.crypto.random(32);for(T=0;T<z.length;++T)bA[ay++]=z.charCodeAt(T)&255;}while(ay<dF){T=Math.floor(65536*Math.random());bA[ay++]=T>>>8;bA[ay++]=T&255;}ay=0;e2ee_rng_seed_time();}function bN(){if(cv==null){e2ee_rng_seed_time();cv=aP();cv.init(bA);for(ay=0;ay<bA.length;++ay)bA[ay]=0;ay=0;}return cv.next();};function bK(dA){var i;for(i=0;i<dA.length;++i)dA[i]=bN();};function az(){};az.prototype.eo=bK;az.prototype.fq=bN;