import { Hero } from "@/components/sections/Hero";
import { LatestRelease } from "@/components/sections/LatestRelease";
import { MusicPlatforms } from "@/components/sections/MusicPlatforms";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { Shows } from "@/components/sections/Shows";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";
import { Discography } from "@/components/sections/Discography";

import prisma from "@/lib/prisma";

export const revalidate = 300; // ISR: cache 5 dakika — Hostinger shared hosting için düşük yük

async function getData() {
  const [
    rawProfile,
    socialLinks,
    featuredRelease,
    featuredVideo,
    videos,
    shows,
    contact,
    otherReleases
  ] = await Promise.all([
    prisma.artistProfile.findFirst(),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.release.findFirst({ where: { isFeatured: true } }),
    prisma.video.findFirst({ where: { isFeatured: true } }),
    prisma.video.findMany(),
    prisma.show.findMany({ where: { date: { gte: new Date() } }, orderBy: { date: "asc" } }),
    prisma.contactInfo.findFirst(),
    prisma.release.findMany({
      where: { isFeatured: false },
      orderBy: { releaseDate: "desc" }
    })
  ]);

  const defaultProfile = {
    id: "default",
    stageName: "Nadir UZ",
    realName: "",
    shortBio: "Profesyonel Müzisyen & Prodüktör",
    longBio: "Müzik kariyerine...",
    heroTagline: "SANATÇI",
    heroHighlight: "YENİ ÇIKAN",
    aboutTitle: "Hakkımda",
    aboutHighlight: "Vizyon",
    location: "İstanbul, Türkiye",
    heroButtonText: "Spotify'da Dinle",
    heroButtonUrl: "#",
    genre: "Rap",
    activeSince: "2018",
    profileImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000",
  };

  const profile = rawProfile ? {
    ...rawProfile,
    realName: rawProfile.realName ?? "",
    heroTagline: rawProfile.heroTagline ?? "",
    heroHighlight: rawProfile.heroHighlight ?? "",
    aboutTitle: rawProfile.aboutTitle ?? "",
    aboutHighlight: rawProfile.aboutHighlight ?? "",
    location: rawProfile.location ?? "",
    heroButtonText: rawProfile.heroButtonText ?? "",
    heroButtonUrl: rawProfile.heroButtonUrl ?? "",
    genre: rawProfile.genre ?? "",
    activeSince: rawProfile.activeSince ?? "",
    profileImageUrl: rawProfile.profileImageUrl ?? "",
  } : defaultProfile;

  return {
    profile,
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
    otherReleases: otherReleases || []
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
        <Discography releases={data.otherReleases} />
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
