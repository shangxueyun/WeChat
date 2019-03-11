/********************************************************************/
/*  E2EE client js encryption lib ver 1.4                          */
/*  Copyright (c) 2009-2012 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code .    */
/*                                                                  */
/********************************************************************/

var du="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var dz="=";function aA(h){var i;var c;var an="";for(i=0;i+3<=h.length;i+=3){c=parseInt(h.substring(i,i+3),16);an+=du.charAt(c>>6)+du.charAt(c&63);}if(i+1==h.length){c=parseInt(h.substring(i,i+1),16);an+=du.charAt(c<<2);}else if(i+2==h.length){c=parseInt(h.substring(i,i+2),16);an+=du.charAt(c>>2)+du.charAt((c&3)<<4);}while((an.length&3)>0)an+=dz;return an;};function aT(s){var an="";var i;var k=0;var cQ;for(i=0;i<s.length;++i){if(s.charAt(i)==dz)break;v=du.indexOf(s.charAt(i));if(v<0)continue;if(k==0){an+=O(v>>2);cQ=v&3;k=1;}else if(k==1){an+=O((cQ<<2)|(v>>4));cQ=v&0xf;k=2;}else if(k==2){an+=O(cQ);an+=O(v>>2);cQ=v&3;k=3;}else{an+=O((cQ<<2)|(v>>4));an+=O(v&0xf);k=0;}}if(k==1)an+=O(cQ<<2);return an;};function aC(s){var h=aT(s);var i;var a=new Array();for(i=0;2*i<h.length;++i){a[i]=parseInt(h.substring(2*i,2*i+2),16);}return a;} 