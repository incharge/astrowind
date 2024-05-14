// Path: demo-page-assets/demo.ts
// This is the entry point for the demo page. It's a TypeScript file that
// loads in the module that we're buidling with this repo
import { ProofreadDom } from 'proofread-transcript'
//import './style.pcss';

const proofreadDom = new ProofreadDom();
proofreadDom.attach();
