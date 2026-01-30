import { Hero } from "@/components/sections/Hero";
import { LatestRelease } from "@/components/sections/LatestRelease";
import { MusicPlatforms } from "@/components/sections/MusicPlatforms";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { Shows } from "@/components/sections/Shows";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getData() {
  const [
    profile,
    socialLinks,
    featuredRelease,
    featuredVideo,
    videos,
    shows,
    contact
  ] = await Promise.all([
    prisma.artistProfile.findFirst(),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.release.findFirst({ where: { isFeatured: true } }),
    prisma.video.findFirst({ where: { isFeatured: true } }),
    prisma.video.findMany(),
    prisma.show.findMany({ where: { date: { gte: new Date() } }, orderBy: { date: "asc" } }),
    prisma.contactInfo.findFirst()
  ]);

  return {
    profile: profile || {
      stageName: "Nadir UZ",
      heroTagline: "RAP SANATÇISI",
      shortBio: "Hoşgeldiniz.",
      longBio: "Biyografi henüz eklenmedi.",
      heroHighlight: "",
      location: "Türkiye",
      genre: "Hip-Hop",
      activeSince: "2018",
      profileImageUrl: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?auto=format&fit=crop&q=80&w=1000",
      heroButtonText: "Spotify'da Dinle",
      heroButtonUrl: "#",
      aboutTitle: "Sesteki Vizyon",
      aboutHighlight: "Vizyon",
    },
    socialLinks: socialLinks || [],
    featuredRelease: featuredRelease || null,
    featuredVideo: featuredVideo || null,
    videos: videos || [],
    shows: shows || [],
    contact: contact || {
      managementEmail: "",
      bookingEmail: "",
      pressEmail: "",
      whatsappNumber: "",
      instagramDmLink: ""
    },
  };
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero profile={data.profile} featuredVideo={data.featuredVideo} />

      <div id="music">
        <LatestRelease release={data.featuredRelease} />
        <MusicPlatforms links={data.socialLinks} />
      </div>

      <div id="videos">
        <VideoGallery videos={data.videos} />
      </div>

      <div id="shows">
        <Shows shows={data.shows} />
      </div>

      <div id="about">
        <About profile={data.profile} />
      </div>

      <div id="contact">
        <Contact contact={data.contact} />
        <Footer socialLinks={data.socialLinks} />
      </div>
    </main>
  );
}
