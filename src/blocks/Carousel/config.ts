import { link } from '@/fields/link';
import { settingField } from '@/fields/setting';
import { Block } from 'payload';

export const Carousel: Block = {
    slug: 'carousel',
    interfaceName: 'CarouselBlock',
    fields: [
        settingField({
            overrides:[
                {
                    name: 'type',
                    type: 'select',
                    defaultValue: 'content',
                    options: [
                        {
                            label: 'Content',
                            value: 'content'
                        }
                    ],
                },
                {
                    type: 'checkbox',
                    name: 'fullWidth',
                    admin: {
                        description: "If checked, the carousel will extend to the full width of the viewport, overflowing the container."
                    }
                }
            ]
        }),
        {
            name: "title",
            type: "text",  
            localized: true         
        },
        {
            name: "subtitle",
            type: "richText",
            localized: true
        },
        link({
            overrides: {
                required: false,
                localized: true,
            }
        }),
        {
            type: 'array',
            name: 'slides',
            fields: [         
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'radio',
                            name: 'direction',
                            defaultValue: 'slide-to-left',
                            options: [
                                {
                                    label: 'Slide to right',
                                    value: 'slide-to-right'
                                },
                                {
                                    label: 'Slide to left',
                                    value: 'slide-to-left'
                                }
                            ],
                            admin: {
                                width: "50%"
                            }
                        },
                        {
                            type: 'number',
                            name: 'slidesPerView',
                            admin: {
                                width: "50%",
                            }
                        },
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'checkbox',
                            name: 'autoPlay',
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'enableArrow',
                            type: 'checkbox',
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                },
                {
                    type: 'array',
                    name: 'items',
                    fields: [          
                        {
                            type: 'richText',
                            name: 'content',
                            admin: {
                                condition: (_, __, {blockData}) => blockData.settings.type === 'content'                               
                            },
                            localized: true
                        }
                    ], 
                    minRows: 1
                }
            ],
            minRows: 1
        },
        
    ]
}