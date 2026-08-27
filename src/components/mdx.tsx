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
  FutarchyFlow,
  IndexEconomyLoop,
  InfraNetwork,
  IndexLayerStack,
  ParticipantModes,
  StakingFlow,
} from '@/components/diagram';
import {
  Blocks,
  Bot,
  Boxes,
  CircleDollarSign,
  Compass,
  Gauge,
  Landmark,
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
