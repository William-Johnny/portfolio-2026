"use client"

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Polaroid from './polaroid';

gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook to avoid React version discrepancies 

export const Anim = () => {
	useGSAP(() => {
		// gsap code here...
		// gsap.to('.box', { x: 360, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger:{trigger: '.square-list', markers:true, start: 'top center', end: 'bottom center', scrub: true}}); // <-- automatically reverted
		const tl = gsap.timeline()
		tl.to('.box', { x: 360, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrub: true}); // <-- automatically reverted
		tl.to('.box', { y: -360, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrub: true});

	})

  return (
	<>
		<div style={{
					height: '360px',
				}}></div>
		<Polaroid src="/reference.jpg" text="My polaroid" imgAlt="Polaroid"/>
	</>
  );
}
