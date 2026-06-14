import { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
    title: 'Pricing | Brandspire',
    description: 'Explore our web design and digital marketing pricing plans tailored for your business growth.',
};

export default function Pricing() {
    return <PricingClient />;
}
