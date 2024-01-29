import { FC } from "hono/jsx";
import { Icon } from "./Icon";

export const EntryCard: FC = (props) => {
  const { entry } = props;

  let cardDate: Date | undefined;
  if(entry.published) {
    cardDate = entry.published;
  } else if(entry.updated) {
    cardDate = entry.updated;
  } else {
    cardDate = undefined;
  }

  let summary: string = '';
  if(entry.summary) {
    if(entry.summary.length > 256) {
      summary = entry.summary.substring(0, 256) + '...';
    } else {
      summary = entry.summary;
    }
  }
  // if(enclosure) {
  //   if(enclosure.type.startsWith('image')) {
  //     image = enclosure.url
  //   }
  // }

  return(
    <li class={(entry.read ? "read " : "") + "item-card"}>
      <article class="item-container">
        <a href={`/app/posts/${entry.id}`}>
          <CardThumbnail 
            media={entry.media}
            logo={entry.feedLogo}
            icon={entry.feedIcon}
            title={entry.title}
            feedTitle={entry.feedTitle}
            />
        </a>
        <section class="item-card-content">
          <a href={`/app/posts/${entry.id}`}>
            <h2>{entry.title}</h2>
            <p class="item-card-text">
              {summary}
            </p>
          </a>
          <CardFooter entry={entry} cardDate={cardDate} />
        </section>
      </article>
    </li>
  );
};

const CardThumbnail: FC = ({media, logo, icon, title, feedTitle}) => {
  let mediaContent, feedLogo, feedIcon = undefined;
  if(media) {
    if(media.length > 0) {
      const firstMediaObject = media[0];
      mediaContent = firstMediaObject.content[0];
    }
  }

  if (logo) {
    feedLogo = logo;
  }

  if(icon) {
    feedIcon = icon;
  }

  // console.log({mediaContent});
  // console.log({feedLogo});
  // console.log({feedIcon});

  let image: {src: string, alt: string} | undefined = undefined;

  if(mediaContent) {
    if(mediaContent.contentType) {
      if(mediaContent.contentType.startsWith('image')) {
        image = {src: mediaContent.url, alt: title}
      }
    }
  }

  // TODO: Return different media representations
  //       depending on contentType
  return (
    <div class="post-thumbnail-container">
      {
        image
          ? <img src={image.src} alt={image.alt} class="item-card-thumbnail" />
          : feedLogo ? <div class="thumbnail-placeholder"><image src={feedLogo.uri} alt={feedTitle} class="thumbnail-logo" /></div>
            : feedIcon ? <div class="thumbnail-placeholder"><image src={feedIcon.uri} alt={feedTitle} class="thumbnail-logo" /></div>
              : <div class="thumbnail-placeholder"><Icon name="logo" /></div>
      }
    </div>
  );
}

const CardFooter: FC = ({entry, cardDate}) => {
  return (
    <div class="item-card-footer">
      <div class="item-card-footer-meta item-card-footer-row">
        <div class="item-card-footer-title-container">
          <h3 class="item-card-footer-title">{entry.feedTitle}</h3>
        </div>
        <time>
          {
            cardDate 
              ? cardDate.toLocaleDateString(
                  'en-US',
                  {
                    month: 'numeric',
                    day: 'numeric',
                    // weekday: 'long',
                    year: 'numeric'
                  }
              ) 
              : ''
          }
        </time>
      </div>
      <div class="item-card-footer-actions item-card-footer-row">
        <CardMenu entry={entry} />
      </div>
    </div>
  )
}

const CardMenu: FC = ({entry}) => {
  return (
    <ul class="item-card-menu">
      <li>
        <a class="icon-link" href={`/items/tags/${entry.id}`}>
          <Icon name="tag" />
        </a>
      </li>
      <li>
        <form action="/items/read-later/" method="post">
          <input type="hidden" name="readLaterId" />
          <button class="icon-link-button" type="submit">
            <Icon name="stopwatch" />
          </button>
        </form>
      </li>
      <li>
        <form action="/items/bookmark" method="post">
          <input type="hidden" name="bookmarkId" />
          <button class="icon-link-button" type="submit">
            <Icon name="bookmark" />
          </button>
        </form>
      </li>
      <li>
        <a class="icon-link" href={`/items/collect/${entry.id}`}>
          <Icon name="folder_add" />
        </a>
      </li>
      <li>
        <button class="icon-link-button">
          <Icon name={entry.read ? "checkbox_circle_outline" : "checkbox_circle_fill"} />
        </button>
      </li>
    </ul>
  )
}