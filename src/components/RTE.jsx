// __define-ocg__
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// Renders a TinyMCE rich text editor with advanced plugin configuration
export default function App() {
  return (
    <Editor
      // Uses TinyMCE API key from environment variables
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      init={{
        // Enables core and premium editing plugins
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link',
          'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed',
          'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
          'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions',
          'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect',
          'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
        ],

        // Toolbar layout and available editor actions
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

        // Enables inline comment system
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',

        // Defines available merge tags for dynamic text
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],

        // Placeholder AI request handler (for later integration)
        ai_request: (request, respondWith) =>
          respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),

        // Uploadcare integration for media uploads
        uploadcare_public_key: import.meta.env.VITE_TINYMCE_PUBLIC_KEY,
      }}

      // Default content displayed in editor on load
      initialValue="Welcome to TinyMCE!"
    />
  );
}
