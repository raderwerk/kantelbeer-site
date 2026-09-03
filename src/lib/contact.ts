import type { Copy } from './copy';
import type { Dealer } from './types';

export function dealerContactHref(dealer: Dealer): string {
	switch (dealer.contact.kind) {
		case 'email':
			return `mailto:${dealer.contact.email}`;
		case 'phone':
			return `tel:${dealer.contact.phone.replace(/\s+/g, '')}`;
		case 'form':
			return `mailto:${dealer.contact.email}?subject=${encodeURIComponent('Kantelbeer')}`;
		default: {
			const exhaustive: never = dealer.contact;
			return exhaustive;
		}
	}
}

export function dealerContactLabel(dealer: Dealer, copy: Copy): string {
	switch (dealer.contact.kind) {
		case 'email':
			return `${copy.contactEmail}: ${dealer.contact.email}`;
		case 'phone':
			return `${copy.contactPhone}: ${dealer.contact.phone}`;
		case 'form':
			return `${copy.contactForm}: ${dealer.contact.email}`;
		default: {
			const exhaustive: never = dealer.contact;
			return exhaustive;
		}
	}
}
