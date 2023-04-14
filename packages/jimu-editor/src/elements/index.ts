import { default as AppConfig } from '@editor/elements/app/config';
import { default as AppManifest } from '@editor/elements/app/manifest.json';

import { default as SystemBlockConfig } from '@editor/elements/system-block/config';
import { default as SystemBlockManifest } from '@editor/elements/system-block/manifest.json';

import { default as CommonButtonConfig } from '@editor/elements/common-button/config';
import { default as CommonButtonManifest } from '@editor/elements/common-button/manifest.json';

export const ElementStore: Record<string, {
    manifest: {
        name: string,
        cname: string,
    },
    config: Record<string, any>
}> = {
    'app': {
        manifest: AppManifest,
        config: AppConfig
    },
    'system-block': {
        manifest: SystemBlockManifest,
        config: SystemBlockConfig
    },
    'common-button': {
        manifest: CommonButtonManifest,
        config: CommonButtonConfig
    },
}