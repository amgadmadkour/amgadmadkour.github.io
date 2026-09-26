# Reads an image's intrinsic pixel size from its file header so <img> tags can carry
# real width/height attributes, letting the browser reserve space before the image loads
# (avoids layout shift). Supports PNG, GIF and JPEG; returns nil for anything else.
#
# Usage: {% assign size = 'assets/img/photo.jpg' | image_size %} -> size.width, size.height
module Jekyll
  module ImageSize
    def image_size(path)
      site = @context.registers[:site]
      file = File.join(site.source, path.to_s.sub(%r{^/}, ''))
      return nil unless File.file?(file)

      dims = File.open(file, 'rb') { |f| ImageSize.read_dimensions(f) }
      dims && { 'width' => dims[0], 'height' => dims[1] }
    end

    def self.read_dimensions(f)
      header = f.read(26) || ''
      if header.start_with?("\x89PNG".b)
        header[16, 8].unpack('NN')
      elsif header.start_with?('GIF')
        header[6, 4].unpack('vv')
      elsif header.start_with?("\xFF\xD8".b)
        read_jpeg_dimensions(f)
      end
    end

    # Walks the JPEG segments until a start-of-frame marker, which holds the dimensions
    def self.read_jpeg_dimensions(f)
      f.seek(2)
      loop do
        byte = f.read(1) or return nil
        next unless byte == "\xFF".b

        marker = f.read(1)&.ord or return nil
        next if marker == 0xFF || marker == 0x01 || (0xD0..0xD8).cover?(marker)

        length = f.read(2)&.unpack1('n') or return nil
        if (0xC0..0xCF).cover?(marker) && ![0xC4, 0xC8, 0xCC].include?(marker)
          height, width = f.read(5).unpack('xnn')
          return [width, height]
        end
        f.seek(length - 2, IO::SEEK_CUR)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageSize)
