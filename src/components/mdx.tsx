import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Banner } from 'fumadocs-ui/components/banner';
import {
  AgentLoop,
  BasketFlow,
  BasketWeights,
  ConvictionSpread,
  IndexLayerStack,
  ParticipantModes,
} from '@/components/diagram';
import {
  Blocks,
  Bot,
  Boxes,
  Compass,
  Gauge,
  LineChart,
  Radar,
  RefreshCw,
  Repeat,
  Route,
  Search,
  Shuffle,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { AutoVideo } from '@/components/auto-video';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Banner,
    ConvictionSpread,
    BasketWeights,
    BasketFlow,
    AgentLoop,
    ParticipantModes,
    IndexLayerStack,
    Boxes,
    Route,
    Bot,
    Blocks,
    Workflow,
    LineChart,
    Sparkles,
    Shuffle,
    RefreshCw,
    Compass,
    Radar,
    Search,
    Gauge,
    Users,
    Repeat,
    TrendingUp,
    AutoVideo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
