import React from 'react'
import { Copy, ArrowRight, Calendar, MapPin, User, Laptop, Phone, Globe, Home, Star } from 'lucide-react'

export function Features() {
  return (
    <div className="px-2 py-2 md:px-6 md:py-10">
      <h1 className="text-3xl font-bold capitalize text-black lg:text-4xl">
        Discover Your Ideal Workspace with Ease
      </h1>
      <p className="my-2 text-gray-600 text-lg">
        Find the perfect space that suits your needs. Whether you're looking for a meeting room, private office, or a desk, we have a range of options to fit your requirements.
      </p>
      <hr />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
        {[
          {
            icon: <Copy size={20} />,
            title: 'Flexible Workspace Options',
            description: 'Explore a variety of workspace solutions tailored to your needs. From temporary setups to long-term leases, we’ve got you covered.',
          },
          {
            icon: <Calendar size={20} />,
            title: 'Book on Demand',
            description: 'Reserve your space effortlessly with our on-demand booking system, available 24/7 to fit your schedule.',
          },
          {
            icon: <MapPin size={20} />,
            title: 'Prime Locations',
            description: 'Choose from a range of prime locations that suit your business needs, with easy access and excellent amenities.',
          },
          {
            icon: <User size={20} />,
            title: 'Private Offices',
            description: 'Enjoy the privacy of your own office space with customizable layouts and dedicated resources.',
          },
          {
            icon: <Laptop size={20} />,
            title: 'Tech-Enabled Spaces',
            description: 'Benefit from modern, tech-enabled spaces with high-speed internet, video conferencing facilities, and more.',
          },
          {
            icon: <Phone size={20} />,
            title: '24/7 Access',
            description: 'Get round-the-clock access to your workspace, ensuring you can work whenever it suits you best.',
          },
          {
            icon: <Globe size={20} />,
            title: 'Global Network',
            description: 'Connect with a global network of professionals and businesses through our international workspace community.',
          },
          {
            icon: <Home size={20} />,
            title: 'Meeting Rooms',
            description: 'Book well-equipped meeting rooms for your team discussions, presentations, and collaborative sessions.',
          },
          {
            icon: <Star size={20} />,
            title: 'Premium Services',
            description: 'Access premium services such as concierge support, catering, and event management to enhance your experience.',
          },
        ].map((feature, i) => (
          <div key={i} className="space-y-3">
            <span className="inline-block rounded-full bg-gray-100 p-3 text-black">
              {feature.icon}
            </span>
            <h1 className="text-2xl font-semibold capitalize text-black">{feature.title}</h1>
            <p className="text-base text-gray-500">
              {feature.description}
            </p>
            <a
              href="#"
              className="-mx-1 inline-flex transform items-center text-base font-semibold capitalize text-black transition-colors duration-300 hover:underline"
            >
              <span className="mx-1">read more</span>
              <ArrowRight size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
