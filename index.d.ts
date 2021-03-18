import { Context } from 'probot';

type attachments = {
    pretext?: string
    author_name?: string
    author_icon?: string
    title?: string
    title_link?: string
    text?: string
    image_url?: string
    thumb_url?: string
    footer?: string
    footer_icon?: string
}

type attachmentsManagement = {
    add: (attachments: attachments) => Promise<void>
}

export default attachments = (_: Context): attachmentsManagement =>  {

}