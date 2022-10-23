import Head from "next/head";
import Link from "next/link";

import { useAuth } from "../components/Auth/auth";
import Hero from "../components/Hero";
import Chip from "../components/Chip";

export default function Home() {
    const { user, loading, signOut } = useAuth();

    // loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Hero header="Computer Science"
                  backgroundColor="blue"
                  subheader="University of Washington | Paul Allen School of Computer Science & Engineering">
                <Chip textColor="blue">Direct to major</Chip>
                <Chip>Direct to major</Chip>
            </Hero>
            <div className="mt-16 px-6 max-w-4xl mx-auto">
                <div className="grid gap-20 grid-cols-4">
                    <div className="col-span-1">
                        <div className="sticky top-10 mt-4">
                            <h1 className="font-bold text-2xl mb-10">2021-22 Application Cycle</h1>
                            <h2 className="font-semibold text-xl">Course History</h2>
                            <h3 className="mt-3">Chem 152 (3.4)</h3>
                            <p className="leading-tight text-slate-600 text-xs">Introduction to Chemistry</p>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <h1 className="font-bold text-3xl">Personal Statement</h1>
                        <h2 className="mt-4 text-lg primary-color font-medium">Tell a story from your life, describing an experience that either demonstrates
                            your character or helped to shape it.</h2>
                        <div className="prose mt-12 text-md leading-loose">
                            Throughout my life, my high school years especially, I have been caught in this tornado of hardships, broken relationships, and a feeling of everlasting uncertainty. In reference to society, the obstacles I have encountered are in no way ‘unique’ or ‘unheard of’, rather I find them unique in the way that they happened in my life specifically, and unique in the way of how I was affected by them.
                            March 18th, 2019, my life completely changed: my mom moved out. After a long day of school, I came home expecting to find my mom sitting at the counter, reading the home improvement catalog, or watching some Hallmark Movie Mystery. Yet, when I opened the door, neither my mother nor her personal belongings were to be found. Instead, there stood my dad, the look of utter loss on his face.
                            That night I discovered that my mom moved into an apartment about ten minutes away from our house. At the moment, I saw her actions as pure selfishness. Now, after an extensive period of time, I can understand her reasoning behind her decision, although in the beginning I was filled with too much rage and heartbreak that my mind was too cloudy to paint any picture other than “my mom left me”. The truth is, she didn’t. She left my dad. I was just so blindsided by it all that I judged her decision as a way of saying she wants nothing to do with me.
                            In the beginning, I thought I couldn’t handle their separation. But, I had to remember it's not just about me. My little brother is suffering too. I had to be strong for him. Though heartbroken, depressed, and angry, I couldn’t let this affect me. I have worked too hard for my life to be halted by my parent’s unfortunate case. Amidst it all, I became the adult in the household. I’ve been the one that brings them together to reconcile their differences. Consequently, I am tired. I feel as if I am the parent of two children who can’t get along, yet I am bruised repeatedly in the process. This time, I’m done. After watching them bash each other at every available opportunity without the care that their children are present, I am absolutely frightened. Frightened by the idea that I could become like them.
                            It is easy to lose track of yourself when faced with challenges. In the first few months, I slackened. I was so depressed that school seemed to be a useless waste of time. What changed my attitude was my friends. As I struggled to go through school, my wealthy friends with their “perfect” families spoke about their big life dreams. They joked about how they can go to any expensive school because their parents are wealthy. Mine aren’t, and I’ve accepted that long ago. However, I questioned myself, why couldn’t I go to just as good a school? At that moment, I told myself, I can do it. I, a kid from a broken home,  am going to prove myself. I knew what I needed to do. I signed up for the full IB program and worked tremendously hard to give myself the best chances for success. And to be honest, it feels incredible.
                            I love my parents, I do, but I choose to learn from their mistakes. My ambition, my passion, my determination to make something of my life, is because of them. I have seen firsthand how mismanaging your priorities derails your life. My priorities have never been more clear; I want to go to college, I want to major in something I am passionate about, and I want to apply my passion to the world. Like my friends, I have big dreams. Most importantly, I want my brother to be proud of me and know that he is just as capable to have just as much ambition.
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
