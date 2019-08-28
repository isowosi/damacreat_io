import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';

part 'attracted_by_manager.g.dart';

@Generate(
  EntityReferenceManager,
  mapper: [
    AttractedBy,
  ],
)
class AttractedByManager extends _$AttractedByManager<AttractedBy> {
  @override
  Mapper<AttractedBy> get mapper => attractedByMapper;

  @override
  void onRemoveReference(int entity) {}

  @override
  AttractedBy get entityReferenceComponent => AttractedBy();
}
