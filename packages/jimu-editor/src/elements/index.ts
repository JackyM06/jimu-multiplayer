import { default as AppProps } from '@editor/elements/app/config';
import { default as AppManifest } from '@editor/elements/app/manifest.json';

import { default as SystemBlockProps } from '@editor/elements/system-block/config';
import { default as SystemBlockManifest } from '@editor/elements/system-block/manifest.json';

import { default as CommonButtonProps } from '@editor/elements/common-button/config';
import { default as CommonButtonManifest } from '@editor/elements/common-button/manifest.json';

export const ElementStore: Record<string, {
    manifest: {
        name: string,
        cname: string,
    },
    props: Record<string, any>
}> = {
    'app': {
        manifest: AppManifest,
        props: AppProps
    },
    'system-block': {
        manifest: SystemBlockManifest,
        props: SystemBlockProps
    },
    'common-button': {
        manifest: CommonButtonManifest,
        props: CommonButtonProps
    },
}